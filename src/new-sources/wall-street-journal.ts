// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const source: Source = {
  sourceName: 'The Wall Street Journal',
  sitemapUrl: 'https://www.wsj.com/wsjsitemaps/wsj_google_news.xml',
  language: 'en-us',
  filterUrlset: sitemapUtils.getTodayUrls,
  profile: {
    titlePattern: {
      pattern: 'meta[property="og:title"]',
      isProp: true
    },
    imagePattern: {
      pattern: 'meta[property="og:image"]',
      isProp: true
    },
    publicationDatePattern: {
      pattern: 'meta[itemprop="datePublished"]',
      isProp: true
    }
  }
};

export default source;
