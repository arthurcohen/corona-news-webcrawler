const axios = require('axios');
const xmlParser = require('xml2js');
const cheerio = require('cheerio');
const sources = require('./src/config/source-config');
const { Parser } = require('json2csv');
const newsService = require('./news.service');
fs = require('fs');

async function batch(){
    for(let i = 0; i < sources.length; i++){
        source = sources[i];

        const response = await axios.get(source.sitemapUrl);
        const urls = await newsService.getNewsUrlFromSitemap(response.data);
        var allNews = [];
    
        for (let i = 0; i < 3 /*urls.length*/; i++) {
            var url = urls[i];
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
    }
}

function getProperty($, pattern) {
    if (pattern.isProp) {
        return $(pattern.pattern).prop('content');
    }

    return $(pattern.pattern).text();
}

batch();