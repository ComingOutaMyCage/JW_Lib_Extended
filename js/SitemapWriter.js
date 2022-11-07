const fs = require('fs-extra')
const fse = require('fs-extra')
const xml = require('xml')
const zlib = require("zlib");

class SitemapWriter {
    constructor({ outFile, host }) {
        this.outFile = outFile
    }
    async writeSitemap(pages, index = 0) {
        if(pages.length > 25000){
            for(let i = 0; i < pages.length; i+=20000) {
                await this.writeSitemap(pages.slice(i, i + 20000), index++);
            }
            return;
        }
        const xmlObject = {
            urlset: [
                {
                    _attr: {
                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
                        "xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd",
                        "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
                    }
                },
                // For every page of the site, generate a <url> object
                ...pages.map((page) => {
                    return {
                        // <url>
                        url: [
                            // <loc>http://www.example.com/</loc>
                            { loc: page.href },
                            // <lastmod>2005-01-01</lastmod>
                            { lastmod: page.srcFileLastModifiedAt },
                            // <changefreq>monthly</changefreq>
                            // { changefreq: 'monthly' },
                            // <priority>0.8</priority>
                            // { priority: 0.5 }
                        ]
                    }
                })
            ]
        }
        // Generate the XML markup
        const xmlString = xml(xmlObject, {indent: ' '});
        let outname = this.outFile;
        if(index > 0)
            outname = outname.replace(".xml", `${index + 1}.xml`);
        await fse.writeFile(
            outname,
            '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString
        )
        SitemapWriter.compressFile(outname);
    }
    static compressFile = (filePath) => {
        const stream = fs.createReadStream(filePath);
        stream
            .pipe(zlib.createGzip())
            .pipe(fs.createWriteStream(`${filePath}.gz`))
            .on("finish", () =>
                console.log(`Successfully compressed the file at ${filePath}`)
            );
    };
}

if(typeof module !== 'undefined')
    module.exports = { SitemapWriter };