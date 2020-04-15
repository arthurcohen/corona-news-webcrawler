const newsService = require('./news.service');

const siteMapStub =
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        <url>
            <loc>https://oglobo.globo.com/cultura/maria-flor-sobre-ataques-virtuais-nao-vou-me-calar-24356723</loc>
        </url>
    </urlset>`;

const titleStub = 'Title stub';
const imageUrlStub = 'http://sourcestub.com/imageStub';
const publishedDateStub = '01/01/0001 00:00:00';
const htmlStub = 
`<html>
    <head>
        <meta property="og:title" content="${titleStub}">
        <meta property="og:image" content="${imageUrlStub}">
    </head>
    <body>${publishedDateStub}</body>
</html>`;

const sourceStub = 
    {
        sourceName: 'SourceStub',
        sitemapUrl: 'http://sourcestub.com/sitemap',
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
                pattern: 'body',
                isProp: false
            }
        }
    };

describe('given an existent sitemap', () => {
    
    test('should get a news list from sitemap', async () => {
        const newsUrls = await newsService.getNewsUrlFromSitemap(siteMapStub);
        expect(newsUrls).toHaveLength(1);
    });

    test('should get info from html news content', () => {
        const news = newsService.getNewsFromHtml(htmlStub, sourceStub);
        
        expect(news.title).toBe(titleStub);
        expect(news.imageUrl).toBe(imageUrlStub);
        expect(news.pubDate).toBe(publishedDateStub);
        expect(news.sourceName).toBe(sourceStub.sourceName);
    });
});
