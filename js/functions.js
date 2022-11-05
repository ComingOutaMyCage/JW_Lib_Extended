function InsertNav(){
    $('.nav-link').each(function(){
        //console.log(location.href.indexOf($(this).attr('href')));
        if(location.href.indexOf($(this).attr('href')) >= 0) {
            $(this).addClass('active');
        }
    });
}

function IsHtml(content){
    return ((/(<p([^>]*)>)/i).test(content));
}

function basename(path) {
    return path.split(/[\\\/]/).reverse()[0];
}
function filenameWithoutExt(path) {
    return path.match(/([^\\\/]+)\.\w+$/)[1] ?? path.match(/([^\\\/]+)$/)[1];
}
function getPath(path) {
    return path.substring(0, Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")));
}

function mergeDict(a, b, path = null) {
    if (path === null) path = [];
    for (const key of Object.keys(b)) {
        let aVal = a[key];
        if (aVal === undefined || typeof aVal === 'function'){
            a[key] = b[key];
        }else{
            let bVal = b[key];
            if (typeof aVal == 'object' && typeof bVal == 'object')
                mergeDict(aVal, bVal, path.concat([key]));
            else if (aVal == b[key]) continue;
            else if (aVal.constructor === Array && bVal.constructor === Array) {
                a[key] = mergeDict(aVal, bVal);
                //a[key] = aVal.concat(bVal);
            }
            else throw new Error("Conflict at " + path.join(".") + key);
        }
    }
    return a;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

var highlightRegex;
var lastHighlightTerms;
function highlightSearchTerms(contents, searchTerms){
    if(searchTerms.length === 0) return contents;
    if(lastHighlightTerms !== searchTerms) {
        let cleanedTerms = searchTerms.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        highlightRegex = new RegExp("(\\b(" + cleanedTerms + ")\w*)", 'gi');
        lastHighlightTerms = searchTerms;
    }
    return contents.replace(highlightRegex, "<mark>$1</mark>");
}
function fuzzyExactMatchRegexJoiner(){
    return '(\\s*[.,!;“”’—\'\\-\\(\\)]*\\s*[.,!;“”’—\'\\-\\(\\)\\w]*\\s*[.,!;“”’—\'\\-\\(\\)]*\\s*)';
}
var lastExtractsTerms;
var extractsRegex;
function createExtracts(content, searchTerms, limit=0, exactSearch=false){
    if(!content) return [];
    if(IsHtml(content)){
        content = striptags(content);
    }
    if(lastExtractsTerms !== searchTerms) {
        lastExtractsTerms = searchTerms;
        if(!exactSearch && searchTerms.length > 3) searchTerms = searchTerms.filter(t => t.length >= 3);
        let cleanedTerms = searchTerms.map(s => escapeRegExp(s)).join(exactSearch ? fuzzyExactMatchRegexJoiner() : '|');
        let regexes = [];
        let startMatch = (/(<p.{1,200}|[^\r\n]{1,100})/).toString().slice(1, -1);//I do this for my IDE. No judging
        let endMatch = (/(.{1,200}<\/p>|[^\r\n]{1,100})/).toString().slice(1, -1);
        console.log(startMatch);
        if(exactSearch){
            regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})${endMatch}`, 'ig'));
        }else {
            if (searchTerms.length >= 4)
                regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})(?<f1>.{0,100})(?<t2>${cleanedTerms})(?<f2>.{0,100})(?<t3>${cleanedTerms})(?<f3>.{0,100})(?<t4>${cleanedTerms})${endMatch}`, 'ig'));
            if (searchTerms.length >= 3)
                regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})(?<f1>.{0,100})(?<t2>${cleanedTerms})(?<f2>.{0,100})(?<t3>${cleanedTerms})${endMatch}`, 'ig'));
            if (searchTerms.length >= 2)
                regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})(?<f1>.{0,100})(?<t2>${cleanedTerms})${endMatch}`, 'ig'));
            regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})${endMatch}`, 'ig'));
        }
        extractsRegex = regexes;
        console.log(regexes);
    }
    let allResults = [];
    let m;
    for(let i = 0; i < extractsRegex.length; i++) {
        let regex = extractsRegex[i];
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            let matchScore = {};
            let fillerScore = 0;
            for (const [key, match] of Object.entries(m.groups)){
                let char0 = key.charAt(0);
                if(char0 === 't')
                    matchScore[match] = (matchScore[match] ?? 0) + 1;
                else if(char0 === 'f')
                    fillerScore += match.length;
            }
            let score = Object.values(matchScore).reduce((a, b) => (a + a) * (b + b), 1);
            if (allResults.filter(r=>r.value === m[0]).length > 0)
                continue;
            allResults.push({ score: score, fillerScore: fillerScore, value: m[0] });
            if(matchScore.length === searchTerms.length) break;
        }
        if(allResults.length >= 2) break;
    }
    allResults = allResults.sort((a, b) => b.score - a.score || a.fillerScore - b.fillerScore);

    // for(let i = 0; i < extractsRegex.length; i++) {
    //     let results = content.match(extractsRegex[i]);
    //     if(results && results.length > 0) break;
    // }
    return highlightSearchTerms(allResults.slice(0, 2).map(r => r.value.replace(/<img [^>]+>/gi, '')).join(' <b>...</b> '), lastExtractsTerms);
}
function highlightTimestamps(contents){
    return contents.replace(/^((\d+:)?\d+:\d+)/gm, "<i class='ts'>$1</i>");
}

String.prototype.hashCode = function() {
    var i, l, hval = 0x811c9dc5;

    for (i = 0, l = this.length; i < l; i++) {
        hval ^= this.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    // if( asString ){
    //     // Convert to 8 digit hex string
    //     return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    // }
    return hval >>> 0;
}
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv', '([VIXvix]+)'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), (m)=> m.toUpperCase());
            //uppers[i].toUpperCase());

    return str;
}

function HtmlEncode(s) {
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function setUrlState(href, param, value) {
    //console.log(param + " = " + value);
    let newURL = new URL(href);
    if (value == null || value === '' || value === '[""]' || value === '[]')
        newURL.searchParams.delete(param);
    else
        newURL.searchParams.set(param, value);
    return newURL.toString();
}
function setPageState(param, value) {
    let dict = { };
    dict[param] = value;
    setPageStates(dict, false, false);
}
function setPageStates(dict, replaceState = false, wipeOthers=false) {
    //console.log(param + " = " + value);
    let newURL = new URL(location.href);
    let name = "?";
    let anyChanges = false;
    if(wipeOthers){
        for(const key of [...newURL.searchParams.keys()])
            if(!(key in dict))
                newURL.searchParams.delete(key);
    }
    for(const [param, value] of Object.entries(dict)) {
        let newVal = value;
        if (newVal == null || newVal === '' || newVal === '[""]' || newVal === '[]')
            newVal = null;
        name += param + ":" + value + "&";
        let curVal = newURL.searchParams.get(param);
        if(newVal === curVal) continue;
        if (newVal == null)
            newURL.searchParams.delete(param);
        else
            newURL.searchParams.set(param, newVal);
        if (!anyChanges)//For debug purposes
            anyChanges = true;
    }
    if(!anyChanges) return;
    if(replaceState)
        window.history.replaceState(name.slice(0, -1), null, newURL.toString().replaceAll("%2F", "/"));
    else
        window.history.pushState(name.slice(0, -1), null, newURL.toString().replaceAll("%2F", "/"));
}
function encodeURICompClean(param){
    return encodeURIComponent(param).replaceAll('%20', '+').replaceAll('%2F', '/');
}
function getPageState(param) {
    return getUrlParam(location.href, param);
}
function getUrlParam(href, param) {
    let url = new URL(href);
    return url.searchParams.get(param);
}

class PublicationCodes {
    static codeToName = {
        //'ws': 'Watchtower',
        'vod': 'Video Subtitles',
        //'dx': 'Indexes',
        'w': 'Watchtower',
        //'ws': 'Watchtower Simplified',
        //'wp': 'Watchtower Public',
        'g': 'Awake / Consolation / Golden Age',
        'bk': 'Books',
        'yb': 'Year Book',
        'manual': 'Manuals / Guidelines',
        'news': 'Publisher Newsletters',
        'mwb': 'Meeting Workbooks',
        'km': 'Kingdom Ministry',
        'brch': 'Brochures',
        'bklt': 'Booklets',
        'trct': 'Tracts',

        'bi': 'Bible',
        'gloss': 'Glossary',
        'it': 'Insight',

        'kn': 'Kingdom News',
        'web': 'Web',
        'pgm': 'Programs',
    };
    static GetCategory(info){
        let category = PublicationCodes.codeToName[info.Category] ?? null;
        if(!category) return null;
        return category;
    }
}
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class BASE_64 {
    static DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
    static toDigit(ch) {
        if (ch >= 48 && ch <= 57) {
            return ch - 48;
        } else if (ch >= 65 && ch <= 90) {
            return ch - 65 + 10;
        } else if (ch == 94) {
            return 36;
        } else if (ch == 95) {
            return 37;
        } else if (ch >= 97 && ch <= 122) {
            return ch - 97 + 38;
        } else {
            throw new IllegalArgumentException("Not valid digit: " + ch);
        }
    }
    // static toChar(digit) {
    //   return this.DIGITS[digit];
    // }
    static toChar(number) {
        //console.log(number);
        return BASE_64.DIGITS.charAt(number);// String.fromCharCode('A'.charCodeAt(0) - 1 + number);
    }
    static toString(number) {
        let string = "";
        let _number = number;
        while (_number > 0) {
            string = BASE_64.toChar(_number % 71 || 71) + string;
            _number = Math.floor((_number - 1) / 71);
        }
        return string;
    }
}
var _setTimeout = setTimeout;
async function until(predicate, interval = 500, timeout = 30 * 1000) {
    const start = Date.now();

    let done = false;

    do {
        if (predicate()) {
            done = true;
        } else if (Date.now() > (start + timeout)) {
            throw new Error(`Timed out waiting for predicate to return true after ${timeout}ms.`);
        }

        await new Promise((resolve) => _setTimeout(resolve, interval));
    } while (done !== true);
}
function defaultDict(defaultValue) {
    this.stringy = JSON.stringify(defaultValue);
    this.get = function (key) {
        if (this.hasOwnProperty(key)) {
            return key;
        } else {
            return JSON.parse(this.stringy);
        }
    }
}

function GetIndexForWord(word){
    let char0 = word.charAt(0).toLowerCase();
    let char1 = word.charAt(1).toLowerCase();
    if('scaptrdmfwbehilognu'.indexOf(char0) >= 0 && char1.match(/[a-z]/i))
        return char0 + char1;
    if(!char0.match(/[a-z0-9]/))
        return 'etc';
    return char0;
}

if(typeof module !== 'undefined')
    module.exports = { PublicationCodes, BASE_64, basename, getPath, mergeDict, filenameWithoutExt, until, GetIndexForWord, encodeURICompClean };