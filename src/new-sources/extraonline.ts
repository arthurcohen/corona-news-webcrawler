// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const today = dateParser.getTodayDate();

const source: Source = {
  sourceName: 'Extra Online',
  sitemapUrl: 'https://extra.globo.com/sitemap/today.xml',
  language: 'pt-br',
  date: today,
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
      pattern: 'meta[property="og:updated_time"]',
      isProp: true
    }
  }
};

export default source;
