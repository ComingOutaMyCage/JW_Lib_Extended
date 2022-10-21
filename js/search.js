let search = getPageState('search') ?? '';
$("input[type=search]").val(search);

var page_data_ready = false;
var pageTitle = "JWs Online Library";
var pageTitleEnd = " - JWs Online Library";
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
        $('#contents').html(`<h2 style="text-transform: capitalize">Downloading ${display} Data...</h2>`);
        JSZipUtils.getBinaryContent(filename, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
        .then(function (data) {
            $('#contents').html('<h2>Unpacking</h2>');
            return JSZip.loadAsync(data, {
                // decodeFileName: function (bytes) {
                //     return Encoding.codeToString(Encoding.convert(bytes, { to: 'ASCII', from: 'UTF8' }));
                //     //return iconv.decode(bytes, 'cp866');
                // }
            });
        })
        .then(async function (data) {
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
            return files;
        });
}

async function LoadSearchMapsForWords(words){
    let indexNames = words.map(w => GetIndexForWord(w.replace(/^-+/, '')) );
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
    words = words.replace(/["'“”’—”]/g, '').split(' ');
    //words = words.match(/\w+|"[^"]+"/g).map(s => s.replaceAll('"', ''));
    return words;
}
function getDateForInfo(info){
    if(info.YMD) return info.YMD;
    let date = info.Year + '';
    if(info.Issue) {
        let issueDate = info.Issue.toString().match(/^(\d{4})(\d{2})(\d{2})$/);
        if(issueDate) {
            info.Month = parseInt(issueDate[2]);
            info.Day = parseInt(issueDate[3]);
            date += ' ' + String(info.Month).padStart(2, '0') + " " + String(info.Day).padStart(2, '0')
        }
    }
    return info.YMD = date;
}
function getIssueName(info, fullMonth = true){
    getDateForInfo(info);
    const months = fullMonth ? monthNamesFull : monthNames;
    let issue = info.Month ? (months[info.Month - 1] + (info.Day > 0 ? (" " + info.Day) : '')) : '';
    return issue;
}

async function DoSearch(){
    const input = $("input[type=search]");
    const searchStart = input.val();
    let words = getSearchWords();
    let thisSearchCount = StopLoading();
    searchDirty = false;

    if($("#btnSideMenu").is(":visible")) {
        $("body").removeClass('showSideMenu');
    }

    let newPageState = {};
    if(getPageState('search') !== searchStart){
        newPageState['search'] = searchStart;
        let div = $('#contents');
        div.text('');
    }

    await LoadSearchMapsForWords(words);
    console.log("Search Maps Loaded");

    const itemsPerPage = 20;
    const page = (getPageState('page') ?? 1) - 1;
    let rankBy = $("#rankSelector select").val();
    if(rankBy === 'occ') rankBy = '';
    let itemStart = itemsPerPage * page;

    let minYear = parseInt($("#minYear").val() ?? 1880);
    let maxYear = parseInt($("#maxYear").val() ?? 2022);
    if(minYear < 1880 || maxYear < 1880) return;
    if(maxYear < minYear) {
        let tmp = minYear;
        minYear = maxYear;
        maxYear = tmp;
    }

    let searchCats = $(".searchNav input:checkbox:checked" ).map(function() {return $(this).val()}).get();
    let untickedCats = $(".searchNav input:checkbox:not(:checked)" ).map(function() {return $(this).val()}).get();
    if (!untickedCats.length) searchCats = [];
    newPageState['doc'] = null;
    newPageState['list'] = null;
    newPageState['cat'] = searchCats.length > 0 ? searchCats.join(' ') : null;
    newPageState['sort'] = rankBy;
    newPageState['minYear'] = minYear !== 1880 ? minYear : null;
    newPageState['maxYear'] = maxYear !== 2022 ? maxYear : null;
    setPageStates(newPageState);

    let positiveWordsList = words.filter(w => !w.startsWith('-'))
    let positiveWords = positiveWordsList.join(' ');
    let negativeWords = words.filter(w => w.startsWith('-'));

    let matchingTitles = [];
    let matchingTitles2 = [];
    if(positiveWords.length > 1) {
        let titleRegex = new RegExp(escapeRegExp(positiveWords).replaceAll(' ', '.*').replace(/([a-z])s/ig, '$1\\W?s'), 'ig');
        let titleRegex2 = new RegExp(positiveWordsList.map(s => escapeRegExp(s)).join('|').replace(/([a-z])s/ig, '$1\\W?s'), 'ig');
        for (const [id, store] of Object.entries(index.store)) {
            let info = infoStore[store.infoId];
            if(info.Year < minYear || info.Year > maxYear) continue;
            let title = info.Title + (info.Title !== store.title ? " " + store.title : "");
            let matchScore2 = title.match(titleRegex2);
            if(!matchScore2 || matchScore2.length < positiveWordsList.length)
                continue;
            let matchScore = title.match(titleRegex);
            if (matchScore) {
                matchingTitles.push({id: id, doc: store});
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
            let info = infoStore[result.doc.infoId];
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
            const timeA = getDateForInfo(infoStore[a.doc.infoId]);
            const timeB = getDateForInfo(infoStore[b.doc.infoId]);
            if(timeA < timeB) return 1;
            if(timeA > timeB) return -1;
            return 0;
        });
    }else if(rankBy === "oldest"){
        results = results.sort((a, b) => {
            const timeA = getDateForInfo(infoStore[a.doc.infoId]);
            const timeB = getDateForInfo(infoStore[b.doc.infoId]);
            if(timeA < timeB) return -1;
            if(timeA > timeB) return 1;
            return 0;
        });
    }

    $("#resultsCount").text(results.length + " Results")

    let itemEnd = Math.min(itemStart + itemsPerPage, results.length);

    let documents = [];
    for(let i = itemStart; i < itemEnd; i++) {
        let result = results[i]
        let info = infoStore[result.doc.infoId];
        let issue = getIssueName(info);
        documents.push(`
<ul class="results resultContentDocument">
    <li class="caption"><a class="lnk" href='/doc/${result.doc.path}' doc="${result.doc.path}">${result.doc.title}</a></li>
    <li class="result"><ul class="resultItems"><li class="searchResult"></li><li class="ref">${info.Symbol} ${issue} - ${info.UndatedReferenceTitle} (${info.Category}) - ${info.Year}</li></ul></li>
</ul>`);
    }
    // console.log(documents);
    const signal = abortController.signal

    $('#resultsHeader').show();
    let maxPage = Math.ceil(results.length / itemsPerPage);
    let pagination = '';
    let paginationStart = Math.max(1, page - 3);
    let paginationEnd = Math.min(maxPage, paginationStart + 9);
    let paginationURL = new URL(location);
    if (paginationStart > 1) {
        paginationURL.searchParams.set('page', 1);
        pagination += `<a href='${paginationURL.search}' class="paginator"><span>1</span></a>`;
    }
    for(let i = paginationStart; i <= paginationEnd; i++){
        paginationURL.searchParams.set('page', i);
        let active = (page + 1) === i ? 'active' : '';
        pagination += `<a class="${active} paginator" href='${paginationURL.search}'><span>${i}</span></a>`;
    }
    if(paginationEnd != maxPage) {
        pagination += `<a href='#${maxPage}' class="paginator" ><span>...</span></a>`;

        paginationURL.searchParams.set('page', maxPage);
        pagination += `<a href='${paginationURL.search}'><span>${maxPage}</span></a>`;
    }

    $("#relatedDocuments").fadeOut(200);
    $("#currentFileBox").fadeOut(0, function(){ $(this).html('') });
    $("#searchRefineForm").fadeIn(200);
    $('#contents').empty().append($('<div class="results"></div>').append(documents));
    $('#contents').append($('<div id="pagination"></div>').append(pagination));
    $('#contents').find('.resultContentDocument a[doc]').each(function(){
        if(thisSearchCount !== searchCount) return;
        let docPath = $(this).attr('doc');
        fetch(docPath, {
            cache: "force-cache",
            method: "get",
            signal: signal,
        }).then(resp=>resp.text()).then((contents)=>{
            const classes = GetClassesForContent(contents);
            const extracts = createExtracts(contents, words);
            if(thisSearchCount !== searchCount) return;
            $(this).closest('.resultContentDocument').find('.searchResult').append(extracts).addClass(classes);
        }).catch(error => console.log(error.message));
    });
}
function SortInfosByYear(infos, reverse){
    if(!infos || infos.length === 0) return [];
    if (reverse) reverse = -1;
    else reverse = 1;
    if(!infos[0].Year && infos[0][1].Year){
        return infos.sort((a, b) => {
            const timeA = getDateForInfo(a[1]);
            const timeB = getDateForInfo(b[1]);
            if(timeA < timeB) return -reverse;
            if(timeA > timeB) return reverse;
            return 0;
        });
    }
    return infos.sort((a, b) => {
        const timeA = getDateForInfo(a);
        const timeB = getDateForInfo(b);
        if(timeA < timeB) return -reverse;
        if(timeA > timeB) return reverse;
        return 0;
    });
}
function StopLoading() {
    abortController.abort();
    abortController = new AbortController()
    return ++searchCount;
}

function pageStateChanged(){
    pageStates++;
    console.log('pageStateChanged');
    let list = getPageState('list');
    let category = getPageState('category');
    let title = getPageState('title');
    let symbol = getPageState('symbol');
    let pubId = getPageState('pubId');
    let search = getPageState('search');
    let doc = getPageState('doc');
    let cat = getPageState('cat');
    let sort = getPageState('sort') ?? 'occ';
    let minYear = getPageState('minYear') ?? '1880';
    let maxYear = getPageState('maxYear') ?? '2022';

    if(list === 'publications' || (!doc && !search)){
        ShowPublications(category, title, symbol, pubId);
        return;
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
        if(!doc) searchDirty = true;
    }
    if(doc) {
        ShowFile(doc);
    }
    if(searchDirty){
        DoSearch();
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
async function ShowFile(docPath, replaceState= false){
    StopLoading();
    setPageStates({'doc': docPath, 'page': null, category: null, pubId: null, list:null,}, replaceState);
    docPath = docPath.replace('\\', '/');
    let store = getStoreForFile(docPath);
    let info = infoStore[store.infoId];
    showRelatedFiles(store);
    fetch(docPath, {
        cache: "force-cache",
        method: "get",
        signal: abortController.signal
    }).then(resp=>resp.text()).then((contents)=>{
        contents = highlightSearchTerms(contents, getSearchWords());
        let dir = getPath(docPath).replace('\\', '/');

        let elements = [];

        if (info.Year > 1970 || (info.Year > 1950 && info.Category === 'w')){
            contents = contents.replace(/src="jwpub-media[^"]*"/g, '');
        }
        contents = contents.replaceAll(/( (src)=['"])/ig, '$1' + dir + '/');
        contents = contents.replaceAll(/height:\s*\d+\w+;?/ig, 'max-width: 100%;');

        if(info.Category === 'vod') {
            let video =  $("<video style='width: 100%; max-width: 720px; display: block' controls></video>");
            let file = info.files[info.files.length - 1];
            video.append(`<source src="${file.progressiveDownloadURL}" type="video/mp4">`);
            video.append(`<track label="English" kind="subtitles" srclang="en" src="${docPath.replace('.txt', '.vtt')}" default />`);
            contents = video[0].outerHTML + "Video above © Watch Tower Bible and Tract Society of Pennsylvania<br/><br/>" + highlightTimestamps(contents);
        }
        else if(docPath.endsWith(".txt")){
            if($(window).width() < 1000) {
                contents = contents.replace(/([a-z],?)[ ]?\r?\n([a-z])/g, '$1 $2');
            }
            contents = contents.replace(Bible.contentRegex, "<a href='BIBLE://NWTR/' class='lookupScripture'>$1</a>")
        }else if(info.Year < 1950){
            contents = contents.replace(Bible.contentRegex, "<a href='BIBLE://NWTR/' class='lookupScripture'>$1</a>")
        }

        let orgName = info.Year > 1932 ? "Watch Tower Bible and Tract Society of Pennsylvania" : (info.Year + " International Bible Students Association");
        let disclaimer = $(`<div id='docDisclaimer'>The content displayed below is for educational and archival purposes only.<br/>Unless stated otherwise, content is © ${orgName}</div>`);
        if(info.Year > 1970 || (info.Year > 1950 && info.Category === 'w')){
            let link = `https://wol.jw.org/en/wol/publication/r1/lp-e/${info.Symbol}`;
            if(info.Category === 'w') link = `https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/watchtower/the-watchtower-${info.Year}/${monthNamesFull[info.Month - 1].toLowerCase()}` + (info.Day ? '-'+ info.Day : '');
            else if(info.Category === 'g') link = `https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/awake/awake-${info.Year}/${monthNamesFull[info.Month - 1].toLowerCase()}` + (info.Day ? '-'+ info.Day : '');
            disclaimer.append(`<br/><a target="_blank" rel="noreferrer" href="http://hidereferrer.net/?${link}">You may be able to find the original on wol.jw.org</a>`);
        }else {
            disclaimer.append(`<br/><a target="_blank" rel="noreferrer" href="https://archive.org/search.php?query=${encodeURIComponent(info.Title + " " + info.Year)}">Content is too old for wol.jw.org, original copies may be found on Archive.org</a>`);
        }
        elements.push(disclaimer[0].outerHTML);

        let classes = GetClassesForContent(contents);
        elements.push(`<div class="document ${classes}">${contents}</div>`);

        $('#contents').html('').append(elements);
        $('#contents').find('style').remove();

        $('#resultsHeader').hide();
        $('#contents').fadeIn(200);
        $('#currentFileBox').fadeIn(200);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }).catch(error => console.log(error.message));
}
function getStoreForFile(path) {
    for (const [key, store] of Object.entries(index.store)) {
        if (store.path === path)
            return store;
    }
    return null;
}
async function ShowPublications(category, title, symbol, pubId) {
    console.log('ShowPublications', category);
    StopLoading();
    let contents = $('#contents');
    $("#currentFileBox").fadeOut(0, function(){ $(this).html('') });
    $("#relatedDocuments").fadeOut(200, function(){
        $("#searchRefineForm").fadeIn(200);
    });
    //await contents.fadeOut(200);

    let container = $(`<div class="publications"></div>`);
    let list = $("<ul class='directory'></ul>");

    let newPageTitle = null;

    if(pubId) {
        const [infoId, info] = getInfoForPubId(pubId, getPageState('year')??0);
        let issue = getIssueName(info, true);
        if(issue) issue += ' — ';

        let files = Object.values(getFilesForInfoId(infoId));

        if (files.length === 1) {
            ShowFile(files[0].path, true);
            return;
        }

        let groupByFirstLetter = category === 'it' || files.length > 200;
        if(groupByFirstLetter){
            if(title){
                list.append(`<a href="?list=publications&pubId=${info.Name}&year=${info.Year}"><h1><big>‹</big> ${issue} ${info.Title} - ${title.toUpperCase()}</h1></a>`);
                files = files.filter(f => f.title.match(/[a-z]/i)[0].toUpperCase() === title);
                for (const item of files) {
                    list.append(buildDirectoryItem(null, item.path, 'images/file_docs_white.svg', item.title, null, null, true));
                }
            }else {
                list.append(`<a href="?list=publications&category=${info.Category}&title=${encodeURIComponent(info.Title)}"><h1><big>‹</big> ${issue} ${info.Title}</h1></a>`);
                let chars = [...new Set(files.map(f => f.title.match(/[a-z]/i)[0].toUpperCase()))].sort();
                for (const char of chars) {
                    list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&title=${char}&year=${info.Year}`, null, 'images/file_docs_white.svg', char.toUpperCase(), null, null, true));
                }
            }
        }else {
            list.append(`<a href="?list=publications&category=${info.Category}&title=${encodeURIComponent(info.Title)}"><h1><big>‹</big> ${issue} ${info.Title}</h1></a>`);
            for (const item of files) {
                list.append(buildDirectoryItem(null, item.path, 'images/file_docs_white.svg', item.title, null, null, true));
            }
        }
    }
    else if(symbol) {
        let infos = getInfosForSymbol(symbol)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.append(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${CapitalizeCompressedString(symbol)}</h1></a>`);
        for (const [infoId, info] of infos) {
            let issue = getIssueName(info);
            if(!issue)issue = info.Title;
            list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, null, true));
        }
    }
    else if(title) {
        let infos;
        if(title.startsWith('%'))
            infos = getInfosForTitleStart(title.substr(1))
        else
            infos = getInfosForTitle(title)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.append(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${title}</h1></a>`);
        for (const [infoId, info] of infos) {
            let issue = getIssueName(info);
            if(!issue)issue = info.Title;
            let showYear = info.Title.indexOf(info.Year) === -1 ? info.Year : '';
            list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, showYear, true));
        }
    }
    else if(category) {
        let categoryName = PublicationCodes.codeToName[category];
        list.append(`<a href="?list=publications"><h1><big>‹</big> ${categoryName}</h1></a>`);
        let infos = SortInfosByYear(getInfosForCategory(category));
        let groupBy = getGroupByForCategory(category);
        let groups = {};
        let groupFirstLetter = false;
        for (const [infoId, info] of infos) {
            let groupName = info[groupBy];
            if (groupFirstLetter) groupName = groupName.charAt(0);
            if (!groups[groupName]) groups[groupName] = {};
            groups[groupName][infoId] = info;
        }
        for (let [title, items] of Object.entries((groups))) {
            let infos = Object.values(items);
            let info = infos[0];
            let showYear = groupBy == 'Title' && info.Title.indexOf(info.Year) === -1 ? info.Year : '';
            let displayTitle = title;
            if(category === 'vod'){
                displayTitle = CapitalizeCompressedString(title);
            }else if(groupFirstLetter)
                title = '%' + title;
            if (infos.length === 1) {
                list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, info.Title, null, showYear, true));
            } else {
                list.append(buildDirectoryItem(`?list=publications&category=${info.Category}&${groupBy.toLowerCase()}=` + encodeURIComponent(title), null, `images/folder.svg`, displayTitle, null, showYear, true));
            }
        }
    }
    else {
        newPageTitle = "Publications"
        for (const [code, name] of Object.entries(PublicationCodes.codeToName)) {
            list.append(buildDirectoryItem(`?list=publications&category=${code}`, null, `.icon-${code}`, name, null, null, true));
        }
    }

    setPageStates({'doc': null, search: null, page: null, list: 'publications', category: category, title: title, symbol: symbol, pubId: pubId });

    if (newPageTitle)
        setPageTitle(newPageTitle + pageTitleEnd);
    else if(list.length > 0) {
        setPageTitle(list.children().first().text().replace("‹", '').trim() + pageTitleEnd);
    }

    container.append(list);

    $('#contents').html(container);
    $('#resultsHeader').hide();

    // contents.fadeIn(200);
    window.scrollTo({ top: 0, behavior: 'auto' });
}
function getGroupByForCategory(category){
    if(category == 'vod') return 'Symbol';
    return 'Title';
}
function getFilesForInfoId(infoId){
    //let infoId = store.infoId;
    let results = {};
    for (let id = Math.max(1, infoId - 50); id < infoId + 100; id++) {
        let store = index.store[id];
        if (store === null || store.infoId > infoId) return results;
        if (store.infoId != infoId) continue;
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
function getInfosForCategory(code){
    return Object.entries(infoStore).filter(function([infoId, info]) {
        return info.Category === code;
    });
}
function getInfosForTitleStart(title){
    return Object.entries(infoStore).filter(function([infoId, info]) {
        return info.Title.startsWith(title);
    });
}
function getInfosForTitle(title){
    return Object.entries(infoStore).filter(function([infoId, info]) {
        return info.Title === title;
    });
}
function getInfosForSymbol(symbol){
    return Object.entries(infoStore).filter(function([infoId, info]) {
        return info.Symbol === symbol;
    });
}
function CapitalizeCompressedString(text){
    return text.replace(/([a-zA-Z])([A-Z][a-z])/g, '$1 $2');
}

var relatedFilesCategoryTitle;
async function showRelatedFiles(store) {
    //console.log('showRelatedFiles', path);
    if (store == null) return;

    let searchRefine = $("#searchRefineForm");
    let relatedDocs = $("#relatedDocuments");
    if (relatedDocs.attr('infoId') == store.infoId) {
        highlightRelatedFile();

        searchRefine.fadeOut(200, function() {
            relatedDocs.fadeIn(200);
        });

        setPageTitle(store.title + ((relatedFilesCategoryTitle !== store.title) ? " - " + relatedFilesCategoryTitle : '') + pageTitleEnd);
        return;
    }

    let items = Object.values(getFilesForInfoId(store.infoId));
    console.log('Related files', items);

    let info = infoStore[store.infoId];
    let issue = getIssueName(info, false);

    let list = $("<ul class='directory'></ul>");
    if (items.length === 1) {
        let groupBy = getGroupByForCategory(info.Category);
        relatedFilesCategoryTitle = CapitalizeCompressedString(info[groupBy]);
        list.append(buildDirectoryItem(`?list=publications&category=${info.Category}&${groupBy.toLowerCase()}=${info[groupBy]}`, null, 'images/folder.svg', "<big>‹</big> " + relatedFilesCategoryTitle, null, null, false).addClass('folder'));
    }
    else {
        relatedFilesCategoryTitle = info.Title + " " + issue;
        list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, 'images/folder.svg', "<big>‹</big> " + relatedFilesCategoryTitle, null, null, false).addClass('folder'));
    }
    for (const item of items){
        let title = item.title;
        if (items.length === 1) title += " " + issue;
        list.append(buildDirectoryItem(null, item.path, 'images/file_docs_white.svg', title , null, null, true));
    }

    if(info.Category === 'vod')
        relatedFilesCategoryTitle += " Subtitles";

    setPageTitle(store.title + ((relatedFilesCategoryTitle !== store.title) ? " - " + relatedFilesCategoryTitle : '') + pageTitleEnd);

    if (relatedDocs.is(":visible")){
        await relatedDocs.fadeOut(200);
    }
    relatedDocs.empty();
    relatedDocs.append(list);

    searchRefine.fadeOut(200, function() {
        $('#relatedDocuments').fadeIn(200);
    });

    relatedDocs.attr('infoId', store.infoId);
    highlightRelatedFile();
}
function setPageTitle(text){
    document.title = text.replace('—', '-');
}
function highlightRelatedFile(){
    let currentDoc = getPageState('doc');
    if(!currentDoc) return;
    $("#relatedDocuments a[doc]").each(function(){
        if($(this).attr('doc') === currentDoc) {
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
function buildDirectoryItem(href, doc, thumbnail, title, subtext, detail = null, arrow = true){
    if(!href && doc){
        href = '/doc/' + encodeURIComponent(doc);
    }
    let li = $(`<li class="item"></li>`);
    let a = $(`<a href="${href}"></a>`);
    if(doc) a.attr('doc', doc);
    if (thumbnail) {
        if(thumbnail.charAt(0) === '.')
            a.append(`<div class="thumbnail"><span class="${thumbnail.replaceAll('.', '')}"></span></div>`);
        else
            a.append(`<div class="thumbnail"><img src="${thumbnail}"/></div>`);
    }
    let divTitle = $(`<div class="title"><span>${title}</span></div>`);
    if (subtext)
        divTitle.append(`<span class="subtext">${subtext}</span>`);
    a.append(divTitle);
    if (detail)
        a.append(`<div class="detail">${detail}</div>`);
    if(arrow)
        a.append(`<div class="arrow"><div class="icon"></div></div>`);
    li.append(a);
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
    let text = "<div>";
    let references = Bible.GetBooksAndVersess(scripture);
    for(const [book, chapters] of Object.entries(references)){
        //text += `<h3>${book}</h3>`;
        let bibleBook = bible[book];
        for (const [chapter, verses] of Object.entries(chapters)){
            let name = "";
            let scriptures = "";
            let lastVerse = 0;
            let startRange = 0;
            for (let verse of verses){
                if(lastVerse === 0) {name += verse; startRange = verse;}
                else if(lastVerse !== verse - 1) {
                    if(startRange < lastVerse) {
                        name += "-" + lastVerse;
                    }
                    name += "," + verse;
                    startRange = verse;
                }
                if(lastVerse !== 0 && verse - lastVerse > 1) scriptures += "<br/>";
                lastVerse = verse;

                let rawVerse = bibleBook[chapter - 1][verse - 1];
                let verseText = "";
                for(const line of rawVerse.split("\n")){
                    if(line.startsWith("\t"))
                        verseText += "<span class='indent'>" + line + "</span>";
                    else
                        verseText += "<span>" + line + "</span>";
                }
                if(rawVerse.endsWith("\n")) verseText += "<br/>";

                scriptures += ` <b>${verse}</b> <span class="verse serif">${verseText}</span>`;
            }
            if(name !== "" && lastVerse !== startRange) name += "-" + lastVerse;
            text += `\r\n<div class="scripture-header"><div class="scripture">${book} ${chapter}:${name}</div></div>\r\n`;
            text += `<p class="credit">Excerpt from <a target="_blank" rel="noreferrer" href="http://hidereferrer.net/?https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty">New World Translation of the Holy Scriptures</a><br/>© Watch Tower Bible and Tract Society of Pennsylvania</p><p>${scriptures}</p>`;
        }
    }
    text += "</div>";

    $('#tooltip-body').html(text);

    let tooltip = $("#tooltip");
    let width = tooltip.outerWidth();
    let x;
    if(click && $(document).width() > 900)
        x = click.clientX + window.pageXOffset - (width / 2);
    else
        x = ($(document).width() / 2) - (width / 2);
    tooltip.css('left', x).css('top', click.clientY + window.pageYOffset + 30);
    clearTimeout(tooltipFadeout);
    tooltip.stop().fadeIn(200);
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
$(document).on('click', '#btnSideMenu,#searchBackdrop', function(){
    $('body').toggleClass('showSideMenu');
});
$(document).on('click', '#pagination a', function(){
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
    DoSearch();
    return false;
});
$(document).on('click', 'a[href]:not(.paginator)', function(e){
    let doc = $(this).attr('doc');
    if(doc) {
        ShowFile(doc);
        return false;
    }

    let href = $(this).attr('href');
    if(href.startsWith('#')) return true;

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
        window.history.pushState($(this).text(), null, href);
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
    DoSearch();
});
$("#regionBody").mouseenter(function(){
    if(searchDirty)
        DoSearch();
});

var searchDirty = false;
$('input').change(function () {
    searchDirty = true;
    $('#contents .results').fadeTo(600, 0.5);
}).change($.debounce(1200, DoSearch));

var scrollListener;
$(document).ready(()=>{
    Begin();
    scrollListener = new ScrollListener();
});
$(document).on('click', '#manualLoad', Begin);
function Begin(){
    LoadCategories();

    GetPackedData('index/packed.zip')
        .then(async function (files) {
            //console.log(data)
            $('#contents').html('<h4>Click a file to load</h4>');

            let options = files['index.json'];
            infoStore = files['infoStore.json'];
            delete files['index.json'];
            delete files['infoStore.json'];
            index = new FlexSearch.Document(options);
            for (const [filename, file] of Object.entries(files)) {
                console.log("Importing " + filename);
                index.import(filename, file);
            }
            page_data_ready = true;

            $("input[type=search]").on('input', $.debounce(600, DoSearch));
            pageStateChanged();
            window.addEventListener('popstate', function () {
                pageStateChanged();
            });
        });

    $("#search-form input[type=search]").click(function(){
       if(!$("#btnSideMenu").is(":visible")) return;
       $("#btnSideMenu").click();
    });

    // const el = document.querySelector("#currentFileBox");
    // const observer = new IntersectionObserver(
    //     ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
    //     { threshold: [1] }
    // );
    // observer.observe(el);
}

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