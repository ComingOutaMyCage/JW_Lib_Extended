class Bible {

    static contentRegex = /(((([123]|\bI+|First|Second|Third)\s*)?[A-Z][a-z]+\.?)\s(\d+:\s*)((\d|[:.]\s*|;\s(?=\s*\d+:)|,\s*|-|(?:\s+\d+:))+))\b/g
    static regex = /((([123]|\bI+ |First|Second|Third)\s*)?[A-Z][a-z]+\.?)\s((\d|[:.]\s*|;\s(?=\s*\d+:)|,\s*|-|(?:\s+\d+:))+)/g;
    static regexVerses = /(\d+)[:;.]\s*((\d+)( ?[,-] ?)?(?!\d+:))+/g;
    static regexVersesSub = /(\d+)(\s*[,-]\s*)?/g;
    static regexGoesOverEnd = /(\d+):(\d+)-(\d+):(\d+)/g;

    static GetBooksAndVersess(line){
        let matches = [...line.matchAll(this.regex)];

        let versesOnLine = 0;
        let bookDict = {};

        for(let i = 0; i < matches.length; i++)
        {
            let match = matches[i]

            let book = match[1].toLowerCase();
            book = BibleBooks.ComplexMatchBook(book);
            if (book === "") break;
            if (!book || book.length === 0)
            {
                break;
            }
            if(!bookDict[book])
                bookDict[book] = {};

            let bookChapters = bible[book];

            let rawVerse = match[0].replace(/(^[-,"\s]|[-,"\s]$)/g, '').replace(/(:)\s*/, '$1').replace(';', ' ');
            if (bookChapters != null && bookChapters.length === 1 && rawVerse.indexOf(':') === -1)
            {
                rawVerse = rawVerse.replace(/^(\d*\s*\w+\.?)\s*/, "$1 1:");
            }

            if (rawVerse.match(/:/g).length > 1)
            {
                let overmatch;
                while((overmatch = this.regexGoesOverEnd.exec(rawVerse)) !== null)
                {
                    let startChapter = parseInt(overmatch[1]);
                    if (startChapter <= 0) { continue; }
                    let startVerse = parseInt(overmatch[2]);
                    let endChapter = parseInt(overmatch[3]);
                    let endVerse = parseInt(overmatch[4]);
                    if (endChapter > startChapter + 3) { continue; }
                    if (endChapter < startChapter) { continue; }
                    if (bookChapters == null) continue;
                    if (startChapter > bookChapters.length || endChapter > bookChapters.length) continue;
                    for (let c = startChapter; c <= endChapter; c++)
                    {
                        let maxVerse = c === endChapter ? Math.min(endVerse, bookChapters[c - 1].length): bookChapters[c - 1].length;
                        for (let verse = startVerse; verse <= maxVerse; verse++)
                        {
                            if(!bookDict[book][c]) bookDict[book][c] = [];
                            bookDict[book][c].push(verse);
                        }
                        startVerse = 0;
                    }
                }
                rawVerse = rawVerse.replace(this.regexGoesOverEnd, "");
            }

            //if(verseGroups.Count > 1) { }
            let verseMatch;
            while((verseMatch = this.regexVerses.exec(rawVerse)) !== null)
            {
                var chapter = parseInt(verseMatch[1]);
                if (chapter <= 0) { continue; }
                if (bookChapters != null && chapter > bookChapters.length) continue;
                let startVerse = 99999;

                let versesPart = verseMatch[0].substr(verseMatch[0].indexOf(':') + 1);
                let subMatches = [...versesPart.matchAll(this.regexVersesSub)]
                for (let i = 0; i < subMatches.length; i++)
                {
                    let endVerse = parseInt(subMatches[i][1].trim());
                    let mode = (i === 0) ? ',' : subMatches[i - 1][2].trim();
                    if (mode === ',') startVerse = endVerse;
                    else startVerse++;
                    if (bookChapters != null && endVerse > bookChapters[chapter - 1].length) continue;
                    if (endVerse - startVerse > 100) continue;
                    for (let v = startVerse; v <= endVerse; v++)
                    {
                        //let textVer = chapter + ":" + v;
                        if(!bookDict[book][chapter]) bookDict[book][chapter] = [];
                        bookDict[book][chapter].push(v);
                    }
                }
            }

        }

        return bookDict;
    }
}

class BibleBooks {
    static books = [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Kings",
        "2 Kings",
        "1 Chronicles",
        "2 Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalms",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "1 Corinthians",
        "2 Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1 Thessalonians",
        "2 Thessalonians",
        "1 Timothy",
        "2 Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "1 Peter",
        "2 Peter",
        "1 John",
        "2 John",
        "3 John",
        "Jude",
        "Revelation"
    ];
    static initd = false;
    static Init(){
        if(this.initd) return;
        this.initd = true;
        for(const value of Object.values(BibleBooks.conversion)){
            BibleBooks.conversion[value.toLowerCase()] = value;
        }
    }
    static GetBookAtIndex(index){
        return BibleBooks.books[index];
    }
    static GetIndexOfBook(book){
        let index = BibleBooks.books.indexOf(book);
        if(index === -1){
            console.error("Could not find index for Bible book " + book);
        }
        return index;
    }
    static ComplexMatchBook(book)
    {
        this.Init();
        book = book.replace(/\.+$/, '').toLowerCase();

        if (!book || book.length === 0) return null;
        book = book.replace(/\s+/, ' ');
        if (isNumeric(book.charAt(0)) && book.charAt(1) !== ' ')
            book = book[0] + " " + book.Substring(1);
        let exactMatch = this.conversion[book];
        if (exactMatch) return exactMatch;

        if(book.match(/^(i+) /)){
            book = book.replace(/^(i+) /, (match, match0)=>{
                return match0.length + " ";
            });
        }
        book = book.replace(/\s+/, " ");
        book = book.replace(/First/i, "1");
        book = book.replace(/Second/i, "2");
        book = book.replace(/Third/i, "3");

        exactMatch = this.conversion[book];
        if (exactMatch) return exactMatch;

        book = book.replace(/^[\d\s]*/, '');
        exactMatch = this.conversion[book];
        if (exactMatch) return exactMatch;

        return null;
    }

    static conversion = {
        "jude": "Jude",
        "1 tim": "1 Timothy",
        "2 tim": "2 Timothy",
        "1 ti": "1 Timothy",
        "2 ti": "2 Timothy",
        "matt": "Matthew",
        "mt": "Matthew",
        "mr": "Mark",
        "mk": "Mark",
        "ezra": "Ezra",
        "ezr": "Ezra",
        "ez": "Ezra",
        "esdras": "Ezra",
        "psalm": "Psalms",
        "1 psalm": "Psalms",
        "2 psalm": "Psalms",
        "3 psalm": "Psalms",
        "ps": "Psalms",
        "pss": "Psalms",
        "psa": "Psalms",
        "gen": "Genesis",
        "prov": "Proverbs",
        "ex": "Exodus",
        "exo": "Exodus",
        "lev": "Leviticus",
        "le": "Leviticus",
        "zech": "Zechariah",
        "zec": "Zechariah",
        "jas": "James",
        "ezek": "Ezekiel",
        "ezck": "Ezekiel",
        "eccl": "Ecclesiastes",
        "ecclus": "Ecclesiastes",
        "ec": "Ecclesiastes",
        "ecclesiasticus": "Ecclesiastes",
        "hag": "Haggai",
        "1 chron": "1 Chronicles",
        "2 chron": "2 Chronicles",
        "1 chro": "1 Chronicles",
        "2 chro": "2 Chronicles",
        "1 chr": "1 Chronicles",
        "2 chr": "2 Chronicles",
        "1 ch": "1 Chronicles",
        "2 ch": "2 Chronicles",
        "1 paralipomenon": "1 Chronicles",
        "2 paralipomenon": "2 Chronicles",
        "rev": "Revelation",
        "1 cor": "1 Corinthians",
        "2 cor": "2 Corinthians",
        "1 co": "1 Corinthians",
        "2 co": "2 Corinthians",
        "isa": "Isaiah",
        "isaias": "Isaiah",
        "mic": "Micah",
        "micheas": "Micah",
        "ho": "Hosea",
        "hos": "Hosea",
        "osee": "Hosea",
        "jer": "Jeremiah",
        "zeph": "Zephaniah",
        "sophonias": "Zephaniah",
        "hab": "Habakkuk",
        "habakkuk": "Habakkuk",
        "hahakkuk": "Habakkuk",
        "da": "Daniel",
        "dan": "Daniel",
        "deut": "Deuteronomy",
        "de": "Deuteronomy",
        "rom": "Romans",
        "col": "Colossians",
        "josh": "Joshua",
        "jos": "Joshua",
        "1 thess": "1 Thessalonians",
        "2 thess": "2 Thessalonians",
        "1 thes": "1 Thessalonians",
        "2 thes": "2 Thessalonians",
        "1 thcss": "1 Thessalonians",
        "2 thcss": "2 Thessalonians",
        "1 thcs": "1 Thessalonians",
        "2 thcs": "2 Thessalonians",
        "1 th": "1 Thessalonians",
        "2 th": "2 Thessalonians",
        "1 sam": "1 Samuel",
        "2 sam": "2 Samuel",
        "1 sa": "1 Samuel",
        "2 sa": "2 Samuel",
        "judg": "Judges",
        "jg": "Judges",
        "eph": "Ephesians",
        "nah": "Nahum",
        "pr": "Proverbs",
        "phil": "Philippians",
        "php": "Philippians",
        "phm": "Philemon",
        "philemon": "Philemon",
        "philem": "Philemon",
        "gal": "Galatians",
        "ga": "Galatians",
        "gn": "Galatians",
        "heb": "Hebrews",
        "num": "Numbers",
        "mal": "Malachi",
        "tit": "Titus",
        "obad": "Obadiah",
        "es": "Esther",
        "esth": "Esther",
        "1 ki": "1 Kings",
        "2 ki": "2 Kings",
        "joe": "Joseph",
//"{  ,
        "neh": "Nehemiah",
        "ne": "Nehemiah",
        "re": "Revelation",
        "eze": "Ezekiel",
        "ezech": "Ezekiel",
        "ezechiel": "Ezekiel",
        "ge": "Genesis",
        "ac": "Acts",
        "act": "Acts",
        "ro": "Romans",
        "lu": "Luke",
        "lk": "Luke",
        "joh": "John",
        "jon": "John",
        "jn": "John",
        "jno": "John",
        "jo": "John",
        "1 john": "1 John",
        "2 john": "2 John",
        "3 john": "3 John",
        "1 joh": "1 John",
        "2 joh": "2 John",
        "3 joh": "3 John",
        "1 jo": "1 John",
        "2 jo": "2 John",
        "3 jo": "3 John",
        "1 jn": "1 John",
        "2 jn": "2 John",
        "3 jn": "3 John",
        "1 jon": "1 John",
        "2 jon": "2 John",
        "3 jon": "3 John",
        "1 jno": "1 John",
        "2 jno": "2 John",
        "3 jno": "3 John",
        "nu": "Numbers",
        "job": "Job",
        "mark": "Mark",
        "joel": "Joel",
        "amos": "Amos",
        "zep": "Zephaniah",
        "1 pe": "1 Peter",
        "2 pe": "2 Peter",
        "1 pet": "1 Peter",
        "2 pet": "2 Peter",
        "sura": "Sura",
        "suras": "Sura",
        "jona": "Jonah",
        "ruth": "Ruth",
        "ca": "Solomon",
        "cant": "Solomon",
        "sol": "Solomon",
        "1 macc": "1 Maccabees",
        "2 macc": "2 Maccabees",
        "1 machabees": "1 Maccabees",
        "2 machabees": "2 Maccabees",
        "wisdom": "Wisdom",
        "lam": "Lamentations",
        "la": "Lamentations",
        "mormon": "Mormon",
        "moroni": "Moroni",
        "ether": "Ether",
        "apoc": "Apocalypse",
        "mosiah": "Mosiah",
        "alma": "Alma",
        "1 nephi": "1 Nephi",
        "2 nephi": "2 Nephi",
        "3 nephi": "3 Nephi",
        "helaman": "Helaman",
        "apostles": "Acts",

        "to": "",
        "at": "",
        "and": "",
        "around": "",
        "about": "",
        "between": "",
        "until": "",
        "by": "",
        "was": "",
        "from": "",
        "till": "",
        "through": "",
        "vs": "",
        "ver": "",
        "no": "",
    };

}