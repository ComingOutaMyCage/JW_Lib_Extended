
//const { Index, Document, Worker } = require("./node_modules/flexsearch/dist/flexsearch.bundle");
const FlexSearch = require("flexsearch");
// const { stripHtml } = require('string-strip-html');
const striptags = require("striptags");
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const functions = require('./js/functions.js');
const nf = require('./js/node_functions');
const bb26 = require('bb26')

var fileIndex = 0;
var quitAfter = 2000000000000;
var minTermAppearance = 3;
var maxTermAppearance = 0.75;

var active = {};

var _setTimeout = setTimeout;
var _clearTimeout = clearTimeout;
// clearTimeout = function(id) {
//     delete active[id];
//     _clearTimeout(id);
// }
// activeTimers = function() {
//     return Object.keys(active).length > 0;
// }


async function Process() {

    const docOptions = {
        preset: "score",
        tokenize: "strict",
        encoder: 'latin:extra',
        optimize: true,
        // depth: 2,
        resolution: 30,
        // minLength: 3,
        depth: 2, minlength: 3,
        bidirectional: true,
        //cache: false,
        //context: true,
        document: {
            id: "id",
            tag: "tag",
            index: "content",/*[{
                field: "content",
                // context: {
                //     depth: 1,
                //     resolution: 3,
                //     bidirectional: false,
                // }
            }],*/
            store: [ 'path', 'title', 'infoId' ],
        },
    };
    var indexes = {};

    var infoStores = {};
    var categories = [];
    var tags = {};

    index = indexes['All'] = new FlexSearch.Document(docOptions);
    let allDocs = [];

    let workers = [];
    let secondaryWorkers = [];

    var cwd = process.cwd();
    nf.getAllFiles(path.resolve('data/'), function (files) {
        if (fileIndex > quitAfter) return;
        let jsonFile = files.find(x => x.endsWith('.json'));
        if (!fs.existsSync(jsonFile)) return;
        let info = fs.readFileSync(jsonFile, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        info = JSON.parse(info);
        // let name = json.Name;

        delete(info.Hash);
        delete(info.MepsLanguageId);
        delete(info.Documents);
        delete(info.DbFile);

        info.dir = path.relative(cwd, functions.getPath(jsonFile)).replace(/\\+/g, '/');
        let category = functions.PublicationCodes.GetCategory(info);
        if(category == null){
            console.error(info);
            console.error("Couldnt find category");
        }
        const tag = info.Category;
        // if(tag != "g") return;
        tags[tag] = 1;

        store_category = 'All';
        let infoIndex = fileIndex + 1;
        let infoStore = infoStores[store_category];
        if(infoStore === undefined)
            infoStore = infoStores[store_category] = {};
        infoStore[infoIndex] = info;

        // let index = indexes[store_category];
        // if(index === undefined){}
        //    index = indexes[store_category] = new Document(docOptions);

        let htmltxtFiles = files.filter(x => x.endsWith('.html')).map(x=> x.replace(/.html$/, '.txt'));

        let docFiles = files.filter(x => !x.endsWith('.json') && !x.endsWith('.vtt') && !htmltxtFiles.includes(x));
        docFiles.forEach(f => {
            let thisFileIndex = ++fileIndex;
            let fileToLoad = f;
            if(f.endsWith('.html')){
                fileToLoad = f.replace(/.html$/, '.txt');
                if(!files.includes(fileToLoad))
                    fileToLoad = f;
            }
            console.log("Indexing " + f);
            let contents = fs.readFileSync(fileToLoad, {encoding: 'utf8', flag: 'r'}, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            if(fileToLoad.endsWith('.html')) {
                contents = striptags(contents);
            }
            var relativePath = path.relative(cwd, f).replace(/\\+/g, '/');
            let title = docFiles.length > 1 ? functions.filenameWithoutExt(f) : info.Title;
            let docInfo = {id: thisFileIndex, infoId: infoIndex, tag: tag, title: title, content: contents, path: relativePath};
            // console.log(docInfo);
            if(docOptions.worker)
                workers.push(index.addAsync(docInfo));
            else
                index.add(docInfo);
            //console.log(thisFileIndex);
        });

    });


    //await new Promise(resolve => setTimeout(resolve, 500));
    await Promise.all(workers);
    //await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Added All Documents");

    // setTimeout = function(fn, delay) {
    //     //var id = _setTimeout(function() {
    //     fn();
    //     //delete active[id];
    //     //}, delay);
    //     //active[id] = true;
    //     return 0;
    // }

    maxTermAppearance *= fileIndex;

    for(const [category, index] of Object.entries(indexes))
    {
        let infoStore = infoStores[category];

        let dir = 'index/';
        fs.mkdirSync(dir, { recursive: true });
        // let map = index['index']['content']['map'];
        // for (const [key, values] of Object.entries(map[0])) {
        //     if (!(values.length < minTermAppearance || values.length > maxTermAppearance || key.match(/(\d[a-z]|[a-z]\d)/i))) continue;
        //     for (const [index, set] of Object.entries(map)) {
        //         delete set[key];
        //     }
        // }
        // index['index']['content']['map'] = map;

        workers = [];
        function exportIndexAsync(key, data) {
            const worker = new Promise(function(resolve) {
                exportIndex(key, data);
                resolve();
            });
            workers.push(worker);
            return worker;
        }
        function exportIndex(key, data) {
            if (data === '' || data === null) return;

            let shouldZip = true;
            if (key.endsWith("content.map") && key.charAt(1) !== '.') {
                data = JSON.parse(data);
                let subsets = {};
                let layer1keys = Object.keys(data);
                let subsetTemplate = [];
                for (const layer1key of layer1keys)
                    subsetTemplate[layer1key] = {};

                for (const key of layer1keys) {
                    const set = data[key];
                    for (const key2 of Object.keys(set)) {

                        let char = key2.charAt(0).toLowerCase();
                        let subset = subsets[char];
                        if (subset === undefined) {
                            subsets[char] = subset = JSON.parse(JSON.stringify(subsetTemplate));
                        }

                        const values = data[key][key2];
                        // if (!(values.length < minTermAppearance || key2.match(/(\d[a-z]|[a-z]\d)/i))) {
                        subset[key][key2] = values;
                        //  continue;
                        //}
                        // console.log("Deleting key " + key2);
                        // delete data[key][key2];
                    }
                }
                for (const [char, subset] of Object.entries(subsets)) {
                    // subset[0] = data[0]
                    exportIndexAsync(char + "." + key, JSON.stringify(subset));
                }
                return;
                data = JSON.stringify(data);
                shouldZip = false;
            }

            //console.log(JSON.stringify(data));
            const path = dir + key + '.json';
            console.log('Saving index ' + dir + key);
            const contents = data ?? '';//JSON.stringify(data ?? {})
            if (shouldZip) {
                if (key.endsWith("content.map")) {
                    const zip2 = new JSZip();
                    zip2.file(key, contents);
                    secondaryWorkers.push(new Promise(function(resolve) {
                        saveZip(zip2, dir + key + '.zip').on('finish', function(){
                            resolve();
                        });
                    }));
                } else {
                    zip.file(key, contents);
                }
            }
            fs.writeFileSync(path, contents, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        var zip = new JSZip();
        var filesExported = []
        if(docOptions.worker)
            index.export(exportIndexAsync);
        else
            index.export(exportIndexAsync);

        const tagIndex = index.l;
        zip.file('tag', JSON.stringify(tagIndex));

        zip.file('index.json', JSON.stringify(docOptions));
        zip.file('infoStore.json', JSON.stringify(infoStore));
        zip.file('store', JSON.stringify(index.store));

        fs.writeFileSync(dir + 'index.json', JSON.stringify(docOptions));
        fs.writeFileSync(dir + 'infoStore.json', JSON.stringify(infoStore));
        fs.writeFileSync(dir + 'store', JSON.stringify(index.store));

        await new Promise(resolve => _setTimeout(resolve, 500));
        await Promise.all(workers);

        // console.log("Active timers? " + activeTimers());
        // await functions.until(() => !activeTimers());
        // console.log("Active timers? " + activeTimers());

        console.log('Saved Indexes');
        // console.log(filesExported);

        secondaryWorkers.push(new Promise(function(resolve) {
            saveZip(zip, dir + 'packed.zip').on('finish', function(){
                resolve();
            });
        }));

        await Promise.all(secondaryWorkers);

        console.log("Everything done");
    }

    function saveZip(zip, path){
        return zip.generateNodeStream({
            type: 'nodebuffer',
            streamFiles: true,
            compression: "DEFLATE",
            compressionOptions: {level: 9}
        })
        .pipe(fs.createWriteStream(path))
        .on('finish', function () {
            // JSZip generates a readable stream with a "end" event,
            // but is piped here in a writable stream which emits a "finish" event.
            console.log(path + " written");
        });
    }
}
Process();