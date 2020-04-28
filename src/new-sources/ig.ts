// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');

const source: Source = {
  sourceName: 'IG',
  sitemapUrl: `https://ultimosegundo.ig.com.br/sitemap-articles/v1/2020-${month}.xml`,
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
