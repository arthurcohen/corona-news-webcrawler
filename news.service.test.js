const axios = require('axios');
const getSitemapFrom = require('./news.service');

const siteMapStub = 
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    <url>
        <loc>https://oglobo.globo.com/cultura/maria-flor-sobre-ataques-virtuais-nao-vou-me-calar-24356723</loc>
    </url>
</urlset>`;

jest.mock('axios');

test('should fetch sitemap from url', async () => {
    const resp = { data: siteMapStub };

    axios.get.mockResolvedValue(resp);

    const response = await getSitemapFrom('');

    expect(response.data).toEqual(siteMapStub);
});