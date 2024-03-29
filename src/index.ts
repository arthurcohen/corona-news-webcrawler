import axios from 'axios';
import newsService from './services/news.service';
import dataService from './services/data.service';
// eslint-disable-next-line no-unused-vars
import { Source } from './interfaces/source';

async function batch(sourcesArray: Source[], language: string) {
  process.stdout.write('fetching news from');
  dataService.configuraDataService(language);
  const opn = require('open');

  for (const source of sourcesArray) {
    process.stdout.write(`\n${source.sourceName}: `);
    const startTime = new Date().getTime();
    let response;
    try {
      response = await axios.get(source.sitemapUrl);
    } catch (e) {
      process.stdout.write('Error get sitemapUrl\n');
      continue;
    }

    let urls = await newsService.getNewsUrlFromSitemap(
      response.data,
      source.filterUrlset
    );
    urls = dataService.filterNews(urls);

    for (const url of urls) {
      let httpResponse;
      try {
        httpResponse = await axios.get(url);
      } catch (e) {
        process.stdout.write('x');
        continue;
      }

      const news = {
        ...newsService.buildNews(httpResponse.data, source, url)
      };

      if (newsService.checkNews(news)) {
        dataService.saveNews(news);
        process.stdout.write('.');
      }
    }

    dataService.saveFile();
    process.stdout.write(` (${new Date().getTime() - startTime} ms)`);
  }
  opn('./files/index.html');
}

export default batch;
