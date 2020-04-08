const axios = require('axios');
const newsService = require('./news.service');

const siteMapStub =
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    <url>
        <loc>https://oglobo.globo.com/cultura/maria-flor-sobre-ataques-virtuais-nao-vou-me-calar-24356723</loc>
    </url>
</urlset>`;

jest.mock('axios');

describe('fetch sitemap from url', () => {
    describe('given that couldn\'t fetch sitemap', () => {
        beforeEach(() => {
            const resp = { status: 404, data: '' };
            axios.get.mockResolvedValue(resp);
        });

        test('shouldn\'t fetch sitemap from url', async () => {
            const response = await newsService.getSitemapFrom('');

            expect(response.status).toEqual(404);
        });
    });

    describe('given that sitemap could be fetched', () => {
        beforeEach(() => {
            const resp = { data: siteMapStub };
            axios.get.mockResolvedValue(resp);
        });

        test('should fetch sitemap from url', async () => {
            const response = await newsService.getSitemapFrom('');

            expect(response.data).toEqual(siteMapStub);
        });
    });
});

describe('given a sitemap', () => {
    var sitemap;

    beforeEach(() => {
        const resp = { data: siteMapStub };
        newsService.getSitemapFrom = jest.fn((url) => resp);
    });
    
    test('should get a news list from sitemap', async () => {
        sitemap =  newsService.getSitemapFrom().data;

        expect(sitemap).toBe(siteMapStub);

        const newsUrls = await newsService.getNewsUrlFromSitemap(sitemap);

        expect(newsUrls).toHaveLength(1);
    });

    test('should fetch news page from url', () => {

    });
});
