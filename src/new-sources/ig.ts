// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [, month] = today.split('/');

const source: Source = {
  sourceName: 'IG',
  sitemapUrl: `https://ultimosegundo.ig.com.br/sitemap-articles/v1/2020-${month}.xml`,
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
      pattern: 'meta[property="article:published_time"]',
      isProp: true
    }
  }
};

export default source;
