import * as cheerio from 'cheerio';
import * as xmlParser from 'xml2js';
import { Parser } from 'json2csv';
import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
// eslint-disable-next-line no-unused-vars
import { Source, Pattern } from '../interfaces/source';

async function getNewsUrlFromSitemap(sitemap: string): Promise<string[]> {
  const parsedSitemap = await xmlParser.parseStringPromise(sitemap);
  return getRecursiveUrlSet(parsedSitemap.urlset);
};

function getRecursiveUrlSet(urlset: any) {
  if (urlset.urlset != null) {
    return getRecursiveUrlSet(urlset.urlset[0]);
  }

  return urlset.url.map((r) => r.loc[0]);
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
  let property: string;

  if (pattern.isProp) {
    property = $(pattern.pattern).prop('content');
  } else {
    property = $(pattern.pattern).text();
  }

  return property || '';
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
