const axios = require('axios');
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

jest.mock('axios');

describe('fetch sitemap from url', () => {
    describe('given that couldn\'t fetch sitemap', () => {
        beforeEach(() => {
            const resp = { status: 404, data: '' };
            axios.get.mockResolvedValue(resp);
        });

        test('shouldn\'t fetch sitemap from url', async () => {
            const response = await newsService.getFromUrl('');

            expect(response.status).toEqual(404);
        });
    });

    describe('given that sitemap could be fetched', () => {
        beforeEach(() => {
            const resp = { data: siteMapStub };
            axios.get.mockResolvedValue(resp);
        });

        test('should fetch sitemap from url', async () => {
            const response = await newsService.getFromUrl('');

            expect(response.data).toEqual(siteMapStub);
        });
    });
});

describe('given an existent sitemap', () => {
    var sitemap;
    
    test('should get a news list from sitemap', async () => {
        const resp = { data: siteMapStub };

        newsService.getFromUrl = jest.fn((url) => resp);
        sitemap =  newsService.getFromUrl().data;

        expect(sitemap).toBe(siteMapStub);

        const newsUrls = await newsService.getNewsUrlFromSitemap(sitemap);

        expect(newsUrls).toHaveLength(1);
    });

    test('should get info from html news content', () => {
        const resp = { data: htmlUrlContentStub };
        const url = '';

        const news = {
            title: '',
            pubDate: '',
            imageURL: '',
            url: ''
        };

        axios.get.mockResolvedValue(resp);
        
        const htmlUrlContent = newsService.getFromUrl(url);
        
        expect(htmlUrlContent).toEqual(htmlUrlContentStub);
    });
});
