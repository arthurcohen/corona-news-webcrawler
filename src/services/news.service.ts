import * as cheerio from 'cheerio';
import * as xmlParser from 'xml2js';

// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
// eslint-disable-next-line no-unused-vars
import { Source, Pattern } from '../interfaces/source';
import reservedWords from '../utils/reservedWords';
import dateParser from '../utils/dateParser';

async function getNewsUrlFromSitemap(sitemap: string, filterSitemapUrls?: (urlset: any) => any[]): Promise<string[]> {
  const parsedSitemap = await xmlParser.parseStringPromise(sitemap);
  return getRecursiveUrlSet(parsedSitemap.urlset, filterSitemapUrls);
};

function getRecursiveUrlSet(urlset: any, filterSitemapUrls?: (urlset: any) => any[]) {
  if (urlset.urlset != null) {
    return getRecursiveUrlSet(urlset.urlset[0], filterSitemapUrls);
  }
  const urls = filterSitemapUrls ? filterSitemapUrls(urlset) : urlset.url;
  return urls.map((r) => r.loc[0]);
};

function buildNews(html: string, source: Source, url: string): News {
  const $ = cheerio.load(html);

  const title = getProperty($, source.profile.titlePattern).trim();
  const imageUrl = getProperty($, source.profile.imagePattern).trim();
  let pubDate = source.date;

  if (!pubDate) {
    const dateFromDOM = dateParser.getDateFromString(getProperty($, source.profile.publicationDatePattern).trim());
    const dateFromUrl = dateParser.getDateFromURL(url);
    const dateFromImageUrl = dateParser.getDateFromURL(imageUrl);
    pubDate = dateFromDOM || dateFromUrl || dateFromImageUrl;
  }

  const news: News = {
    title,
    url: url,
    imageUrl,
    sourceName: source.sourceName.trim(),
    pubDate,
    read: false,
    rank: calculateRank(title, source.language)
  };

  return news;
}

function checkNews(news: News) {
  return (!news.pubDate || news.pubDate === dateParser.getTodayDate()) && news.rank > 0;
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
  buildNews,
  calculateRank,
  checkNews
};
