import axios from "axios";
import newsService from "./services/news.service";
import sourceFactory from "./config/source-config";

async function batch() {
  var today = formatDate();
  const allNews = [];
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
    process.stdout.write("The available language option are:\n");
    languagesAvailable.forEach((l) => process.stdout.write(`\t${l}\n`));

    process.stdout.write("ignoring language filter\n");
  }

  process.stdout.write("fetching news from");
  for (const source of sources) {
    process.stdout.write(`\n${source.sourceName}: `);
    const startTime = new Date().getTime();
    const response = await axios.get(source.sitemapUrl);
    const urls = await newsService.getNewsUrlFromSitemap(response.data);

    for (const url of urls) {
      const httpResponse = await axios.get(url);

      const news = {
        ...newsService.getNewsFromHtml(httpResponse.data, source, url),
      };

      if (news.pubDate === today) {
        allNews.push(news);
        const newsCSV = newsService.convertNewsToCsv(allNews);
        newsService.exportNewsToCsv(newsCSV);
        process.stdout.write(".");
      }
    }
    process.stdout.write(` (${new Date().getTime() - startTime} ms)`);
  }
}

function formatDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export default batch;
