const axios = require('axios');
const xmlParser = require('xml2js');

function getSitemapFrom(url) {
    return axios.get(url);
}

async function getNewsUrlFromSitemap(sitemap) {
    parsedSitemap = await xmlParser.parseStringPromise(sitemap);

    return parsedSitemap.urlset.url.map((r) => r.loc[0]);
};


module.exports = { getSitemapFrom, getNewsUrlFromSitemap };
