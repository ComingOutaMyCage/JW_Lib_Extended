
const striptags = require("striptags");
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const functions = require('./js/functions.js');
const nf = require('./js/node_functions');
const sizeOf = require('image-size')

async function Process() {
    let allImagesByYear = [];
    var cwd = path.resolve('..\\..\\WT\\Image Dump\\data');
    var dataFolder = path.resolve('data');
    await nf.getAllFiles(cwd, async function (files) {
        for(const file of files){
            try {
                let year = file.match(/\b\d{4}\b/);
                year = year[0] ?? 2022;
                const dimensions = sizeOf(file);
                if (dimensions.width > dimensions.height * 3 || dimensions.height > dimensions.width * 3)
                    continue;
                let relPath = path.relative(cwd, file).replaceAll('\\', '/');
                if (!allImagesByYear[year]) allImagesByYear[year] = [];
                let basename = functions.basename(file);
                let htmlFolder = functions.getPath(functions.getPath(file).replace(cwd, dataFolder));
                let htmlFile = null;
                if(file.indexOf('_files') >= 0) {
                    let htmlFilenameExpected = functions.basename(functions.getPath(file)).replace("_files", "");
                } else {
                    nf.getAllFiles(htmlFolder, function (parentFiles) {
                        for (const parentFile of parentFiles) {
                            if (!parentFile.endsWith(".html")) continue;
                            let html = fs.readFileSync(parentFile, {encoding: 'utf8', flag: 'r'}, (err) => {
                            });
                            if (html.indexOf(basename) >= 0) {
                                htmlFile = functions.basename(parentFile);
                                return;
                            }
                        }
                    }, false);
                    console.log("Matched " + file + " to " + htmlFile);
                }
                let data = {f: relPath, w: dimensions.width, h: dimensions.height, y: parseInt(year) };
                if (htmlFile)
                    data['t'] = htmlFile;
                allImagesByYear[year].push(data);
            }catch (e) {
                console.error(e);
            }
        }
    });
    let allImages = allImagesByYear.flat();
    console.log(allImages);
    let dir = 'index/';
    fs.writeFileSync(dir + 'images.json', JSON.stringify(allImages));
}
Process();