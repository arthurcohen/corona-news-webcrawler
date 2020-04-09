const axios = require('axios');
const xmlParser = require('xml2js');
const cheerio = require('cheerio');
const sources = require('./src/config/source-config');
const { Parser } = require('json2csv');
fs = require('fs');


sources.forEach(source => {

    axios
        .get(source.sitemapUrl)
        .then(function (response) {
            xmlParser.parseString(response.data, async (err, result) => {
                var allNews = [];
                var urls = result.urlset.url.map((r) => r.loc);

                for (let i = 0; i < urls.length; i++) {
                    const u = urls[i];
                    var url = u[0];
                    var httpResponse = await axios.get(url);
                    var $ = cheerio.load(httpResponse.data);
                    var title = getProperty($, source.profile.titlePattern);
                    var imageUrl = getProperty($, source.profile.imagePattern);
                    var pubDate = getProperty($, source.profile.publicationDatePattern);

                    var news = {
                        title: title,
                        imageUrl: imageUrl,
                        pubDate: pubDate,
                        url: url,
                        sourceName: source.sourceName
                    };

                    allNews.push(news);
                    console.log(`Notícia ${i + 1} do ${source.sourceName}`);
                    
                }

                const parser = new Parser();
                const csv = parser.parse(allNews);

                fs.writeFile(`${source.sourceName}.csv`, csv, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                });
            });

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
});

function getProperty($, pattern) {
    if (pattern.isProp) {
        return $(pattern.pattern).prop('content');
    }

    return $(pattern.pattern).text();
}
