import axios from 'axios';
import sourceFactory from './config/source-config';
import newsService from './services/news.service';

async function batch() {
  const allNews = [];
  let sources = await sourceFactory;

  const languageOption = process.argv.slice(2)[0];
  const languagesAvailable = sources.map(s => s.language.toLowerCase()).filter((s, i, self) => i === self.indexOf(s));

  if (languageOption && languagesAvailable.includes(languageOption.toLocaleLowerCase())) {
    process.stdout.write(`filtering news from ${languageOption} sources only\n`);
    sources = sources.filter(s => s.language.toLowerCase() === languageOption.toLowerCase());
  } else if (languageOption) {
    process.stdout.write(`The given language option is invalid: ${languageOption}\n`);
    process.stdout.write('The available language option are:\n');
    languagesAvailable.forEach(l => process.stdout.write(`\t${l}\n`));

    process.stdout.write('ignoring language filter\n');
  }

  process.stdout.write('fetching news from');
  console.log();
  for (const source of sources) {
    process.stdout.write(`\n${source.sourceName}: `);
    const startTime = new Date().getTime();
    const response = await axios.get(source.sitemapUrl);
    const urls = await newsService.getNewsUrlFromSitemap(response.data);

    for (const url of urls.splice(0, 4)) {
      process.stdout.write('.');
      const httpResponse = await axios.get(url);
      const news = { ...newsService.getNewsFromHtml(httpResponse.data, source), url };
      allNews.push(news);
    }

    process.stdout.write(` (${new Date().getTime() - startTime} ms)`);
  }

  const newsCSV = newsService.convertNewsToCsv(allNews);
  newsService.exportNewsToCsv(newsCSV);
};

export default batch;
