const striptags = require("striptags");
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const functions = require('./js/functions.js');
const nf = require('./js/node_functions');
const jsdom = require('jsdom');

let bible = {};

nf.getAllFiles(path.resolve('NWT/'), function (files) {

    files.forEach(f => {
        if(f.indexOf('-extracted') !== -1) return;
        if(f.indexOf('bibleversenav') !== -1) return;
        if(f.indexOf('.xhtml') === -1) return;

        let contents = fs.readFileSync(f, {encoding: 'utf8', flag: 'r'}, (err) => {
            if (err) {
                console.error(err);
            }
        });
        const dom = new jsdom.JSDOM(contents);
        const document = dom.window.document;
        let title = document.title;
        let titleMatch = title.match(/((\d )?(\w+)) (\d+)/);
        if(!titleMatch) return;
        let book = titleMatch[1];
        if (book === "Question" || book === "Part") return;
        if(book === "Psalm") book = "Psalms";
        let chapter = titleMatch[4] - 1;
        if (!bible[book]) {
            console.log("Found " + book);
            bible[book] = [];
        }
        if (!bible[book][chapter]) {
            console.log("Found " + book + " " + (chapter + 1));
            bible[book][chapter] = [];
        }

        let references = document.querySelectorAll(`[epub:type^="noteref"]`);
        references.forEach(element => {element.remove();});
        references = document.querySelectorAll(`sup`);
        references.forEach(element => { element.remove();});
        references = document.querySelectorAll(`.groupFootnote`);
        references.forEach(element => { element.remove();});



        let currentElement = document.querySelector(`span[id^="chapter"]`);
        while (chapterVerse.nextSibling !== null || nextSibling.parent() != null){
           let next = chapterVerse.nextSibling;
        }
        return;

        let chapterVerses = document.querySelectorAll(`span[id^="chapter"]`);
        let lastParentId = -1;
        let lastChapter, lastVerse;
        chapterVerses.forEach(element => {

            let chapterMatch = /chapter(\d+)_verse(\d+)/;
            let idMatch = element.id.match(chapterMatch);
            if (!idMatch) return;
            let parentId = element.closest('p').id;
            let prepend = '';
            if(parentId !== lastParentId){
                if(lastParentId !== -1) {
                    bible[book][lastChapter][lastVerse] += "\n";
                    if(element.previousSibling !== null)
                        prepend = "\t";
                }
                lastParentId = parentId;
            }

            let chapter = parseInt(idMatch[1]) - 1;
            let verse = parseInt(idMatch[2]) - 1;
            let text = prepend;
            let nextElement = element.nextSibling.nextSibling;
            while (nextElement !== null){
                if(nextElement.id && nextElement.id.match(chapterMatch)) break;
                if(nextElement.textContent)
                    text += nextElement.textContent.trim() + " ";
                nextElement = nextElement.nextSibling;
            }

            bible[book][chapter][verse] = text;
            lastChapter = chapter;
            lastVerse = verse;
        });

    })
});

fs.writeFileSync('js/bible_nwt.js', "var bible = " + JSON.stringify(bible));
console.log("Saved nwt.json!");