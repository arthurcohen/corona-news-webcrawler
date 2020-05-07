// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';
import dateParser from '../utils/dateParser';

const source: Source = {
  sourceName: 'The Washington Post',
  sitemapUrl: 'https://www.washingtonpost.com/arcio/news-sitemap/',
  language: 'en-us',
  date: dateParser.getTodayDate(),
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
      pattern: '',
      isProp: false
    }
  }
};

export default source;
