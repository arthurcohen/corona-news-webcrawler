import * as cheerio from 'cheerio';
import * as xmlParser from 'xml2js';
import { Parser } from 'json2csv';
import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import News from './src/config/interface/news';
// eslint-disable-next-line no-unused-vars
import { Source, Pattern } from './src/config/interface/source';

async function getNewsUrlFromSitemap(sitemap: string): Promise<string[]> {
  const parsedSitemap = await xmlParser.parseStringPromise(sitemap);
  return parsedSitemap.urlset.url.map((r) => r.loc[0]);
};

function getNewsFromHtml(html: string, source: Source): News {
  const $ = cheerio.load(html);

  const title = getProperty($, source.profile.titlePattern).trim();
  const imageUrl = getProperty($, source.profile.imagePattern).trim();
  const pubDate = getProperty($, source.profile.publicationDatePattern).trim();

  const news: News = {
    title,
    imageUrl,
    pubDate,
    sourceName: source.sourceName.trim(),
    url: ''
  };

  return news;
}

function getProperty($: CheerioStatic, pattern: Pattern): string {
  if (pattern.isProp) {
    return $(pattern.pattern).prop('content');
  }

  return $(pattern.pattern).text();
}

function convertNewsToCsv(allNews: News[]): string {
  const parser = new Parser();
  return parser.parse(allNews);
}

function exportNewsToCsv(csv: string, path = './files'): string {
  const fileName = `${path}/the-good-news-${new Date().toISOString()}.csv`;
  try {
    fs.mkdirSync(path);
  } catch {
    // dir already exists
  }
  fs.writeFileSync(fileName, csv, 'utf8');
  return fileName;
}

export default { getNewsUrlFromSitemap, getNewsFromHtml, exportNewsToCsv, convertNewsToCsv };
