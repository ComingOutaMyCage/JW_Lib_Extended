
const striptags = require("striptags");
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const functions = require('./js/functions.js');
const nf = require('./js/node_functions');
const sizeOf = require('image-size')

async function Process() {
    let allImagesByYear = [];
    var cwd = path.resolve('..\\..\\WT\\Image Dump\\');
    await nf.getAllFiles(cwd + "\\data", async function (files) {
        for(const file of files){
            try {
                let year = file.match(/\b\d{4}\b/);
                year = year[0] ?? 2022;
                const dimensions = sizeOf(file);
                if (dimensions.width > dimensions.height * 3 || dimensions.height > dimensions.width * 3)
                    continue;
                let relPath = path.relative(cwd, file).replaceAll('\\', '/');
                if (!allImagesByYear[year]) allImagesByYear[year] = [];
                allImagesByYear[year].push({f: relPath, w: dimensions.width, h: dimensions.height, y: year});
            }catch (e) {

            }
        }
    });
    let allImages = allImagesByYear.flat();
    console.log(allImages);
    let dir = 'index/';
    fs.writeFileSync(dir + 'images.json', JSON.stringify(allImages));
}
Process();