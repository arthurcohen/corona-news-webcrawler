import dateParser from '../utils/dateParser';
// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [day, month, year] = today.split('/');
const dayWithouLeftZero = day.replace(/^0+/, '');

const source: Source = {
  sourceName: 'A Gazeta',
  sitemapUrl: `https://www.agazeta.com.br/${year}/${month}/${year}-${month}-${dayWithouLeftZero}.xml`,
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
      isProp: true
    }
  }
};

export default source;
