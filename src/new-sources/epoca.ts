// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const source: Source = {
  sourceName: 'Época',
  sitemapUrl: 'https://oglobo.globo.com/sitemap/today-epoca.xml',
  language: 'pt-br',
  date: dateParser.formatDate(),
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
      pattern: 'meta[property="article:published_time"]',
      isProp: true
    }
  }
};

export default source;
