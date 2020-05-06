// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [, month, year] = today.split('/');

const source: Source = {
  sourceName: 'Nexo',
  sitemapUrl: `https://www.nexojornal.com.br/sitemap-${year}-${month}.xml`,
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
      pattern: 'meta[name="articlePublishTime"]',
      isProp: true
    }
  }
};

export default source;
