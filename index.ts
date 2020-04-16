import axios from 'axios';
import sources from './src/config/source-config';
import newsService from './news.service';

async function batch() {
  const allNews = [];

  for (const source of sources) {
    const response = await axios.get(source.sitemapUrl);
    const urls = await newsService.getNewsUrlFromSitemap(response.data);

    for (const url of urls.splice(0, 2)) {
      const httpResponse = await axios.get(url);
      const news = { url, ...newsService.getNewsFromHtml(httpResponse.data, source) };
      allNews.push(news);
    }
  }

  newsService.exportNewsToCsv(allNews);
}

batch();
