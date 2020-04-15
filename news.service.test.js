const newsService = require('./news.service');

const siteMapStub =
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        <url>
            <loc>https://oglobo.globo.com/cultura/maria-flor-sobre-ataques-virtuais-nao-vou-me-calar-24356723</loc>
        </url>
    </urlset>`;

const htmlUrlContentStub = 
`<html>
    <head></head>
    <body></body>
</html>`;

describe('given an existent sitemap', () => {
    
    test('should get a news list from sitemap', async () => {
        const newsUrls = await newsService.getNewsUrlFromSitemap(siteMapStub);
        expect(newsUrls).toHaveLength(1);
    });

    // test('should get info from html news content', () => {
    //     const resp = { data: htmlUrlContentStub };
    //     const url = '';

    //     const news = {
    //         title: '',
    //         pubDate: '',
    //         imageURL: '',
    //         url: ''
    //     };

    //     axios.get.mockResolvedValue(resp);
        
    //     const htmlUrlContent = newsService.getFromUrl(url);
        
    //     expect(htmlUrlContent).toEqual(htmlUrlContentStub);
    // });
});
