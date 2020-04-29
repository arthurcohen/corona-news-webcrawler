// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'The Guardian',
  sitemapUrl: 'https://www.theguardian.com/sitemaps/news.xml',
  language: 'en-us',
  date: '',
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
