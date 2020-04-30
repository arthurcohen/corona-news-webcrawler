import axios from 'axios';
import newsService from './services/news.service';
import sourceFactory from './config/source-config';
import dataService from './services/data.service';

async function batch() {
  let sources = await sourceFactory;

  const languageOption = process.argv.slice(2)[0];
  const languagesAvailable = sources
    .map((s) => s.language.toLowerCase())
    .filter((s, i, self) => i === self.indexOf(s));

  if (
    languageOption &&
    languagesAvailable.includes(languageOption.toLocaleLowerCase())
  ) {
    process.stdout.write(
      `filtering news from ${languageOption} sources only\n`
    );
    sources = sources.filter(
      (s) => s.language.toLowerCase() === languageOption.toLowerCase()
    );
  } else if (languageOption) {
    process.stdout.write(
      `The given language option is invalid: ${languageOption}\n`
    );
    process.stdout.write('The available language option are:\n');
    languagesAvailable.forEach((l) => process.stdout.write(`\t${l}\n`));

    process.stdout.write('ignoring language filter\n');
  }

  process.stdout.write('fetching news from');
  for (const source of sources) {
    process.stdout.write(`\n${source.sourceName}: `);
    const startTime = new Date().getTime();
    let response;
    try {
      response = await axios.get(source.sitemapUrl);
    } catch (e) {
      process.stdout.write('Error get sitemapUrl\n');
      continue;
    }

    const urls = await newsService.getNewsUrlFromSitemap(response.data, source.filterUrlset);

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
    process.stdout.write(` (${new Date().getTime() - startTime} ms)`);
  }
}

export default batch;
