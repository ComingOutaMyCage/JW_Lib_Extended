import elasticlunrjs from "elasticlunrjs";
import * as fs from 'fs';
import * as path from 'path';
// require('fs-extra')
// const { resolve } = require('path');
// const fs = require('fs');
import 'fs-extra'
// const { readdir } = import('fs').promises;

String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash & 0xfffffff;
}

const index = elasticlunrjs();
index.addField('title');
index.addField('path');
index.addField('body');
index.setRef('id');
index.saveDocument(false);

const getAllFiles = function (dirPath, callback) {
    let dirContents = fs.readdirSync(dirPath);
    let dirs = [];
    let files = [];
    dirContents.forEach(function (file) {
        let fullPath = path.join(dirPath, "/", file);
        if (fs.statSync(fullPath).isDirectory()) {
            dirs.push(fullPath);
        } else {
            files.push(fullPath);
        }
    })
    if (files && files.length > 0)
    {
        callback(files);
    }
    dirs.forEach(function(path){
        getAllFiles(path, callback);
    });
}
var cwd = process.cwd();
getAllFiles(path.resolve('public/WT/'), function(files){

    let jsonFile = files.find(x => x.endsWith('.json'));
    let json = fs.readFileSync(jsonFile, (err) => {
        if (err) { console.error(err); return; };
    });
    json = JSON.parse(json);
    let name = json.Name;
    let docFiles = files.filter(x => !x.endsWith('.json'));
    docFiles.forEach(f=>{
        console.log("Indexing " + f);
        let contents = fs.readFileSync(f, {encoding:'utf8', flag:'r'}, (err) => {
            if (err) { console.error(err); return; };
        });
        var relativePath = path.relative(cwd, f);
        let docInfo = { 'title': json.Title, 'body': contents, path: relativePath, id: relativePath.hashCode() };
        index.addDoc(docInfo);
    });

});

// console.log(JSON.stringify(index.toJSON()));

fs.writeFileSync('public/index.json', JSON.stringify(index.toJSON()), (err) => {
    if (err) { console.error(err); return; };
    console.log("Index has been saved");
});
