const axios = require('axios');
const xmlParser = require('xml2js');

async function getNewsUrlFromSitemap(sitemap) {
    parsedSitemap = await xmlParser.parseStringPromise(sitemap);
    return parsedSitemap.urlset.url.map((r) => r.loc[0]);
};

module.exports = { getNewsUrlFromSitemap };
