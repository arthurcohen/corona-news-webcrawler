import axios from 'axios';
import sources from './config/source-config';
import newsService from './services/news.service';

async function batch() {
  const allNews = [];

  for (const source of sources) {
    const response = await axios.get(source.sitemapUrl);
    const urls = await newsService.getNewsUrlFromSitemap(response.data);

    for (const url of urls.splice(0, 2)) {
      const httpResponse = await axios.get(url);
      const news = { ...newsService.getNewsFromHtml(httpResponse.data, source), url };
      allNews.push(news);
    }
  }

  const newsCSV = newsService.convertNewsToCsv(allNews);
  newsService.exportNewsToCsv(newsCSV);
};

export default batch;
