const fetch = require('node-fetch');
const fs = require('fs-extra')
const fse = require('fs-extra')
import { exit } from 'process';

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

const downloadFile = (async (url, path) => {
    const res = await fetch.fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", reject);
        fileStream.on("finish", resolve);
    });
});

var contents = fs.readFileSync("./VOD/All.json", (err) => {
    if (err) { console.error(err); return; };
    console.log("File has been created");
});
var videosByCategory = JSON.parse(contents);


let keysDone = {};
//fs.rmdirSync(`./VOD-Info/`, { recursive: true, force: true });
//fs.rmdirSync(`./VOD-Subtitles/`, { recursive: true, force: true });

async function DownloadAll() {
    for (const category of Object.keys(videosByCategory)) {
        for (const media of Object.values(videosByCategory[category])) {
            let info = {...media}
            delete info.availableLanguages;
            delete info.images;
            delete info.tags;
            delete info.title;
            info.files = media.files.filter(f => f.progressiveDownloadURL && f.progressiveDownloadURL.endsWith('.mp4'));
            let subtitlesUrls = media.files.filter(f => f.subtitles && f.subtitles.url).map(f => f.subtitles.url);
            if (subtitlesUrls.length === 0) return;
            info.subtitlesUrl = subtitlesUrls[0];

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
            let dir2 = __dirname + `/VOD-Subtitles/${category}/${title_safe}/`;

            if (media.naturalKey in keysDone) {
                console.log("Already processed " + dir);
                return;
            }
            keysDone[media.naturalKey] = true;
            console.log("Processing " + dir);

            fs.mkdirSync(dir, {recursive: true});

            let subFileName = title_safe;
            if (subFileName.length > 50)
                subFileName = title_safe.substring(0, 50);
            let vttPath = dir + subFileName + ".vtt";
            let txtPath = dir + subFileName + ".txt";
            await downloadFile(info.subtitlesUrl, vttPath).then(() => {
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
                    ;
                });

                fs.writeFileSync(dir + "info.json", JSON.stringify(info, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    ;
                    console.log(info.Title + " has been saved");
                });

                fs.mkdirSync(dir2, {recursive: true});
                fse.copySync(dir, dir2);
            });
        }
    }
}
DownloadAll();