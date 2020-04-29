import * as cheerio from 'cheerio';
import * as xmlParser from 'xml2js';
import { Parser } from 'json2csv';
import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
// eslint-disable-next-line no-unused-vars
import { Source, Pattern } from '../interfaces/source';
import reservedWords from '../utils/reservedWords';
import dateParser from '../utils/dateParser';

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

function getNewsFromHtml(html: string, source: Source, url: string): News {
  const $ = cheerio.load(html);

  const title = getProperty($, source.profile.titlePattern).trim();
  const imageUrl = getProperty($, source.profile.imagePattern).trim();
  let pubDate = source.date;

  if (!pubDate) {
    const date1 = dateParser.getDateFromString(getProperty($, source.profile.publicationDatePattern).trim());
    const date2 = pubDate = dateParser.getDateFromURL(url);
    const date3 = pubDate = dateParser.getDateFromURL(imageUrl);
    pubDate = !date1 ? date2 : date1;
    pubDate = !pubDate ? date3 : pubDate;
  }

  const news: News = {
    title,
    url: url,
    imageUrl,
    sourceName: source.sourceName.trim(),
    pubDate,
    rank: 0
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
  const fileName = `${path}/the-good-news.csv`;
  try {
    fs.mkdirSync(path);
  } catch {
    // dir already exists
  }
  fs.writeFileSync(fileName, csv, 'utf8');

  return fileName;
}

function calculateRank(title: string, language:string) : number {
  let rank = 0;
  if (reservedWords[language]) {
    reservedWords[language].forEach(reservedWord => {
      if (title.toLowerCase().includes(reservedWord.name)) {
        rank += reservedWord.rank;
      }
    });
  }
  return rank;
}

export default {
  getNewsUrlFromSitemap,
  getNewsFromHtml,
  exportNewsToCsv,
  convertNewsToCsv,
  calculateRank
};
