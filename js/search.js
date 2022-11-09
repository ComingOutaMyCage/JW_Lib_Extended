var PerformanceMode = /bot|googlebot|crawler|spider|robot|crawling|Lighthouse/i.test(navigator.userAgent);
PerformanceMode = true;

class PackedData {
    static Ready = false;
    static Data = null;
    static NowReady(){
        this.Ready = true;

        let options = this.Data['index.json'];
        infoStore = this.Data['infoStore.json'];
        delete this.Data['index.json'];
        delete this.Data['infoStore.json'];
        index = new FlexSearch.Document(options);
        for (const [filename, file] of Object.entries(this.Data)) {
            console.log("Importing " + filename);
            index.import(filename, file);
        }
        page_data_ready = true;
        $('#loading-state').html('');

        if(!getPageState('file'))
            pageStateChanged();

        let event = new Event("PackedDataReady", {bubbles: true}); // (2)
        document.dispatchEvent(event);
        // else if(showingFileFor == null && !hasLoadedFileWithStore)
        //     FileOnceStoreLoaded();
    }
}
let search = getPageState('search') ?? getPageState('searchExact') ?? '';
let words = location.hash.substr(location.hash.indexOf('=') + 1);
if(location.hash.startsWith(("#search="))) {
    let words = location.hash.substr(location.hash.indexOf('=') + 1);
    search = decodeURIComponent(words);
}
$("input[type=search]").val(search);

var page_data_ready = false;
var pageTitle = "JWS Online Library";
var pageTitleEnd = " - JWS Online Library";
var pageStates = -1;
var searchCount = 0;
var index = null;
var searchMaps = {};
var infoStore = {};
var loadedCategories = false;
var abortController = new AbortController()
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const monthNamesFull = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

async function GetPackedData(filename) {
    let newCache = null;
    // if ('caches' in window) {
    //     newCache = await window.caches.open('new-cache');
    //     // newCache.add('packedData.json' JSON.stringify(files));
    //     const packedData = await newCache.match(filename);
    //     if (packedData) {
    //         console.log("Used local storage " + filename);
    //         return new Promise(function (resolve, reject) {
    //             return resolve(JSON.parse(packedData));
    //         });
    //     }
    // }
    return new JSZip.external.Promise(function (resolve, reject) {
        let display = filenameWithoutExt(filename);
        display = display.replaceAll('.', ' ');
        $('#loading-state').html(`<h2 style="text-transform: capitalize">Downloading ${display} Data...</h2>`);
        JSZipUtils.getBinaryContent(filename, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
    .then(function (data) {
        $('#loading-state').html('<h2>Unpacking</h2><img src="images/examples/Heatmap Genesis.png" height="1"/>');
        return JSZip.loadAsync(data, {
            // decodeFileName: function (bytes) {
            //     return Encoding.codeToString(Encoding.convert(bytes, { to: 'ASCII', from: 'UTF8' }));
            //     //return iconv.decode(bytes, 'cp866');
            // }
        });
    })
    .then(async function (data) {
        $('#loading-state').html('<img src="images/examples/Heatmap Revelation.png" height="1"/>');
        let files = {};
        for (const [key, file] of Object.entries(data.files)){
            const contents = await file.async("string");
            if(!contents) continue;
            files[key] = JSON.parse(contents);
        }
        //console.log(files);
        // console.log(JSON.stringify(files));
        if(newCache !== null)
            newCache.add(filename, JSON.stringify(files));
        $('#loading-state').html('');
        return files;
    }).then(function(data){
        return data;
    })
}

async function LoadSearchMapsForWords(words){
    let indexNames = words.map(w => GetIndexForWord(index.index.content.encode(w.replace(/^-+/, ''))[0]) );
    let currentMaps = {};
    for (const indexName of Object.values(indexNames)){
        let searchMap = searchMaps[indexName];
        if(searchMap !== undefined){
            currentMaps = mergeDict(currentMaps, searchMap);
            continue;
        }

        await GetPackedData('index/' + indexName + '.content.map.zip')
            .then(async function(files){

                let replaceRegex = new RegExp('^' + indexName + "\.", 'i');
                searchMap = {};
                for (const [filename, file] of Object.entries(files)){
                    console.log("Got Map " + filename);
                    let normalFilename = filename.replace(replaceRegex, '');
                    searchMap[normalFilename] = file;
                }
                searchMaps[indexName] = searchMap;
        });
        currentMaps = mergeDict(currentMaps, searchMap);
    }
    for (const [filename, file] of Object.entries(currentMaps)){
        index.import(filename, file);
    }
}

function getSearchWords(){
    let words = $("input[type=search]").val().trim().replace(/\s{2,5}/g, ' ');
    if (!words) return [];
    words = words.replace(/sh[ae]?ph?[ea]?r?d/gi, "Shepherd");
    words = words.replace(/di?sf.ll?o?w?sh?i?p/gi, "disfellowship");
    words = words.replace(/["'“”’—”]/g, '').split(' ');
    //words = words.match(/\w+|"[^"]+"/g).map(s => s.replaceAll('"', ''));
    return words;
}
function getDateForInfo(info){
    if(!info.Year && info[1] && info[1].Year)
        info = info[1];
    if(info.YMD) return info.YMD;
    let date = info.Year + '';
    if(info.Issue) {
        let issueDate = info.Issue.toString().match(/^(\d{4})(\d{2})($|\d{2})$/);
        if(issueDate) {
            info.Month = parseInt(issueDate[2]);
            info.Day = parseInt(issueDate[3]);
            date += ' ' + String(info.Month).padStart(2, '0') + " " + String(info.Day).padStart(2, '0')
        }
    }
    return info.YMD = date;
}
function GetFriendlyName(info){
    if(info.FriendlyName) return info.FriendlyName;
    let issue = getIssueName(info);
    info.FriendlyName = `${info.Symbol} ${issue} - ${info.UDRT} (${info.Category}) - ${info.Year}`;
    return info.FriendlyName;
}
function getIssueName(info, fullMonth = true){
    getDateForInfo(info);
    const months = fullMonth ? monthNamesFull : monthNames;
    if(info.Month) {
        let issue = (months[info.Month - 1] + (info.Day > 0 ? (" " + info.Day) : ''));
        return issue;
    }
    return info.Issue || '';
}

function getStoredItemTitle(storeItem){
    if(storeItem.title !== undefined) return storeItem.title;
    if(storeItem.t)
        storeItem.title = filenameWithoutExt(storeItem.p);
    else
        storeItem.title = infoStore[storeItem.iid].Title;
    return storeItem.title;
}
function ShowInfo(info){
    HideSideMenu();
    setPageStates({list: 'publications', pubId: info.Name, year: info.Year});
    pageStateChanged();
}
async function DoSearchIfDirty(){
    if(searchDirty)
        await DoSearch();
}
function HideSideMenu(){
    if($("#btnSideMenu").is(":visible")) {
        $("body").removeClass('showSideMenu');
    }
}
async function DoSearch(){
    if(!CheckPackedDataLoaded()){
        setTimeout(DoSearch, 100);
        return;
    }

    const input = $("input[type=search]");
    const searchStart = input.val();
    let words = getSearchWords();
    if(!words.length) return false;
    let thisSearchCount = StopLoading();
    searchDirty = false;

    HideSideMenu();

    let newPageState = {};
    if((getPageState('search') ?? getPageState('searchExact')) !== searchStart){
        newPageState['search'] = searchStart;
        newPageState['searchExact'] = null;
        let div = $('#contents');
        div.text('');
    }

    {
        let articleMatch = searchStart.match(/([a-z]+)(\d+)[\s.]*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d+)[\s.]*(\d+)?/);
        if (articleMatch && articleMatch.length){
            let year = parseInt(articleMatch[2]);
            let curYear = new Date().getFullYear() - 2000;
            if(year < 100 && year > curYear) year = "19" + year;
            let symbol = articleMatch[1] + year;
            let month = articleMatch[3].substring(0, 3);
            if(!isNumeric(month)) {
                let monthIndex = monthNames.findIndex(m => m === month);
                if(monthIndex >= 0) month = monthIndex + 1;
            }else month = parseInt(month);
            let day = articleMatch[4];
            day = isNumeric(day) ? parseInt(day) : 0;
            let forSymbol = Object.values(infoStore).filter(i=> i.Symbol === symbol && getDateForInfo(i));
            let info = forSymbol.find(i => i.Month == month && i.Day == day);
            if(!info)
                info = forSymbol.find(i => i.Month == month);
            //let infoIndex = Object.values(infoStore).indexOf(i=>i.Symbol === symbol);
            if(info){
                ShowInfo(info);
                return;
            }
        }
    }

    await LoadSearchMapsForWords(words);
    console.log("Search Maps Loaded");

    const itemsPerPage = 20;
    let page = (getPageState('page') ?? 1) - 1;
    let rankBy = $("#rankSelector select").val();
    if(rankBy === 'occ') rankBy = null;
    if(rankBy !== getPageState('sort')) {
        newPageState['page'] = null;
        page = 0;
    }
    let itemStart = itemsPerPage * page;

    let minYear = parseInt($("#minYear").val() ?? 1880);
    let maxYear = parseInt($("#maxYear").val() ?? 2022);
    if(minYear < 1880 || maxYear < 1880) return false;
    if(maxYear < minYear) {
        let tmp = minYear;
        minYear = maxYear;
        maxYear = tmp;
    }

    let searchCats = $(".searchNav input:checkbox:checked" ).map(function() {return $(this).val()}).get();
    let untickedCats = $(".searchNav input:checkbox:not(:checked)" ).map(function() {return $(this).val()}).get();
    if (!untickedCats.length) searchCats = [];
    newPageState['file'] = null;
    newPageState['list'] = null;
    newPageState['cat'] = searchCats.length > 0 ? searchCats.join(' ') : null;
    newPageState['sort'] = rankBy;
    newPageState['minYear'] = minYear !== 1880 ? minYear : null;
    newPageState['maxYear'] = maxYear !== 2022 ? maxYear : null;
    setPageStates(newPageState);

    let searchExact = getPageState('searchExact');
    if(words.length <= 1) searchExact = false;

    let positiveWordsList = words.filter(w => !w.startsWith('-'))
    let positiveWords = positiveWordsList.join(' ');
    let negativeWords = words.filter(w => w.startsWith('-'));

    let matchingTitles = [];
    let matchingTitles2 = [];
    if(positiveWords.length > 1) {
        let titleRegex = new RegExp(escapeRegExp(positiveWords).replaceAll(' ', '.*').replace(/([a-z])s/ig, '$1\\W?s'), 'ig');
        //let titleRegex = new RegExp(positiveWordsList.map(s => escapeRegExp(s).replace(/([a-z])s/ig, '$1\\W?s')).join(fuzzyExactMatchRegexJoiner()), 'ig');
        let titleRegex2 = new RegExp(positiveWordsList.map(s => escapeRegExp(s)).join('|').replace(/([a-z])s/ig, '$1\\W?s'), 'ig');
        for (const [id, store] of Object.entries(index.store)) {
            let info = infoStore[store.iid];
            if(info.Year < minYear || info.Year > maxYear) continue;
            if(searchCats.length > 0 && !searchCats.includes(info.Category)) continue;
            let storeTitle = getStoredItemTitle(store);
            let title = info.UDRT || info.Title;
            // if(title == "Pay Attention To Yourselves And To All The Flock")
            //     debugger;
            if (info.Title !== storeTitle) title += " " + storeTitle;
            title += ` ${info.Symbol} ${info.issue} ${info.UDRT} ${info.Year}`
            let matchScore2 = title.match(titleRegex2);
            if(!matchScore2 || matchScore2.length < positiveWordsList.length)
                continue;
            let matchScore = title.match(titleRegex);
            if (matchScore) {
                matchingTitles.push({id: id, doc: store, searched: title});
                continue;
            }
            if (matchScore2) {
                matchingTitles2.push({id: id, doc: store});
            }
        }
    }

    // console.log(searchCats);
    // const results = index.search([{ field: 'content', query: searchStart, bool: 'or' }], { limit: itemsPerPage, offset: itemsPerPage * offset, enrich: true, suggest: true });
    let results = index.search(positiveWords, { limit: 10000000, enrich: true, suggest: false });
    if (results.length)
        results = results[0].result;
    results = [...matchingTitles, ...matchingTitles2, ...results];

    let negativeResults = new Set();
    if(negativeWords.length){
        for (let word of negativeWords){
            let negativeResult = index.search({ query: word.replace(/^\-/, ''), /*tag:searchCats,*/ index:['content'], limit: 10000000, enrich: false, suggest: false });
            if (negativeResult.length)
                negativeResults = [...negativeResults, ...negativeResult[0].result];
        }
        negativeResults = new Set(negativeResults);
    }

    if(minYear !== 1880 || maxYear !== 2022 || searchCats) {
        results = results.filter((result)=>{
            let info = infoStore[result.doc.iid];
            if(info.Year < minYear || info.Year > maxYear)
                return false;
            if(searchCats.length && !searchCats.includes(info.Category))
                return false;
            if (negativeResults.has(result.id))
                return false;
            return true;
        });
    }

    if(rankBy === "newest"){
        results = results.sort((a, b) => {
            const timeA = getDateForInfo(infoStore[a.doc.iid]);
            const timeB = getDateForInfo(infoStore[b.doc.iid]);
            if(timeA < timeB) return 1;
            if(timeA > timeB) return -1;
            return 0;
        });
    }else if(rankBy === "oldest"){
        results = results.sort((a, b) => {
            const timeA = getDateForInfo(infoStore[a.doc.iid]);
            const timeB = getDateForInfo(infoStore[b.doc.iid]);
            if(timeA < timeB) return -1;
            if(timeA > timeB) return 1;
            return 0;
        });
    }

    $("#resultsCount").text(results.length + " Results")

    let itemEnd = Math.min(itemStart + itemsPerPage, results.length);
    if (searchExact){
        itemEnd = Math.min(2000, results.length);
    }

    let hashcode = '#search=' + encodeURIComponent(words.join(' '));
    let documents = [];
    for(let i = itemStart; i < itemEnd; i++) {
        let result = results[i]
        let info = infoStore[result.doc.iid];
        let issue = getIssueName(info);
        let title = (getStoredItemTitle(result.doc));
        let ref = (`${info.Symbol} ${issue} - ${info.UDRT} (${info.Category}) - ${info.Year}`);
        documents.push(`
<ul class="result resultContentDocument">
    <li class="caption"><a class="lnk" target="_blank" href='?file=data/${encodeURICompClean(result.doc.p)+hashcode}' file="data/${result.doc.p}">${title}</a></li>
    <li class="result"><ul class="resultItems"><li class="searchResult"></li><li class="ref">${ref}</li></ul></li>
</ul>`);
    }
    // console.log(documents);
    const signal = abortController.signal

    $('#resultsHeader').show();
    let pagination = generatePagination(results.length, itemsPerPage, page);

    FileNoLongerActive();
    if(searchExact)
        $('#contents').empty().append($('<div id="results" class="results">Downloading each document and scanning</div>'));
    else
        $('#contents').empty().append($('<div id="results" class="results"></div>').append(documents));
    $('#contents').append(pagination);

    let exactResults = 0;
    async function scanElement(element){
        if(thisSearchCount !== searchCount) return;
        let docPath = $(element).find('[file]').attr('file');
        let lsKey = `se:${searchStart}:${docPath.hashCode()}`;
        if(searchExact){
            let existingResult = localStorage.getItem(lsKey);
            if (existingResult === "0"){
                return;
            }
            $(".pagination").text("Scanning " + $(element).find('li .ref').text());
        }
        await fetch(docPath, {
            cache: "force-cache",
            method: "get",
            redirect: 'follow',
            signal: signal,
        }).then(resp=>resp.text()).then((contents)=>{
            if(!contents || !contents.length) return;
            const classes = GetClassesForContent(contents);
            const extracts = createExtracts(contents, words, 0, searchExact);
            if(thisSearchCount !== searchCount) return;
            if (searchExact){
                localStorage.setItem(lsKey, extracts.length > 0 ? "1" : "0");
            }
            if(extracts.length) {
                $(element).closest('.resultContentDocument').find('.searchResult').append(extracts).addClass(classes);
                if (searchExact) {
                    exactResults++;
                    $('#results').append($(element));
                }
            }
        }).catch(error => console.log(error.message));
    }
    if(searchExact){
        let index = 0;
        for(const doc of documents){
            if(thisSearchCount !== searchCount) return false;
            if(index++ % 3 === 0)
                await scanElement($(doc)[0]);
            else
                scanElement($(doc)[0]);
            if(exactResults > 100) break;
        }
        $(".pagination").text("Scanning Finished" + ((exactResults > 100) ? " - Max 100 results reached" : ""));
    } else{
        let scanContext = $('#contents').find('.resultContentDocument');
        scanContext.each(function(){
            scanElement(this);
        });
    }
    return true;
}
function generatePagination(items, itemsPerPage, page, addRandom = false){
    page = parseInt(page);
    let maxPage = Math.ceil(items / itemsPerPage);
    let pagination = '';
    let paginationStart = Math.max(1, page - 3);
    let paginationEnd = Math.min(maxPage, paginationStart + 9);
    let paginationURL = new URL(location);
    if(addRandom){
        let randomPage = addRandom === true ? Math.floor(maxPage * Math.random()) : parseInt(addRandom);
        paginationURL.searchParams.set('page', randomPage);
        pagination += `<a href='${paginationURL.search}' class="random paginator"><span>🔀 Random Page</span></a>`;
    }
    if (paginationStart > 1) {
        paginationURL.searchParams.set('page', 1);
        pagination += `<a href='${paginationURL.search}' class="paginator"><span>1</span></a>`;
        pagination += `<a href='#${maxPage}' class="paginator" ><span>...</span></a>`;
    }
    for(let i = paginationStart; i <= paginationEnd; i++){
        paginationURL.searchParams.set('page', i);
        let active = (page + 1) === i ? 'active' : '';
        pagination += `<a class="${active} paginator" href='${paginationURL.search}'><span>${i}</span></a>`;
    }
    if(paginationEnd !== maxPage) {
        pagination += `<a href='#${maxPage}' class="paginator" ><span>...</span></a>`;

        paginationURL.searchParams.set('page', maxPage);
        pagination += `<a href='${paginationURL.search}'><span>${maxPage}</span></a>`;
    }
    return $('<div class="pagination"></div>').append(pagination);
}
function SortInfosByYear(infos, reverse){
    if(!infos || infos.length === 0) return [];
    if (reverse) reverse = -1;
    else reverse = 1;
    return infos.sort((a, b) => {
        const timeA = getDateForInfo(a);
        const timeB = getDateForInfo(b);
        if(timeA < timeB) return reverse;
        if(timeA > timeB) return -reverse;
        return 0;
    });
}
function SortInfosByTitle(infos, reverse){
    if(!infos || infos.length === 0) return [];
    if (reverse) reverse = -1;
    else reverse = 1;
    if(!infos[0].Title && infos[0][1] && infos[0][1].Title)
        infos.map(i => { i.sortTitle = i[1].Title.toUpperCase().replace(/["'\-“”]/g, ''); return 1;});
    else if(infos[0].p)
        infos.map(i => { i.sortTitle = getStoredItemTitle(i).toUpperCase().replace(/["'\-“”]/g, ''); return 1;});
    else
        infos.map(i => { i.sortTitle = i.Title.toUpperCase().replace(/["'\-“”]/g, ''); return 1;});

    return infos.sort((a, b) => {
        const valA = a.sortTitle;
        const valB = b.sortTitle;
        return valA.localeCompare(valB, undefined, {
            numeric: true,
            sensitivity: 'base'
        }) * reverse;
    });
}
function StopLoading() {
    abortController.abort();
    abortController = new AbortController()
    return ++searchCount;
}

var lastLocation;
async function pageStateChanged(e = null){
    if(lastLocation != null && lastLocation.search === location.search && lastLocation.hash !== location.hash){
        lastLocation = {...location};
        ResetScroll();
        return;
    }
    lastLocation = {...location};

    pageStates++;
    console.log('pageStateChanged');
    let list = getPageState('list');
    let category = getPageState('category');
    let title = getPageState('title');
    let symbol = getPageState('symbol');
    let pubId = getPageState('pubId');
    let search = getPageState('search') ?? getPageState('searchExact');
    let file = getPageState('file');
    let cat = getPageState('cat');
    let sort = getPageState('sort') ?? 'occ';
    let minYear = getPageState('minYear') ?? '1880';
    let maxYear = getPageState('maxYear') ?? '2022';
    if(!file){
        FileNoLongerActive();
    }
    if(list === "image-gallery"){
        return ImageGallery.ShowGallery();
    }
    if(list === 'publications' || (!file && !search)){
        return ShowPublications(category, title, symbol, pubId);
    }

    if($("#rankSelector select").val() !== sort) {
        $("#rankSelector select").val(sort);
        if(pageStates) searchDirty = true;
    }
    if($("#minYear").val() != minYear){
        $('#minYear').val(minYear);
        if(pageStates) searchDirty = true;
    }
    if($("#maxYear").val() != maxYear){
        $('#maxYear').val(maxYear);
        if(pageStates) searchDirty = true;
    }
    if(cat || !loadedCategories) {
        LoadCategories();
    }
    if(search) {
        if($("input[type=search]").val() !== search)
            $("input[type=search]").val(search);
        if(!file) searchDirty = true;
    }
    if(file) {
        return ShowFile(file);
    }
    else if(searchDirty){
        return DoSearch();
    }
}

function LoadCategories(){
    let cat = getPageState('cat');
    let cats = cat != null ? cat.split(' ') : [];
    if(!loadedCategories){
        console.log("Inserting Categories");
        loadedCategories = true;
        let list = $("#searchFilterContainer").find('ul');
        for(const [code, name] of Object.entries(PublicationCodes.codeToName)) {
            let checked = cat === null || cats.includes(code) ? 'checked' : '';
            list.append(`<li><input type="checkbox" name="filt[]" value="${code}" id="chk-${code}" ${checked}>&nbsp;<label for="chk-${code}">${name}</label></li>`);
        }
    }
    if(!cat) return;
    $("#searchFilterContainer").find('input:checkbox').each(function(){
        let val = $(this).attr('value');
        let check = cats.includes(val);
        if($(this).is(':checked') != check) {
            $(this).prop('checked', check);
            searchDirty = true;
        }
    });
}
var hasLoadedFileWithStore = false;
var showingFileFor = null;
async function ShowFile(docPath, replaceState= false){
    if(showingFileFor === docPath) return;
    let info = null, store = null;
    let preload = null;
    if(index && index.store) {
        StopLoading();
        setPageStates({'file': docPath}, replaceState, true);
        docPath = docPath.replace('\\', '/');
        store = getStoreForFile(docPath);
        if(!store){
            $("#contents").html("<h1>Could not find document</h1>");
            return;
        }
        info = infoStore[store.iid] ?? null;
        //showRelatedFiles(store);
    } else{
        preload = $.getJSON(getPath(docPath) + "/info.json", function(resp) {
            info = resp;
        });
    }
    showingFileFor = docPath;
    let docFetch = fetch(docPath, {
        cache: "force-cache",
        method: "get",
        signal: abortController.signal
    }).then(resp=>resp.text()).catch(error => console.log(error.message));
    $.when(preload, docFetch).done((pl, contents)=>
    {
        if(!info){
            info = { Category: '',  Year: docPath.match(/\b\d{4}\b/), };
            if(info.Year) info.Year = info.Year[0];
            let match;
            if((match = docPath.match(/([^_[a-zA-Z])_E/))) info.Category = match[1];
            if(docPath.includes('/VOD/')) info.Category = 'vod';
        }

        // let searchWords = getSearchWords();
        // if(searchWords && searchWords.length) {
        //     if(searchWords.filter(w=>w.length > 2).length)
        //         searchWords = searchWords.filter(w => w.length > 2);
        //     contents = highlightSearchTerms(contents, searchWords);
        // }
        let dir = getPath(docPath).replace('\\', '/');

        let elements = [];

        let isJwPub = false;
        if (info.Year > 1970 || (info.Year > 1950 && info.Category === 'w')){
            isJwPub = contents.substr(0, 1000).indexOf('data-pid') >= 0;
            //contents = contents.replace(/src="jwpub-media[^"]*"/g, '');
        }
        contents = contents.replace(/( (src)=['"])/ig, '$1' + dir + '/');
        // contents = contents.replace(/height[:=]"?\s*\d+[\w"]+;?/ig, '');
        contents = contents.replace(/(width[:=]"?\s*)(\d+)([\w"]+;?\s*)(height[:=]"?\s*)(\d+)([\w"]+;?)/ig, function(...m){
            let width = parseFloat(m[2]), height = parseFloat(m[5]);
            let ratio = (width / height).toFixed(3);
            if (m[1].includes(':')){
                return m[1] + m[2] + m[3] + ` aspect-ratio:${ratio}`;
            }else{
                return m[1] + m[2] + m[3] + ` style="aspect-ratio:${ratio};"`;
            }
        });
        let imagesReplaced = 0;
        contents = contents.replace(/<img /, function(v){
            if(++imagesReplaced === 1) return v;
            return '<img loading="lazy" ';
        });
        //contents = contents.replaceAll('<img ', 'bookmark=" ');

        if(info.Category === 'vod') {
            contents = highlightTimestamps(contents);
            if(info.files && info.files.length > 0) {
                let video =  $("<video style='width: 100%; max-width: 720px; display: block' controls></video>");
                let file = info.files[info.files.length - 1];
                video.append(`<source src="${file.progressiveDownloadURL}" type="video/mp4">`);
                video.append(`<track label="English" kind="subtitles" srclang="en" src="${docPath.replace('.txt', '.vtt')}" default />`);
                contents = video[0].outerHTML + "Video above © Watch Tower Bible and Tract Society of Pennsylvania<br/><br/>" + (contents);
            }
        }
        else if(docPath.endsWith(".txt")){
            if($(window).width() < 1000) {
                contents = contents.replace(/([a-z],?)[ ]?\r?\n([a-z])/g, '$1 $2');
            }
            contents = contents.replace(Bible.contentRegex, "<a href='BIBLE://NWTR/' class='lookupScripture'>$1</a>")
        }else if(!isJwPub){
            contents = contents.replace(Bible.contentRegex, "<a href='BIBLE://NWTR/' class='lookupScripture'>$1</a>")
        }

        let classes = GetClassesForContent(contents);
        elements.push($(`<input name="file" type='hidden' value='' />`).val(docPath));
        elements.push(AddDisclaimer(info));
        elements.push(`<div class="document ${classes}">${contents}</div>`);

        $('#loading-state').html('');
        $('#contents').html('').append(elements);
        $('#contents').find('style').remove();

        if(!store && index && index.store) store = getStoreForFile(docPath);
        else document.addEventListener("PackedDataReady", FileOnceStoreLoaded);
        showRelatedFiles(store);

        showingFileFor = null;

        $('#resultsHeader').hide();
        if(info.Title) AddDisclaimer(info);
        $('#contents').fadeIn(200);
        $('#currentFileBox').fadeIn(200);
        if(preload === null) {
            setTimeout(AfterShowFile, 10);
        }
    }).catch(error => {showingFileFor = null; console.log(error.message); });
}
function FileOnceStoreLoaded(){
    let docPath = getPageState('file');
    docPath = docPath.replace('\\', '/');
    let store = getStoreForFile(docPath);
    showRelatedFiles(store);
    AfterShowFile();
}
function AfterShowFile(){
    AddChapters();
    ResetScroll();
    let searchWords = getSearchWords();
    if(searchWords.length && typeof finder !== 'undefined') {
        setTimeout(()=> {
            finder.createFinder();
            $('#finder input').val(searchWords.join(' '));
            finder.activate();
        }, 100);
    }
}

function AddDisclaimer(info){
    let orgName = info.Year > 1932 ? "Watch Tower Bible and Tract Society of Pennsylvania" : (info.Year + " International Bible Students Association");
    let disclaimer = $(`<div id='docDisclaimer'>The content displayed below is for educational and archival purposes only.<br/>Unless stated otherwise, content is © ${orgName}</div>`);
    if(info.Year > 1970 || (info.Year > 1950 && info.Category === 'w')){
        let link = `https://wol.jw.org/en/wol/publication/r1/lp-e/${info.Symbol}`;
        if(info.Month === undefined) getDateForInfo(info);
        if(info.Category === 'w') link = `https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/watchtower/the-watchtower-${info.Year}/${monthNamesFull[info.Month - 1].toLowerCase()}` + (info.Day ? '-'+ info.Day : '');
        else if(info.Category === 'g') link = `https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/awake/awake-${info.Year}/${monthNamesFull[info.Month - 1].toLowerCase()}` + (info.Day ? '-'+ info.Day : '');
        disclaimer.append(`<br/><a target="_blank" rel="noreferrer" href="http://hidereferrer.net/?${link}">You may be able to find the original on wol.jw.org</a>`);
    }else {
        disclaimer.append(`<br/><a target="_blank" rel="noreferrer" href="https://archive.org/search.php?query=${encodeURIComponent(info.Title + " " + info.Year)}"><img alt="pdf" src="images/icons/pdf.png" height="24"> Content is too old for wol.jw.org, original copies may be found on Archive.org</a>`);
    }
    if(location.protocol === "http:"){
        let path = encodeURIComponent("C:\\MyDev\\www\\JW_Lib_Extended\\" + getPath(getPageState('file')));
        let path2 = encodeURIComponent("C:\\MyDev\\WT\\PDFs\\Books\\Sorted\\" + getPath(getPageState('file').substr(10)));
        disclaimer.append(`<br/><br/><a href="OpenFolder:${path}">OPEN FOLDER</a>`);
        disclaimer.append(`<br/><a href="OpenFolder:${path2}">OPEN PDF FOLDER</a>`);
    }
    return disclaimer[0].outerHTML;
}

function ResetScroll(){
    //console.log("ResetScroll");
    setTimeout(()=> {
        if (location.hash) {
            let element;
            if (location.hash.startsWith("#imgsrc")) {
                element = $("img[src$='" + location.hash.substr(location.hash.indexOf('=') + 1) + "']")
            } else if (location.hash.startsWith(("#search="))) {
                let words = location.hash.substr(location.hash.indexOf('=') + 1);
                //$("input[type=search]").val(words);
            } else {
                element = $(location.hash + ",[name='" + location.hash.substr(1) + "']");
            }
            if (element && element.length) {

                ScrollToElement(element, -240);
                //window.scroll(0, element.offset().top - 240);
                //$(window).scrollTo(element, {offset: { left: 0, top: -240,}});
                return;
            }
            return;
        }
        if (window.scrollY !== 0)
            window.scrollTo({top: 0, behavior: 'auto'});
    }, 10);
}
function ScrollToElement(element, offset) {
    let target = null;
    let lastScrollTop = window.scrollY;
    const checkIfScrollToIsFinished = setInterval(() => {
        let curTarget = Math.max(0, element.offset().top + offset);
        if (Math.abs(curTarget - window.scrollY) < 10) {
            // do something
            clearInterval(checkIfScrollToIsFinished);
        }else if(lastScrollTop === window.scrollY){
            target = curTarget;
            console.log("Issue new scroll");
            window.scroll(0, curTarget);
        }
        lastScrollTop = window.scrollY;
    }, 100);
}
function getStoreForFile(path) {
    if(path.startsWith("data/")) path = path.substr("data/".length);
    for (const [key, store] of Object.entries(index.store)) {
        if (store.p === path)
            return store;
    }
    return null;
}
async function ShowPublications(category, title, symbol, pubId) {
    console.log('ShowPublications', category);
    StopLoading();
    let contents = $('#contents');
    FileNoLongerActive();

    let UndatedTitle = getPageState('udrt');
    //await contents.fadeOut(200);

    let list = [];

    let newPageTitle = null;
    let infos = null;
    let groupBy = null;
    let showBy = null;

    if(UndatedTitle) {
        infos = getInfosForUndatedReferenceTitle(UndatedTitle, infos)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.push($(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${CapitalizeCompressedString(UndatedTitle)}</h1></a>`)[0]);
        // for (const [infoId, info] of infos) {
        //     let issue = getIssueName(info);
        //     if(!issue)issue = info.Title;
        //     list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, null, true));
        // }
        groupBy = "Title";
        //showBy = "Title";
    }

    if(!CheckPackedDataLoaded() && [...new URL(location.href).searchParams].length > 1){
        setTimeout(pageStateChanged, 100);
        return;
    }

    if(pubId) {
        const [infoId, info] = getInfoForPubId(pubId, getPageState('year')??0);
        let issue = getIssueName(info, true);
        if(issue) issue += ' — ';

        let files = Object.values(getFilesForInfoId(infoId));

        if (files.length === 1) {
            await ShowFile("data/" + files[0].p, true);
            return;
        }

        let groupByFirstLetter = category === 'it' || files.length > 200;
        if(pubId === 'The_Emphatic_Diaglott') groupByFirstLetter = false;
        if(groupByFirstLetter){
            if(title){
                list.push($(`<a href="?list=publications&pubId=${info.Name}&year=${info.Year}"><h1><big>‹</big> ${issue} ${info.Title} - ${title.toUpperCase()}</h1></a>`)[0]);
                files = files.filter(f => getStoredItemTitle(f).match(/[a-z]/i)[0].toUpperCase() === title);
                files = SortInfosByTitle(files);
                for (const item of files) {
                    list.push(buildDirectoryItem(null, "data/" + item.p, '.icon-docs', getStoredItemTitle(item), null, null, true));
                }
            }else {
                list.push($(`<a href="?list=publications&category=${info.Category}&title=${encodeURICompClean(info.Title)}"><h1><big>‹</big> ${issue} ${info.Title}</h1></a>`)[0]);
                let chars = [...new Set(files.map(f => getStoredItemTitle(f).match(/[a-z]/i)[0].toUpperCase()))].sort();
                for (const char of chars) {
                    list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&title=${char}&year=${info.Year}`, null, '.icon-docs', char.toUpperCase(), null, null, true));
                }
            }
        }else {
            files = SortInfosByTitle(files);
            list.push($(`<a href="?list=publications&category=${info.Category}&title=${encodeURICompClean(info.Title)}"><h1><big>‹</big> ${issue} ${info.Title}</h1></a>`)[0]);
            for (const item of files) {
                list.push(buildDirectoryItem(null, "data/" + item.p, '.icon-docs', getStoredItemTitle(item), null, null, true));
            }
        }
    }
    else if(symbol) {
        infos = getInfosForSymbol(symbol, infos)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.push($(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${CapitalizeCompressedString(symbol)}</h1></a>`)[0]);
        for (const [infoId, info] of infos) {
            let issue = getIssueName(info);
            if(!issue)issue = info.Title;
            list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, null, true));
        }
    }
    else if(title) {
        if(title.startsWith('%'))
            infos = getInfosForTitleStart(title.substr(1), infos)
        else
            infos = getInfosForTitle(title, infos)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.push($(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${title}</h1></a>`)[0]);
        for (const [infoId, info] of infos) {
            let issue = getIssueName(info);
            if(!issue) issue = info.Title;
            else issue = info.Year + " - " + issue;
            let showYear = info.Title.indexOf(info.Year) === -1 ? info.Year : '';
            list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, showYear, true));
        }
    }
    else if(category) {
        let categoryName = PublicationCodes.codeToName[category];
        let sortBy = getPageState('sort');
        let sortByYearSel = !sortBy ? 'selected' : '';
        let sortByTitleSel = sortBy === 'Title' ? 'selected' : '';
        let sortSelect = (`<select class="form-select w-auto d-inline-block" name='sort'><option value='' ${sortByYearSel}>By Year</option><option value='Title' ${sortByTitleSel}>By Title</option></select>`);
        if(!list.length)
            list.push($(`<div><a class="d-inline-block" href="?list=publications"><h1><big>‹</big> ${categoryName}</h1></a>&nbsp;&nbsp;`+ sortSelect + "</div>")[0]);
        infos = getInfosForCategory(category, infos);
        if(getPageState('sort') === "Title")
            infos = SortInfosByTitle(infos, infos);
        else
            infos = SortInfosByYear(infos, infos);
        if(!groupBy)
            groupBy = getGroupByForCategory(category);
        let groups = {};
        let groupFirstLetter = false;
        for (const [infoId, info] of infos) {
            let groupName = info[groupBy];
            if (groupFirstLetter) groupName = groupName.charAt(0);
            if (!groups[groupName]) groups[groupName] = {};
            groups[groupName][infoId] = info;
        }
        for (let [title, items] of Object.entries((groups))) {
            let subinfos = Object.values(items);
            let info = subinfos[0];
            let displayTitle = showBy ? info[showBy] : title;
            let maxYear = subinfos[subinfos.length - 1].Year;
            let showYear = displayTitle.indexOf(info.Year) === -1 ? info.Year : '';
            if(info.Year != maxYear) showYear = info.Year+'-'+maxYear;
            if(category === 'vod'){
                displayTitle = CapitalizeCompressedString(title);
            }else if(groupFirstLetter)
                title = '%' + title;
            if (subinfos.length === 1) {
                list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, info.Title, null, showYear, true));
            } else {
                list.push(buildDirectoryItem(`?list=publications&category=${info.Category}&${groupBy.toLowerCase()}=` + encodeURICompClean(title), null, `.icon-folder`, displayTitle, null, showYear, true));
            }
        }
    }
    else {
        newPageTitle = "Publications"
        list.push(buildDirectoryItem(`?list=image-gallery`, null, `.icon-images`, 'Image Gallery', 'View the thousands of images', 'Wow!', true));
        for (const [code, name] of Object.entries(PublicationCodes.codeToName)) {
            list.push(buildDirectoryItem(`?list=publications&category=${code}`, null, `.icon-${code}`, name, null, null, true));
        }
    }

    if(category || title || symbol || pubId || location.search !== '')
        setPageStates({'file': null, search: null, page: null, list: 'publications', category: category, title: title, symbol: symbol, pubId: pubId });

    if (newPageTitle) {
        setPageTitle(newPageTitle + pageTitleEnd);
        setPageDescription("Index for " + newPageTitle + " by Jehovahs Witnesses");
    } else if(list.length > 0) {
        let catTitle = list[0].textContent.replace("‹", '').trim();
        setPageTitle(catTitle + pageTitleEnd);
        setPageDescription("Index for " + catTitle + " by Jehovahs Witnesses");
    }

    let listEl = document.createElement('ul');
    listEl.classList.add('directory');
    listEl.append(...list);

    let container = document.createElement('div');
    container.classList.add('publications');
    container.appendChild(listEl);

    $('#contents')[0].replaceChildren(container);
    $('#resultsHeader').hide();

    // contents.fadeIn(200);
    ResetScroll();
}
function getGroupByForCategory(category){
    if(category == 'vod') return 'Symbol';
    if(category == 'news') return 'UDRT';
    return 'Title';
}
function FileNoLongerActive(){
    if(showCurrentFileBox) {
        showCurrentFileBox = false;
        $("#currentFileBox").fadeOut(0, function () {
            $(this).html('')
        });
    }
    if(showingRelatedFiles) {
        showingRelatedFiles = false;
        $("#relatedDocuments").fadeOut(200, function () {
            $("#searchRefineForm").fadeIn(200);
        });
    }else{
        $("#searchRefineForm").fadeIn(0);
    }
}
function getFilesForInfoId(infoId){
    //let infoId = store.iid;
    let results = {};
    for (let id = Math.max(1, infoId - 50); id < infoId + 100; id++) {
        let store = index.store[id];
        if (store === null || store.iid > infoId) return results;
        if (store.iid != infoId) continue;
        results[id] = store;
    }
    return results;
}
function getInfoForPubId(pubId, year=0){
    for(const [infoId, info] of Object.entries((infoStore))){
        if(year !== 0 && info.Year != year)
            continue;
        if(info.Name === pubId)
            return [infoId, info];
    }
}
function getInfosForCategory(code, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Category === code;
    });
}
function getInfosForTitleStart(title, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Title.startsWith(title);
    });
}
function getInfosForTitle(title, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Title === title;
    });
}
function getInfosForSymbol(symbol, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Symbol === symbol;
    });
}
function getInfosForUndatedReferenceTitle(title, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.UDRT === title;
    });
}
function CapitalizeCompressedString(text){
    return text.replace(/([a-zA-Z])([A-Z][a-z])/g, '$1 $2');
}

var relatedFilesCategoryTitle;
var showingRelatedFiles = false;
async function showRelatedFiles(store) {
    //console.log('showRelatedFiles', path);
    if (store == null) return;
    let info = infoStore[store.iid];

    showingRelatedFiles = true;
    let searchRefine = $("#searchRefineForm");
    let relatedDocs = $("#relatedDocuments");
    if (relatedDocs.attr('infoId') == store.iid) {
        highlightRelatedFile();

        searchRefine.fadeOut(200, function() {
            relatedDocs.fadeIn(200);
        });

        let titleYear = '';
        let storeTitle = getStoredItemTitle(store);
        if(!storeTitle.includes(info.Year.toString()) && !relatedFilesCategoryTitle.includes(info.Year.toString()))
            titleYear = ` ${info.Year} `;
        setPageTitle(storeTitle + titleYear + ((relatedFilesCategoryTitle !== storeTitle) ? " - " + relatedFilesCategoryTitle : '') + pageTitleEnd);
        setPageDescription(storeTitle + " published in " + info.Year);
        return;
    }

    let items = Object.values(getFilesForInfoId(store.iid));
    console.log('Related files', items);

    let issue = getIssueName(info, false);

    let newItems = [];
    if (items.length === 1) {
        let groupBy = getGroupByForCategory(info.Category);
        relatedFilesCategoryTitle = CapitalizeCompressedString(info[groupBy]);
        let di = buildDirectoryItem(`?list=publications&category=${info.Category}&${groupBy.toLowerCase()}=${encodeURICompClean(info[groupBy])}`, null, '.icon-folder', relatedFilesCategoryTitle, null, null, false, true);
        di.classList.add('folder');
        newItems.push(di);
    }
    else {
        relatedFilesCategoryTitle = info.Title + " " + issue;
        let di = buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, '.icon-folder', relatedFilesCategoryTitle, null, null, false, true);
        di.classList.add('folder');
        newItems.push(di);
    }
    for (const item of items){
        let title = getStoredItemTitle(item);
        if (items.length === 1) title += " " + issue;
        newItems.push(buildDirectoryItem(null, "data/" + item.p, '.icon-docs', title , null, null, true));
    }

    if(info.Category === 'vod')
        relatedFilesCategoryTitle += " Subtitles";

    let titleYear = '';
    let storeTitle = getStoredItemTitle(store);
    if(!storeTitle.includes(info.Year.toString()) && !relatedFilesCategoryTitle.includes(info.Year.toString()))
        titleYear = ` ${info.Year} `;
    setPageTitle(storeTitle + titleYear + ((relatedFilesCategoryTitle !== storeTitle) ? " - " + relatedFilesCategoryTitle : '') + pageTitleEnd);
    setPageDescription(storeTitle + " published in " + info.Year);

    if (relatedDocs.is(":visible")){
        await relatedDocs.fadeOut(200);
    }
    relatedDocs.empty();
    let list = $("<ul class='directory'></ul>");
    list.append(newItems);
    relatedDocs.append(list);

    searchRefine.fadeOut(200, function() {
        $('#relatedDocuments').fadeIn(200);
    });

    relatedDocs.attr('infoId', store.iid);
    highlightRelatedFile();
}
async function AddChapters(){
    let ul = $("#relatedDocuments ul");
    ul.find('.chapter').remove();

    let list = [];

    let bookmarks = $("[name^='bookmark']");
    if(bookmarks.length == 0){
        bookmarks = $("p.ss");
    }
    if(bookmarks.length === 0){
        let numParagraphs = $("p").length;
        bookmarks = [$("h1"),$("h2"),$("h3"),$("h4"),$("h5"),$("h6")];
        bookmarks = bookmarks.filter(b=>b.length > 2 && b.length < numParagraphs / 5);
        bookmarks = bookmarks.sort((a, b) => b.length - a.length);
        if(bookmarks.length === 0)
            bookmarks = [$("strong:first-child")];
        if(bookmarks.length > 0) {
            bookmarks = bookmarks[0];
            let bookmark = 0;
            bookmarks.each(function(){
                if(this.innerText.length <= 3) return;
                $(this).prepend(`<a name="bookmark${++bookmark}"></a>`);
            })
            bookmarks = $("[name^='bookmark']");
        }
    }
    if (bookmarks.length > 3 && bookmarks.length < 5000){
        //console.log(bookmarks.toArray().map(b=>b.innerText));
        let lastTitle = "";
        let lastElement = null;
        bookmarks.each(function(){
            if(this.classList.contains('skip')) {
                let siblingBookmarks = $(this.parentElement).find("[name^='bookmark']");
                if(this.parentElement.tagName !== "BODY" && siblingBookmarks.length > 1 && siblingBookmarks.length < bookmarks.length / 2){
                    siblingBookmarks.slice(1).addClass('skip');
                }
                return;
            }
            let title = this.innerText;
            if(!title) {
                title = this.parentElement.innerText;
                let siblingBookmarks = $(this.parentElement).find("[name^='bookmark']");
                if(this.parentElement.tagName !== "BODY" && siblingBookmarks.length > 1 && siblingBookmarks.length < bookmarks.length / 2){
                    siblingBookmarks.slice(1).addClass('skip');
                }
            }
            if(!title || title.length > 70 || title === lastTitle) return;
            if(title === title.toUpperCase())
                title = title.toTitleCase();
            let href = "#" + (this.id || this.name);
            lastTitle = title;
            if(lastElement !== null && ($(this).offset().top - $(lastElement).offset().top < 200)){
                if(title.match(/[A-Z]/))
                    $(list[list.length - 1]).find('.title').append(" " + title);
            }else {
                let item = buildDirectoryItem(href, null, null, title, null, null, true);
                item.classList.add('chapter');
                list.push(item);
            }
            lastElement = this;
        });
        if(list.length > 500){
            list = list.filter(i=> !$(i).find('.title').text().match(/[*^@*$]/))
        }
        if(list.length < 1000)
            ul.append(list);
    }
}
function setPageTitle(text){
    document.title = text.replace('—', '-');
}
function setPageDescription(desc){
    document.querySelector('meta[name="description"]').setAttribute("content", desc);
}
var showCurrentFileBox = false;
function highlightRelatedFile(){
    let currentDoc = getPageState('file');
    if(!currentDoc) return;
    showCurrentFileBox = true;
    $("#relatedDocuments a[file]").each(function(){
        if($(this).attr('file') === currentDoc) {
            $(this).addClass('active');
            let dir = $(this).closest('.directory').find('.folder');
            let file = $(this).closest('.item');
            let html = dir[0].outerHTML;
            if(dir.find('.title').text().indexOf(file.find(".title").text().trim()) === -1)
                html += file[0].outerHTML;
            $('#currentFileBox').html(html);
        }
        else
            $(this).removeClass('active');
    });
}
function buildDirectoryItem(href, doc, thumbnail, title, subtext, detail = null, arrow = true, backArrow = false){
    if(!href && doc){
        href = '?file=' + encodeURICompClean(doc);
    }
    let li = document.createElement('li');
    li.classList.add('item');
    let a = document.createElement('a');
    a.href = href;
    let aContents = [];
    if(doc) $(a).attr('file', doc);
    if (thumbnail) {
        if(thumbnail.charAt(0) === '.')
            aContents.push(`<div class="thumbnail"><span class="${thumbnail.replaceAll('.', '')}"></span></div>`);
        else
            aContents.push(`<div class="thumbnail"><img alt="thumbnail" src="${thumbnail}"/></div>`);
    }
    if(backArrow)
        aContents.push('<div class="arrow"><div class="icon-rev"></div></div>');
    subtext = !subtext ? '' : `<span class="subtext">${subtext}</span>`;
    let divTitle = (`<div class="title"><span class="text">${title}</span>${subtext}</div>`);
    aContents.push(divTitle);
    if (detail)
        aContents.push(`<div class="detail">${detail}</div>`);
    if(arrow)
        aContents.push(`<div class="arrow"><div class="icon"></div></div>`);
    a.innerHTML = aContents.join('\n');
    li.appendChild(a);
    return li;
}
function GetClassesForContent(content){
    const isHtml = IsHtml(content);
    let classes = [];
    if(isHtml) classes += "htmlDoc ";
    if(!isHtml) classes += "txtDoc ";
    return classes;
}

function ShowScripture(scripture, click){
    clearTimeout(tooltipFadeout);
    console.log("Show scriptures:" + scripture);
    let references = Bible.GetBooksAndVersess(scripture);
    let books = Object.keys(references);
    Bible.Fetch(books, function() {
        let text = "<div>";
        for (const [book, chapters] of Object.entries(references)) {
            //text += `<h3>${book}</h3>`;
            let bibleBook = Bible.Books[book];
            for (const [chapter, verses] of Object.entries(chapters)) {
                let name = "";
                let scriptures = "";
                let lastVerse = 0;
                let startRange = 0;
                for (let verse of verses) {
                    if (lastVerse === 0) {
                        name += verse;
                        startRange = verse;
                    } else if (lastVerse !== verse - 1) {
                        if (startRange < lastVerse) {
                            name += "-" + lastVerse;
                        }
                        name += "," + verse;
                        startRange = verse;
                    }
                    if (lastVerse !== 0 && verse - lastVerse > 1) scriptures += "<br/>";
                    lastVerse = verse;

                    let rawVerse = bibleBook[chapter - 1][verse - 1];
                    let verseText = "";
                    for (const line of rawVerse.split("\n")) {
                        if (line.startsWith("\t"))
                            verseText += "<span class='indent'>" + line + "</span>";
                        else
                            verseText += "<span>" + line + "</span>";
                    }
                    if (rawVerse.endsWith("\n")) verseText += "<br/>";

                    scriptures += ` <b>${verse}</b> <span class="verse serif">${verseText}</span>`;
                }
                if (name !== "" && lastVerse !== startRange) name += "-" + lastVerse;
                text += `\r\n<div class="scripture-header"><div class="scripture">${book} ${chapter}:${name}</div></div>\r\n`;
                text += `<p class="credit">Excerpt from <a target="_blank" rel="noreferrer" href="http://hidereferrer.net/?https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty">New World Translation of the Holy Scriptures</a><br/>© Watch Tower Bible and Tract Society of Pennsylvania</p><p>${scriptures}</p>`;
            }
        }
        text += "</div>";

        $('#tooltip-body').html(text);

        let tooltip = $("#tooltip");
        let width = tooltip.outerWidth();
        let x;
        if (click && $(document).width() > 900)
            x = click.clientX + window.pageXOffset - (width / 2);
        else
            x = ($(document).width() / 2) - (width / 2);
        tooltip.css('left', x).css('top', click.clientY + window.pageYOffset + 30);
        clearTimeout(tooltipFadeout);
        tooltip.stop().fadeIn(200);
    });
    //console.log(text);
}


$(document).on('click', 'i.ts', function(){
    let vid = $('video')[0];
    let timestamp = $(this).text();
    let match = timestamp.match(/(((?<h>\d+):)?(?<m>\d+):)?(?<s>\d+)$/);
    let seconds = ((match.groups['h'] ?? 0) * 60 * 60) + ((match.groups['m'] ?? 0) * 60) + parseInt(match.groups['s'] ?? 0);
    vid.currentTime = parseInt(seconds);
    $(document).scrollTo('video', {
        offset: {
            left: 0,
            top: -240,
        },
    });
});

var autoCompleteJS = null;
function initAutoComplete(){
    if(autoCompleteJS !== null) return;
    let values = Object.values(infoStore);
    if(!values.length) return;
    values.map(i => GetFriendlyName(i));
    let lastQuery = null;
    let lastQuerySplit = null;
    let regex = null;
    autoCompleteJS = new autoComplete({ placeHolder: "Search",
        selector: "#search",
        submit: true,
        // threshold: 10,
        data: {
            src: values,
            keys: [ 'FriendlyName', 'Symbol', 'Issue', 'Name', 'Title' ],
            cache: false,
            filter: (list) => {
                // Filter duplicates
                const filteredResults = Array.from(new Set(list.map((value) => value.value.FriendlyName))).map((iid) => {
                    return list.find((value) =>
                        value.value.FriendlyName === iid
                    );
                });
                return filteredResults;
            },
        },
        searchEngine: (query, record) => {
            if(!record) return false;
            if(lastQuery !== query){
                lastQuery = query;
                lastQuerySplit = lastQuery.split(' ');
                regex = new RegExp(lastQuerySplit.map(w=>escapeRegExp(w)).join('|'), 'ig');
            }
            record = record.toString()
            let match = record.match(regex);
            if(!match || new Set(match).size < lastQuerySplit.length)
                return;
            return highlightSearchTerms(record, lastQuerySplit);
        },
        query: (input) => {
            return input.replace(/(\d+)[.\s]*(\d+)/, '$1$2');
        },
        resultsList: {
            noResults: false,
            maxResults: 15,
            tabSelect: true,
        },
        resultItem: {
            element: (item, data) => {
                getDateForInfo(data.value);
                // Modify Results Item Style
                item.style = "display: flex; justify-content: space-between;";
                // Modify Results Item Content
                item.innerHTML = `
                  <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                    ${GetFriendlyName(data.value)}
                  </span>
                  <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
                    ${data.key}
                  </span>`;
            },
            highlight: true,
        },
        events: {
            input: {
                focus() {
                    if (autoCompleteJS.input.value.length) autoCompleteJS.start();
                },
                selection(event) {
                    const feedback = event.detail;
                    autoCompleteJS.input.blur();
                    //const selection = feedback.selection.value[feedback.selection.key];
                    autoCompleteJS.input.value = '';//selection;
                    ShowInfo(feedback.selection.value);
                    //console.log(feedback);
                },
            },
        },
    });
    $("#search").focus();
}
$(document).on('click', "#search-form input[type=search]", function(){
    initAutoComplete();
    if(!$("#btnSideMenu").is(":visible")) return;
    $("#btnSideMenu").click();
});
$(document).on('click', '#btnSideMenu,#searchBackdrop', function(){
    $('body').toggleClass('showSideMenu');
});
$(document).on('click', '.pagination a', function(){
    let href = $(this).attr('href');
    let pageNum = null;
    if (href.startsWith('#')) {
        pageNum = parseInt(href.replace('#', ''));
        let input = prompt("Enter page number", pageNum.toString());
        input = parseInt(input);
        if(!input || input <= 0 || input > pageNum) return;
        pageNum = input;
    }else
        pageNum = getUrlParam(location.origin + location.pathname + href, 'page');
    setPageState('page', pageNum);
    if (getPageState('search'))
        DoSearch();
    else if (getPageState('list') == 'image-gallery')
        ImageGallery.ShowGallery();
    window.scrollTo({top: 0, behavior: 'auto'});
    return false;
});
$(document).on('click', 'a[href]:not(.paginator)', function(e){
    if($(this).attr('target') === '_blank'){
        return true;
    }
    let doc = $(this).attr('file');
    if(doc) {
        ShowFile(doc);
        return false;
    }

    let href = $(this).attr('href');
    if(href.startsWith('#')) {
        if(href.length > 1) {
            window.history.replaceState(name.slice(0, -1), null, location.href.replace(location.hash, '') + href);
            ResetScroll();
        }
        return false;
    }

    if($(this).hasClass('lookupScripture')){
        ShowScripture($(this).text(), e);
        return false;
    }
    else if(href.startsWith('jwpub://b/')){
        let scripture = href.replace(/.*NWTR?\//, '').replace(/^(\d+):(\d+:\d+)/, function(match, bookNum, chapters) {
            return BibleBooks.GetBookAtIndex(bookNum - 1) + " " + chapters;
        }).replace(/(\d+):(\d+:\d+)/g, '$2');
        ShowScripture(scripture, e);
        return false;
    }

    if(href.indexOf('?') >= 0)
    {
        console.log("Pushing url");
        window.history.pushState($(this).text(), null, href.replaceAll('%20', '+'));
        pageStateChanged();
        return false;
    }

    if(!href.startsWith('data/')) return;
    ShowFile(href);
    return false;
});
var tooltipFadeout;
$(document).on('mouseleave', 'a[href],#tooltip', function(){
    let tooltip = $("#tooltip");
    tooltipFadeout = setTimeout(()=> {
        if (tooltip.is(':visible') && !tooltip.is(':hover'))
            tooltip.fadeOut(500);
    }, 500);
});
$(document).on('mouseenter', '#tooltip', function(){
    let tooltip = $(this);
    if (tooltip.is(':visible')){
        clearTimeout(tooltipFadeout);
        tooltip.fadeIn(50);
    }
});
$('#resultsHeader select').change(function(){
    searchDirty = true;
    DoSearch();
});
$(document).on('change', '.publications select', function(){
    setPageState($(this).attr('name'), $(this).val());
    pageStateChanged();
});
$(document).on('click', '#startExactSearch', function(){
    if(!confirm("This will literally download and scan each result for an exact match.\r\nContinue?"))
        return;
    $('#contents').text('');
    searchDirty = true;
    setPageStates({
        search: null,
        searchExact: $("input[type=search]").val(),
    });
    pageStateChanged();
});
// $("#regionBody").mouseenter(function(){
//     if(searchDirty)
//         DoSearch();
// });

var searchDirty = false;
$(document).on('input', 'input[type=search]', function () {
    initAutoComplete();
    searchDirty = true;
    $('#contents .results').fadeTo(600, 1.5);
});//.on('input', 'input[type=search]',$.debounce(1500, DoSearchIfDirty));
$(document).on('input', 'input[type=search]', function () {
    searchDirty = true;
    $('#contents .results').fadeTo(600, 1.5);
});

var scrollListener;
$(document).ready(async function(){
    scrollListener = new ScrollListener();
});
// if(getPageState('file')){
//     ShowFile(getPageState('file'));
// }
function CheckPackedDataLoaded(){
    if(page_data_ready) return true;
    if(typeof packedData === 'undefined') return false;
    return true;
}

$(document).on('click', '#manualLoad', Begin);
function Begin(){
    if(!PerformanceMode) {
        addScript('//static.getclicky.com/101371960.js', true);
        addScript('https://www.googletagmanager.com/gtag/js?id=G-9WR5TN5ZP3', true);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-9WR5TN5ZP3');
    }

    LoadCategories();
    window.addEventListener('popstate', pageStateChanged);
    // if(!getPageState('file')){
    pageStateChanged();
}
// window.onload = function(){
//    $('body').css('background-color', 'red');
// }

class ScrollListener{
    didScroll;
    lastScrollTop = 0;
    delta = 5;
    navbarHeight = $('#fixedHeader').outerHeight();

    constructor() {
        const _this = this;

        $(window).scroll(function(event){
            _this.didScroll = true;
        });
        setInterval(function() {
            if (_this.didScroll) {
                hasScrolled();
                _this.didScroll = false;
            }
        }, 250);
        function hasScrolled() {
            let st = $(window).scrollTop();
            if(Math.abs(_this.lastScrollTop - st) <= _this.delta)
                return;
            if (st > _this.lastScrollTop && st > _this.navbarHeight){
                $('body').removeClass('nav-down').addClass('nav-up');
            } else {
                if(st + $(window).height() < $(document).height()) {
                    $('body').removeClass('nav-up').addClass('nav-down');
                }
            }
            _this.lastScrollTop = st;
        }
    }
}

$(window).on('load', function(){
    if(PerformanceMode) return;
    setTimeout(()=> {
        console.log("add tidio");
        let tidio = document.createElement('script');
        tidio.setAttribute('src', 'https://code.tidio.co/b0tisogvmg2hnkczsjpfa2i1jfsuljkq.js');
        document.head.appendChild(tidio);
    }, 2000);
});

Begin();