import axios from "axios";
import sources from "./config/source-config";
import newsService from "./services/news.service";

async function batch() {
  const allNews = [];
  var today = formatDate();

  for (const source of await sources) {
    const response = await axios.get(source.sitemapUrl);
    const urls = await newsService.getNewsUrlFromSitemap(response.data);

    for (const url of urls.splice(0, 2)) {
      const httpResponse = await axios.get(url);
      const news = {
        ...newsService.getNewsFromHtml(httpResponse.data, source, url),
      };

      if (news.pubDate === today) {
        allNews.push(news);
      }
    }
  }

  const newsCSV = newsService.convertNewsToCsv(allNews);
  newsService.exportNewsToCsv(newsCSV);
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
