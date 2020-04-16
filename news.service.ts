import * as cheerio from 'cheerio';
import * as xmlParser from 'xml2js';
import { Parser } from 'json2csv';
import * as fs from 'fs';

async function getNewsUrlFromSitemap(sitemap) {
  const parsedSitemap = await xmlParser.parseStringPromise(sitemap);
  return parsedSitemap.urlset.url.map((r) => r.loc[0]);
};

function getNewsFromHtml(html, source) {
  const $ = cheerio.load(html);

  const title = getProperty($, source.profile.titlePattern).trim();
  const imageUrl = getProperty($, source.profile.imagePattern).trim();
  const pubDate = getProperty($, source.profile.publicationDatePattern).trim();

  const news = {
    title,
    imageUrl,
    pubDate,
    sourceName: source.sourceName.trim()
  };

  return news;
}

function getProperty($, pattern) {
  if (pattern.isProp) {
    return $(pattern.pattern).prop('content');
  }

  return $(pattern.pattern).text();
}

function exportNewsToCsv(allNews) {
  const parser = new Parser();
  const csv = parser.parse(allNews);

  fs.writeFile(`the-good-news-${new Date().toISOString()}.csv`, csv, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
  });
}

export default { getNewsUrlFromSitemap, getNewsFromHtml, exportNewsToCsv };
