// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const source: Source = {
  sourceName: 'A Cidade On',
  sitemapUrl: 'https://www.acidadeon.com/sitemap/noticias.sitemap',
  language: 'pt-br',
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
      pattern: 'meta[name="cXenseParse:recs:publishtime"]',
      isProp: false
    }
  }
};

export default source;
