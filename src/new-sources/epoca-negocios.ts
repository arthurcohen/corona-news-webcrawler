// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const source: Source = {
  sourceName: 'Época Negócios',
  sitemapUrl: 'https://epocanegocios.globo.com/sitemap/epoca-negocios/sitemapnews.xml',
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
      pattern: '#content > div.paywall__site-container > main > article > header > div.authorship > time',
      isProp: true
    }
  }
};

export default source;
