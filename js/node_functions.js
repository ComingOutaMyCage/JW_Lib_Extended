const fs = require('fs');
const path = require('path');

function getAllFiles (dirPath, callback) {
    // if (fileIndex > quitAfter) return;
    //let match = dirPath.match(/(\w+)-\d{4}-[a-f0-9]{64}$/);
    // let match = dirPath.match(/-\d{4}$/);
    // if(match){
    //     //let newName = dirPath.replace(/(\w+)-\d{4}-[a-f0-9]{64}$/, '$1');
    //     let newName = dirPath.replace(/-\d{4}$/, '');
    //     fs.rename(dirPath, newName,(err) => console.log(err ?? "Succesfully renamed " + newName));
    //     dirPath = newName;
    //     return;
    // }
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

if(typeof module !== 'undefined')
    module.exports = { getAllFiles };