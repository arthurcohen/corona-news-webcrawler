const axios = require('axios');
const sources = require('./src/config/source-config');
const { Parser } = require('json2csv');
const newsService = require('./news.service');
const fs = require('fs');

async function batch(){
    for(let i = 0; i < sources.length; i++){
        source = sources[i];
        const response = await axios.get(source.sitemapUrl);
        const urls = await newsService.getNewsUrlFromSitemap(response.data);
        const allNews = [];
    
        for (let i = 0; i < 6 /*urls.length*/; i++) {
            const url = urls[i];
            const httpResponse = await axios.get(url);
            const news = newsService.getNewsFromHtml(httpResponse.data, source);
            news.url = url;
            allNews.push(news);
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

batch();