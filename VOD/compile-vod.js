import fetch from 'node-fetch';
import fs from 'fs';
import fse from 'fs-extra';
import { exit } from 'process';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const videoDir = "D:/MyDev/VOD";

function sanitize(input, replacement) {
    const illegalRe = /[\/\?<>\\:\*\|":]/g;
    const controlRe = /[\x00-\x1f\x80-\x9f]/g;
    const reservedRe = /^\.+$/;
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    var sanitized = input
        .replace("#", "")
        .replace(illegalRe, replacement)
        .replace(controlRe, replacement)
        .replace(reservedRe, replacement)
        .replace(windowsReservedRe, replacement);
    return sanitized;//truncate(sanitized, 255);
}
function renameFileWithModificationDate(filePath) {
    const basename = path.basename(filePath, path.extname(filePath));
    const extension = path.extname(filePath);
    const stats = fs.statSync(filePath);
    const modificationDate = stats.mtime.toISOString().replace(/:/g, '');

    const newFileName = `${basename}_${modificationDate}${extension}`;
    const newPath = path.join(path.dirname(filePath), newFileName);

    fs.renameSync(filePath, newPath);
    console.log(`File renamed to: ${newFileName}`);
}

const vttToPlainText = (vttCaption) => {
    if (vttCaption.length === 0) {
        return;
    }

    vttCaption = vttCaption.replace(/(.+)\.\d+ --> .+[\r\n]*/g, '$1 ');
    vttCaption = vttCaption.replace(/<\/c>/g, '');
    vttCaption = vttCaption.replace(/<.+?>/g, '');
    vttCaption = vttCaption.replace(/^\s*$/g, '');
    vttCaption = vttCaption.replace(/&nbsp;/g, ' ');
    vttCaption = vttCaption.replace(/\r*\n([^\d])/g, ' $1');

    let lines = vttCaption.split('\n');
    lines.splice(0, 1);
    lines = lines.map(line => line.trim());
    lines = lines.filter(line => line.length > 0);
    lines = lines.filter((line, index, lines) => line !== lines[index + 1]);

    return lines.join('\r\n');
}
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const downloadFile = (async (url, path) => {

    const writer = fs.createWriteStream(path);

    const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
    });

    // const file = fs.createWriteStream(path);
    // return new Promise((resolve, reject) => {
    //     const request = https.get(url, response => {
    //         response.pipe(file);
    //         file.on('finish', () => {
    //             file.close(resolve);
    //         });
    //     });
    //     request.on('error', err => {
    //         fs.unlink(path, () => {
    //             reject(err.message);
    //         });
    //     });
    //     file.on('error', err => {
    //         fs.unlink(path, () => {
    //             reject(err.message);
    //         });
    //     });
    // });
});


var contents = fs.readFileSync(__dirname + "/VOD/All.json", (err) => {
    if (err) { console.error(err); return; };
    console.log("File has been created");
});
var videosByCategory = JSON.parse(contents);

var fileDownloads = [];


const MB = 1048576;
let keysDone = {};
//fs.rmdirSync(__dirname + `/VOD-Info/`, { recursive: true, force: true });
//fs.rmdirSync(__dirname + `/VOD-Subtitles/`, { recursive: true, force: true });
async function DownloadAll() {
    for (const category of Object.keys(videosByCategory)) {
        for (const media of Object.values(videosByCategory[category])) {
            let info = {...media}
            delete info.availableLanguages;
            delete info.images;
            delete info.tags;
            delete info.title;
            info.files = media.files.filter(f => f.progressiveDownloadURL && 
                f.progressiveDownloadURL.indexOf("Sub_E") == -1 && 
                f.progressiveDownloadURL.endsWith('.mp4'));

            let subtitlesUrls = info.files.filter(f => f.subtitles && f.subtitles.url).map(f => f.subtitles.url);
            if (subtitlesUrls.length === 0) continue;
            info.subtitlesUrl = subtitlesUrls[0];

            let video = info.files.filter(f => f.filesize < 400 * MB && f.frameHeight <= 720).slice(-1)[0];
            let videoURL = video.progressiveDownloadURL;

            let naturalKey = media.naturalKey;
            let datePublished = new Date(info.firstPublished);
            let year = datePublished.getFullYear();
            let category = media.primaryCategory;
            let title = media.title;
            let title_safe = sanitize(title.replace(/[\’\‘\“\”\"]/g, "'").replace(/(\d):(\d)/g, '$1.$2').replace(/(\:\s*|\—)/g, '-').replace(/[\?\!\'\"]/g, ""), '_');

            info.Name = media.naturalKey;
            info.Title = media.title;
            info.UndatedReferenceTitle = media.title;
            info.ShortTitle = null;
            info.Category = "vod";
            info.Year = year;
            info.Symbol = media.primaryCategory;

            let dir = __dirname + `/VOD-Info/${year}/${category}/${naturalKey}/`;
            let viddir = videoDir + `/VOD-Info/${year}/${category}/${naturalKey}/`;
            let dir2 = __dirname + `/VOD-Subtitles/${category}/${title_safe}/`;

            if (media.naturalKey in keysDone) {
                console.log("Already processed " + dir);
                continue;
            }
            keysDone[media.naturalKey] = true;
            console.log("Processing " + dir);

            fs.mkdirSync(dir, {recursive: true});

            let subFileName = title_safe;
            if (subFileName.length > 50)
                subFileName = title_safe.substring(0, 50);
            let vttPath = dir + subFileName + ".vtt";
            let txtPath = dir + subFileName + ".txt";
            let mp4Path = viddir + path.basename(videoURL);

            fs.mkdirSync(viddir, {recursive: true});
            if(!isMP4Valid(mp4Path, video.filesize)){
                console.log("Downloading " + videoURL);
                let startTime = new Date();
                let downloadPromise = downloadFile(videoURL, mp4Path + ".tmp").then(() => {
                    if(fs.existsSync(mp4Path)) {
                        //Rename to the original file mod date
                        renameFileWithModificationDate(mp4Path);
                    }
                    fs.renameSync(mp4Path + ".tmp", mp4Path);
                    let secondsTaken = (new Date() - startTime) / 1000;
                    let fileSize = (fs.statSync(mp4Path).size / MB);
                    let mbps = Math.round((fileSize / secondsTaken * 8) * 10) / 10;
                    fileSize = Math.round(fileSize * 10) / 10;
                    console.log("Downloaded " + mp4Path + " | " + fileSize + "MB @ " + mbps + "mbps");
                });
                downloadPromise.then(() => { downloadPromise.isCompleted = true; });
                fileDownloads.push(downloadPromise);
            }//else continue;

            let downloadPromise2 = downloadFile(info.subtitlesUrl, vttPath).then(() => {
                let vttContents = fs.readFileSync(vttPath).toString();
                let txtContents = vttToPlainText(vttContents);
                if (txtContents == undefined) {
                    console.error("No subtitles for " + vttPath);
                    return;
                }
                fs.writeFileSync(txtPath, txtContents, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });

                fs.writeFileSync(dir + "info.json", JSON.stringify(info, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(info.Title + " has been saved");
                });

                fs.mkdirSync(dir2, {recursive: true});
                fse.copySync(dir, dir2);

                fse.copySync(dir, viddir);
            });

            downloadPromise2.then(() => { downloadPromise2.isCompleted = true; });
            fileDownloads.push(downloadPromise2);
            while(fileDownloads.length >= 10){
                await Promise.any(fileDownloads);
                fileDownloads = fileDownloads.filter(p => !p.isCompleted);
                await delay(100);
            }
        }
    }
}
DownloadAll();


function isMP4Valid(filePath, size) {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  let stats = fs.statSync(filePath);
  let fileSizeInBytes = stats.size;
  if(fileSizeInBytes != size)
    return false;

  // Check if file has valid MP4 header
//   let buffer = Buffer.alloc(8);
//   let fd = fs.openSync(filePath, 'r');
//   fs.readSync(fd, buffer, 0, 8, 0);
//   fs.closeSync(fd);

//   let header = buffer.toString('hex');
//   if (header !== '0000002066747970') {
//     return false;
//   }

  // Check if file is completely downloaded
//   let lastBytes = 512;
//   let start = fileSizeInBytes - lastBytes;
//   let end = fileSizeInBytes - 1;

//   let fd2 = fs.openSync(filePath, 'r');
//   let buffer2 = Buffer.alloc(lastBytes);
//   fs.readSync(fd2, buffer2, 0, lastBytes, start);
//   fs.closeSync(fd2);

//   let lastChunk = buffer2.toString('hex');
//   if (lastChunk.slice(-2) !== '0000'){
//     return false;
//   }

  return true;
}