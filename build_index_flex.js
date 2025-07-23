
//const { Index, Document, Worker } = require("./node_modules/flexsearch/dist/flexsearch.bundle");
const FlexSearch = require("flexsearch");
// const { stripHtml } = require('string-strip-html');
const striptags = require("striptags");
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const functions = require('./js/functions.js');
const SitemapWriter = require('./js/SitemapWriter');
const nf = require('./js/node_functions');
const bb26 = require('bb26');

const filter = [
    "a",
    "about",
    "above",
    "after",
    "again",
    "against",
    "all",
    "also",
    "am",
    "an",
    "and",
    "any",
    "are",
    "aren't",
    "as",
    "at",
    //"back",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    //"between",
    "both",
    "but",
    "by",
    "can",
    "cannot",
    "can't",
    "come",
    "could",
    "couldn't",
    //"day",
    "did",
    "didn't",
    "do",
    "does",
    "doesn't",
    "doing",
    "dont",
    "down",
    "during",
    "each",
    "even",
    "few",
    "first",
    "for",
    "from",
    "further",
    "get",
    //"give",
    "go",
    //"good",
    "had",
    "hadn't",
    "has",
    "hasn't",
    "have",
    "haven't",
    "having",
    "he",
    "hed",
    //"hell",
    "her",
    "here",
    "here's",
    "hers",
    "herself",
    "hes",
    "him",
    "himself",
    "his",
    "how",
    "how's",
    "i",
    "id",
    "if",
    "ill",
    "im",
    "in",
    "into",
    "is",
    "isn't",
    "it",
    "it's",
    "itself",
    "i've",
    "just",
    "know",
    "let's",
    "like",
    //"look",
    "make",
    "me",
    "more",
    "most",
    "mustn't",
    "my",
    "myself",
    "new",
    "no",
    "nor",
    "not",
    "now",
    "of",
    "off",
    "on",
    "once",
    //"one",
    "only",
    "or",
    "other",
    "ought",
    "our",
    "our's",
    "ourselves",
    "out",
    "over",
    "own",
    //"people",
    "same",
    "say",
    "see",
    "shan't",
    "she",
    "she'd",
    "shell",
    "shes",
    "should",
    "shouldn't",
    "so",
    "some",
    "such",
    //"take",
    "than",
    "that",
    "that's",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "there's",
    "these",
    "they",
    "they'd",
    "they'll",
    "they're",
    "they've",
    //"think",
    "this",
    "those",
    "through",
    "time",
    "to",
    "too",
    //"two",
    //"under",
    "until",
    "up",
    "us",
    //"use",
    "very",
    "want",
    "was",
    "wasn't",
    "way",
    "we",
    "wed",
    "well",
    "were",
    "weren't",
    "we've",
    "what",
    "what's",
    "when",
    "when's",
    "where",
    "where's",
    "which",
    "while",
    "who",
    "whom",
    "who's",
    "why",
    "why's",
    "will",
    "with",
    "won't",
    //"work",
    "would",
    "wouldn't",
    //"year",
    "you",
    "you'd",
    "you'll",
    "your",
    "you're",
    "your's",
    "yourself",
    "yourselves",
    "you've"
];
const stemmer = {
    "ational": "ate",
    "iveness": "ive",
    "fulness": "ful",
    "ousness": "ous",
    "ization": "ize",
    "tional": "tion",
    "biliti": "ble",
    "icate": "ic",
    "ative": "",
    "alize": "al",
    "alise": "al",
    "iciti": "ic",
    "entli": "ent",
    "ousli": "ous",
    "alism": "al",
    "ation": "ate",
    "aliti": "al",
    "iviti": "ive",
    "ement": "",
    "enci": "ence",
    "anci": "ance",
    "izer": "ize",
    "iser": "ize",
    "alli": "al",
    "ator": "ate",
    "logi": "log",
    "ical": "ic",
    "ance": "",
    "ence": "",
    "ness": "",
    "able": "",
    "ible": "",
    "ment": "",
    "eli": "e",
    "bli": "ble",
    "ful": "",
    "ant": "",
    "ent": "",
    "ism": "",
    "ate": "",
    "iti": "",
    "ous": "",
    "ive": "",
    "ize": "ise",
    "al": "",
    "ou": "",
    "er": "",
    "ic": "",
    "s": ""
};

var fileIndex = 0;
var quitAfter = 2000000000000;
var minTermAppearance = 4;
var maxTermAppearance = 0.75;
var justSitemap = false;

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

var urlBase = "https://jws-library.one/"
var sitemap = [];
AddSitemap('');
AddSitemap('?list=publications');
for (const [code, name] of Object.entries(functions.PublicationCodes.codeToName)) {
    AddSitemap('?list=publications&category=' + code);
}
function AddSitemap(href, srcFileLastModifiedAt ){
    if(!srcFileLastModifiedAt) srcFileLastModifiedAt = new Date().toISOString();
    sitemap.push({ href:  urlBase + href, srcFileLastModifiedAt: srcFileLastModifiedAt   });
}
function AddDataToSitemap(relPath){
    const stats = fs.statSync(relPath);
    const date = stats.mtime.toISOString();
    AddSitemap('?file=' + functions.encodeURICompClean(relPath), date);
}
let sitemapWriter = new SitemapWriter.SitemapWriter({outFile: "sitemap.xml"});

async function Process() {

    const docOptions = {
        preset: "score",
        tokenize: "strict",
        encoder: 'balance',
        // charset: "latin:balance",
        // stemmer: stemmer,
        // filter: filter,

        optimize: true,
        // depth: 2,
        resolution: 30,
        // minLength: 3,
        depth: 2, minlength: 3,
        bidirectional: true,
        //cache: false,
        //context: true,
        worker: false,
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
            store: [ 'p', 't', 'iid' ],
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

    let dataPathLen = "data/".length;

    var cwd = process.cwd();
    await nf.getAllFiles(path.resolve('data/'), async function (files) {
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
        delete(info.ShortTitle);
        info.UDRT = info.UndatedReferenceTitle;
        delete(info.UndatedReferenceTitle);
        delete(info.PubCount);
        if(info.guid) {
            delete (info.guid);
            delete (info.languageAgnosticNaturalKey);
            delete (info.naturalKey);
            delete (info.type);
            delete (info.primaryCategory);
            delete (info.description);
            delete (info.firstPublished);
            delete (info.duration);
            delete (info.durationFormattedHHMM);
            delete (info.durationFormattedMinSec);
            if(info.files) {
                let file = info.files[info.files.length - 1];
                info.files = [{
                    url: file.progressiveDownloadURL
                }];
                if(file.subtitles)
                    info.files[0]['subtitles'] = { url: file.subtitles.url};
            }
            delete (info.printReferences);
            delete (info.subtitlesUrl);
        }

        //info.dir = path.relative(cwd, functions.getPath(jsonFile)).replace(/\\+/g, '/');
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

        let docFiles = files.filter(x => (x.endsWith('.txt') || x.endsWith('.html')) && !htmltxtFiles.includes(x));
        docFiles.forEach(f => {

            let fileToLoad = f;
            if(f.endsWith('.html')){
                fileToLoad = f.replace(/.html$/, '.txt');
                if(!files.includes(fileToLoad))
                    fileToLoad = f;
            }
            let relativePath = path.relative(cwd, f).replace(/\\+/g, '/');
            if(justSitemap) {
                if(fs.statSync(fileToLoad).size > 0)
                    AddDataToSitemap(relativePath);
                return;
            }

            console.log("Indexing " + relativePath);
            let contents = fs.readFileSync(fileToLoad, {encoding: 'utf8', flag: 'r'}, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            if(fileToLoad.endsWith('.html')) {
                contents = striptags(contents);
            }
            if(contents.trim() === "")
                return;
            let thisFileIndex = ++fileIndex;
            AddDataToSitemap(relativePath);

            let docInfo = {id: thisFileIndex, iid: infoIndex, tag: tag, content: contents, p: relativePath.substring(dataPathLen)};
            if(docFiles.length > 1 ? 1 : 0)
                docInfo['t'] = 1;
            // console.log(docInfo);
            if(docOptions.worker)
                workers.push(index.addAsync(docInfo));
            else
                index.add(docInfo);
            //console.log(thisFileIndex);
        });
        // if(workers.length > 500) {
        //     console.log("Waiting for workers...");
        //     await Promise.all(workers);
        //     console.log("Resuming...");
        // }

    });

    if(justSitemap){
        sitemapWriter.writeSitemap(sitemap);
        return;
    }

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

        {//Reduce
            let maps = index['index']['content']['map'];
            let flatCounts = {};
            for (const map of Object.values(maps)) {
                for (const [key, values] of Object.entries(map)) {
                    if (flatCounts[key] === undefined) flatCounts[key] = values.length;
                    else flatCounts[key] += values.length;
                }
            }
            let toDelete = Object.fromEntries(Object.entries(flatCounts).filter(([key, value]) => value < minTermAppearance));
            for (const map of Object.values(maps)) {
                for(const key of Object.keys(toDelete))
                    delete map[key];
                // for (const [key, values] of Object.entries(map)) {
                //     if (flatCounts[key] >= minTermAppearance) continue;
                //     delete map[key];
                //     //if (!(values.length < minTermAppearance || key.match(/(\d[a-z]|[a-z]\d)/i))) continue;
                //     // for (const [index, set] of Object.entries(map)) {
                //     //     delete set[key];
                //     // }
                // }
            }
            index['index']['content']['map'] = maps;
        }

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
            if (key.endsWith("content.map") && !key.match(/.{1,2}\.content.map/)) {
                data = JSON.parse(data);
                let subsets = {};
                let layer1keys = Object.keys(data);
                let subsetTemplate = [];
                for (const layer1key of layer1keys)
                    subsetTemplate[layer1key] = {};

                for (const key of layer1keys) {
                    const set = data[key];
                    for (const key2 of Object.keys(set)) {

                        let subsetName = functions.GetIndexForWord(key2);
                        let subset = subsets[subsetName];
                        if (subset === undefined) {
                            subsets[subsetName] = subset = JSON.parse(JSON.stringify(subsetTemplate));
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
        var packedJson = {};
        var filesExported = []
        if(docOptions.worker)
            index.export(exportIndexAsync);
        else
            index.export(exportIndexAsync);

        const tagIndex = index.l;
        //zip.file('tag', JSON.stringify(tagIndex));
        zip.file('index.json', JSON.stringify(docOptions));
        zip.file('infoStore.json', JSON.stringify(infoStore));
        zip.file('store', JSON.stringify(index.store));

        //packedJson['tag'] = tagIndex;
        packedJson['index.json'] = docOptions;
        packedJson['infoStore.json'] = infoStore;
        // Don't include store in packed data anymore
        // packedJson['store'] = index.store;

        fs.writeFileSync(dir + 'index.json', JSON.stringify(docOptions));
        fs.writeFileSync(dir + 'infoStore.json', JSON.stringify(infoStore));
        fs.writeFileSync(dir + 'store', JSON.stringify(index.store));
        
        function removeKeyQuotes(str){
            return str.replaceAll(/"(\d+|iid|p|t)":/g, '$1:');
        }

        // Create separate store.json file
        let jsonStore = removeKeyQuotes(JSON.stringify(index.store));
        fs.writeFileSync(dir + 'store.js', "StoreManager.Store = " + JSON.stringify(index.store)+ "; StoreManager.NowReady();");

        let jsonPacked = removeKeyQuotes(JSON.stringify(packedJson));
        fs.writeFileSync(dir + 'packed.js', "PackedData.Data = " + JSON.stringify(packedJson) + "; PackedData.NowReady();");

        sitemapWriter.writeSitemap(sitemap);

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