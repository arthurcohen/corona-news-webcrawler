const cheerio = require('cheerio');
const xmlParser = require('xml2js');

async function getNewsUrlFromSitemap(sitemap) {
    parsedSitemap = await xmlParser.parseStringPromise(sitemap);
    return parsedSitemap.urlset.url.map((r) => r.loc[0]);
};

function getNewsFromHtml(html, source) {
    const $ = cheerio.load(html);
    
    const title = getProperty($, source.profile.titlePattern);
    const imageUrl = getProperty($, source.profile.imagePattern);
    const pubDate = getProperty($, source.profile.publicationDatePattern);

    const news = {
        title: title,
        imageUrl: imageUrl,
        pubDate: pubDate,
        sourceName: source.sourceName
    };

    return news;
}


function getProperty($, pattern) {
    if (pattern.isProp) {
        return $(pattern.pattern).prop('content');
    }

    return $(pattern.pattern).text();
}

module.exports = { getNewsUrlFromSitemap, getNewsFromHtml };
