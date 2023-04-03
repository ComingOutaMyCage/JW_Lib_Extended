class CoverGallery {

    static pagesShown = [];

    static init(){
        let index = getIndex();
        this.json = [];
        let lastInfoId = null;
        for (const [key, store] of Object.entries(index.store)) {
            if(lastInfoId === store.iid) continue;
            lastInfoId = store.iid;
            let infoStoreItem = infoStore[store.iid];
            if (!infoStoreItem.thb) continue;
            this.json.push({
                t: store.p,
                f: getThumbnailForStore(store),
                w: 1060,
                h: 1357,
                y: infoStoreItem.Year ?? 0,
            });
        }
        //sort json by y
        this.json.sort((a, b) => a.y - b.y);
        console.log(this.json);
    }

    static json = null;
    static ShowGallery(randomPage = false) {
        if(!CheckPackedDataLoaded()){
            setTimeout(this.ShowGallery, 100);
            return;
        }

        if(this.json == null)
        {
            this.init();
            this.pagesShown = (localStorage.getItem('gallery-pages-seen') ?? '').split(' ').map(x => parseInt(x));
            // return $.getJSON('index/images.json', function(resp) {
            //     CoverGallery.json = resp;
             CoverGallery._showImages(randomPage);
            // });
        }
        return this._showImages(randomPage);
    }
    static getRandomPage(maxPages){
        let page = 1;
        for(let i = 0; i < 50; i++) {
            page = Math.ceil(maxPages * Math.random());
            if(!this.pagesShown.includes(page))
                break;
            page = Math.max(1, (page - 1));
            if(!this.pagesShown.includes(page))
                break;
        }
        return page;
    }
    static itemsPerPage = 40;
    static  getMaxPages(){
        return Math.ceil(this.json.length / this.itemsPerPage);
    }
    static jumpToIndex(index){
        let page = 1 + Math.floor(index / this.itemsPerPage);
        setPageState('page', page);
    }
    static ShowYear(newYear){
        let index = CoverGallery.json.findIndex(d => d.y == newYear);
        if (index >= 0) {
            CoverGallery.jumpToIndex(index);
            CoverGallery.ShowGallery();
        } else {
            alert("Couldnt find any images for " + newYear);
        }
    }
    static _showImages(randomPage = false){
        let page = randomPage ? null : (getPageState('page') ?? null);
        let allImages = this.json;
        let maxPages = this.getMaxPages();
        if(page == null) {
            page = this.getRandomPage(maxPages);
        }
        page = parseInt(page);
        localStorage.setItem('gallery-pages-seen', this.pagesShown.join(' '));
        if(!this.pagesShown.includes(page)) {
            this.pagesShown.push(page);
            if(this.pagesShown.length > maxPages * 0.8)
                this.pagesShown = this.pagesShown.slice(maxPages * 0.3);
        }
        setPageState('page', page);
        setPageTitle("WTBTS Image Gallery" + pageTitleEnd);
        setPageDescription("Images since 1880 used in Jehovahs Witness publications");

        let pagination = generatePagination(allImages.length, this.itemsPerPage, page - 1, this.getRandomPage(maxPages));
        pagination.addClass('mb-2 mt-2')

        let startItem = (page - 1) * this.itemsPerPage;
        let images = allImages.slice(startItem, startItem + this.itemsPerPage);

        let imageFlow = $("<div class='imageFlow'></div>");
        for(const img of images){
            let article = '#none';
            if (img.t){
                let dir = "data/";//getPath(getPath(img.f)) + "/";
                article = '?file=' + encodeURICompClean(dir + img.t) + "#imgsrc=" + basename(img.f);
            }
            else if (img.f.indexOf('_files') >= 0) {
                article = img.f.replace(/_files.*$/g, '.html');
                article = '?file=' + encodeURICompClean(article) + "#imgsrc=" + basename(img.f);
            }
            imageFlow.append(`
<div style="width:${img.w*180/img.h}px;flex-grow:${img.w*200/img.h}">
    <i style="padding-bottom:${img.h/img.w*100}%"></i>
    <a href="${article}"><img src="${img.f}" alt=""></a>
</div>`);
        }

        let seedUrl = setUrlState(location.href, 'page', page);
        let ControlBar = `
<div class="mb-2 mt-2">
<div class="input-group float-right">
    <input id="shareUrl" type="url" class="form-control" style="max-width: 500px" name="shareURL" value="${seedUrl}" />
    <div class="input-group-append"><button type="button" onclick="CoverGallery.CopyUrlToClipboard()" class="btn btn-primary" type="button">Copy Shareable Link</button></div>
</div>
<span style="color: white">Clicking an image will take you to that spot in the article.</span>
</div>`
        $("#contents").empty().append(ControlBar).append(pagination.clone()).append("<button class='btn btn-outline-light btn-lg' id='yearNum'>"+images[0].y+"</button>").append(imageFlow).append(pagination).append("<div style='height: 200px'></div>");
    }

    static CopyUrlToClipboard(){
        let input = document.getElementById("shareUrl").value;
        navigator.clipboard.writeText(input).then(r => {});
    }
}
$(document).on('click', '#yearNum', function() {
    let newYear = prompt("Enter year", $(this).text());
    if (newYear === null || newYear === undefined) return;
    newYear = parseInt(newYear.trim());
    CoverGallery.ShowYear(newYear);
});