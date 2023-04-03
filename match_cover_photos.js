//Write a nodejs script that will match the cover photos to the correct folder
//Load info ./index/infoStore.json
//infoStore is an associative array with iid as key
//Example {...,"59084":{"Name":"Divine_Plan","Title":"The Divine Plan Of The Ages","Category":"bk","Issue":null,"Year":1913,"Symbol":"Divine_Plan","UDRT":"The Divine Plan Of The Ages"}}
//Load in content.store.json which is an associative array of objects with iid as a value referencing its infoStore parent
//Put all content.store.json objects into an associative array with iid being a value, example: {...,"59114":{"p":"Books/1926/Deliverance/1926_Td002_E.html","t":1,"iid":59111}}
//Map all infoStore objects by their .Name value
//Map document titles by basename of the contentstore.p filename
//Go through the files of "C:\MyDev\WT\PDFs\FirstPages" and get the basename of each jpg
//match the basename to the contentstore.p filename or the infoStore.Name
//Copy the jpg to the folder of the contentstore.p file folder and name it "cover.jpg"
//mark the infoStore with a thb: 1 property
//load the info.json file within that folder and save it with the thb: 1 property
//save infoStore.json

const fs = require('fs');
const path = require('path');
const infoStore = require('./index/infoStore.json');
const contentStore = require('./index/content.store.json');

// Map infoStore objects by their .Name value
const nameMap = {};
for (const iid in infoStore) {
    nameMap[infoStore[iid].Name] = iid;
}

// Map document titles by basename of the contentstore.p filename
const titleMap = {};
for (const iid in contentStore) {
    const p = contentStore[iid].p;
    const title = path.basename(p, path.extname(p));
    titleMap[title] = iid;
}

// Go through the files of "C:\MyDev\WT\PDFs\FirstPages" and get the basename of each jpg
const jpgDir = 'C:/MyDev/WT/PDFs/FirstPages';
const files = fs.readdirSync(jpgDir);
for (const file of files) {
    const basename = path.basename(file, path.extname(file));
    // Check if basename matches a contentstore.p filename or infoStore.Name
    const iid = titleMap[basename] || nameMap[basename];
    if (iid) {
        let p = "data\\" + contentStore[iid].p;
        let pdfDir = path.dirname(path.join(__dirname, p));
        let destFile = path.join(pdfDir, 'cover.jpg');

        let infoFile = path.join(pdfDir, 'info.json');
        if(fs.existsSync(infoFile)) {
            let data = fs.readFileSync(infoFile);
            if(data === undefined) continue;
            let info = JSON.parse(data);
            if(info === undefined) continue;

            let infoItem = infoStore[iid];
            if(infoItem === undefined)
                continue;

            // Copy the JPG to the folder of the contentstore.p file folder and name it "cover.jpg"
            fs.copyFileSync(path.join(jpgDir, file), destFile);
            // Mark the infoStore with a thb: 1 property
            infoStore[iid].thb = 1;
            // Load the info.json file within that folder and save it with the thb: 1 property

            info['thb'] = 1;
            fs.writeFileSync(infoFile, JSON.stringify(info));
            console.log("Copied " + file + " to " + destFile + " and updated " + infoFile);
        }
    }
}

// Save infoStore.json
fs.writeFileSync('./index/infoStore.json', JSON.stringify(infoStore));