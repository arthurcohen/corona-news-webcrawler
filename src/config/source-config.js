sources = [
    {
        sourceName: 'G1',
        sitemapUrl: 'http://pox.globo.com/sitemap/g1/2020/04/07_1.xml',
        profile: {
            titlePattern: {
                pattern: 'meta[property="og:title"]',
                isProp: true
            },
            imagePattern: {
                pattern: 'meta[property="og:image"]',
                isProp: true,
            },
            publicationDatePattern: {
                pattern: 'body > div.glb-grid > main > div.content__signa-share > div.content__signature > div > div > p.content-publication-data__updated > time',
                isProp: false
            }
        }
    },
    {
        sourceName: 'R7',
        sitemapUrl: 'https://www.r7.com/default_sitemaps.xml',
        profile: {
            titlePattern: {
                pattern: 'meta[property="og:title"]',
                isProp: true 
            },
            imagePattern: {
                pattern: 'meta[property="og:image"]',
                isProp: true
            },
            publicationDatePattern: {
                pattern: 'meta[property="article:published_time"]',
                isProp: true
            }
        }
    },
]

module.exports = sources;
