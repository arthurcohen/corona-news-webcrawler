const axios = require('axios');
const sources = require('./src/config/source-config');
const newsService = require('./news.service');

async function batch(){
    const allNews = [];

    for(const source of sources){
        const response = await axios.get(source.sitemapUrl);
        const urls = await newsService.getNewsUrlFromSitemap(response.data);

        for (const url of urls) {
            const httpResponse = await axios.get(url);
            const news = newsService.getNewsFromHtml(httpResponse.data, source);
            news.url = url;
            allNews.push(news);
        }
    }

    newsService.exportNewsToCsv(allNews);
}

batch();
