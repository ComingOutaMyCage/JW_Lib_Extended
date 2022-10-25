const fs = require('fs-extra')
const xml = require('xml')

class SitemapWriter {
    constructor({ outFile, host }) {
        this.outFile = outFile
    }
    async writeSitemap(pages) {
        // Construct the XML object
        const xmlObject = {
            urlset: [
                // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                {
                    _attr: {
                        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
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
        // Write the file to disk
        await fs.writeFile(
            this.outFile,
            '<?xml version="1.0" encoding="UTF-8"?>' + xmlString
        )
    }
}

if(typeof module !== 'undefined')
    module.exports = { SitemapWriter };