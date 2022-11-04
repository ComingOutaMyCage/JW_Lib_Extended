class ImageGallery {

    static pagesShown = [];

    static json = null;
    static ShowGallery(randomPage = false) {
        if(!this.json){
            this.pagesShown = (localStorage.getItem('gallery-pages-seen') ?? '').split(' ').map(x => parseInt(x));
            $.getJSON('index/images.json', function(resp) {
                ImageGallery.json = resp;
                ImageGallery._showImages(randomPage);
            });
            return;
        }
        this._showImages(randomPage);
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
    static _showImages(randomPage = false){
        let itemsPerPage = 40;
        let page = randomPage ? null : (getPageState('page') ?? null);
        let allImages = this.json;
        let maxPages = Math.ceil(allImages.length / itemsPerPage);
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

        let pagination = generatePagination(allImages.length, itemsPerPage, page - 1, this.getRandomPage(maxPages));
        pagination.addClass('mb-2 mt-2')

        let startItem = (page - 1) * itemsPerPage;
        let images = allImages.slice(startItem, startItem + itemsPerPage);

        let imageFlow = $("<div class='imageFlow'></div>");
        for(const img of images){
            let article = img.f.replace(/_files.*$/g, '.html');
            article = '?file=' + article + "#imgsrc=" + basename(img.f);
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
    <div class="input-group-append"><button type="button" onclick="ImageGallery.CopyUrlToClipboard()" class="btn btn-primary" type="button">Copy Shareable Link</button></div>
</div>
<span style="color: white">Clicking an image will take you to that spot in the article.</span>
</div>`
        $("#contents").empty().append(ControlBar).append(pagination.clone()).append(imageFlow).append(pagination).append("<div style='height: 200px'></div>");
    }

    static CopyUrlToClipboard(){
        let input = document.getElementById("shareUrl").value;
        navigator.clipboard.writeText(input).then(r => {});
    }
}