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
        let chapter = titleMatch[4];
        if (!bible[book]) {
            console.log("Found " + book);
            bible[book] = [];
        }
        if (!bible[book][chapter - 1]) {
            console.log("Found " + book + " " + (chapter));
            bible[book][chapter - 1] = [];
        }

        let references = document.querySelectorAll(`[epub:type^="noteref"]`);
        references.forEach(element => {element.remove();});
        references = document.querySelectorAll(`sup,strong`);
        references.forEach(element => { element.remove();});
        references = document.querySelectorAll(`.groupFootnote`);
        references.forEach(element => { element.remove();});

        function getChapterVerseFromId(id){
            if(!id) return null;
            const chapterMatch = /chapter(\d+)_verse(\d+)/;
            let idMatch = id.match(chapterMatch);
            if(!idMatch) return null;
            return [parseInt(idMatch[1]), parseInt(idMatch[2])];
        }
        function SetChapterVerseText([chapter, verse], text){
            bible[book][chapter - 1][verse - 1] = text.trim();
        }

        let curChapter = 0;
        let curVerse = 0;

        let currentElement = document.querySelector(`span[id="chapter${chapter}"]`);
        currentElement = currentElement.nextSibling;
        let chapterVerse = [null, null];
        let currentText = "";
        while(currentElement != null){
            if(currentElement.classList && currentElement.classList.contains('sz'))
                currentText += "\t";
            if(currentElement.firstChild !== null) {
                currentElement = currentElement.firstChild;
                continue;
            }
            let chapterElement = (currentElement.id !== undefined && currentElement.id.startsWith('chapter')) ? currentElement : null;
            if(chapterElement != null){
                if(chapterVerse[0] !== null)
                    SetChapterVerseText(chapterVerse, currentText);
                currentText = "";
                chapterVerse = getChapterVerseFromId(chapterElement.id);
                currentElement = chapterElement.nextSibling ?? chapterElement.parentNode.nextSibling;
                continue;
            }
            if(currentElement.textContent)
                currentText += currentElement.textContent.trim() + " ";
            if(currentElement.nextSibling === null) {
                currentElement = currentElement.parentNode.nextSibling;
            }
            else
                currentElement = currentElement.nextSibling;
            if(currentElement && currentElement.tagName === "P")
                currentText += "\n";
        }

        if(currentText !== "")
            SetChapterVerseText(chapterVerse, currentText);

        /*return;

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
        */

    })
});

fs.writeFileSync('js/bible_nwt.js', "var bible = " + JSON.stringify(bible));
console.log("Saved nwt.json!");