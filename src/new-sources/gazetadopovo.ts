// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [day, month, year] = today.split('/');

const source: Source = {
  sourceName: 'Gazeta do Povo',
  sitemapUrl: `https://www.gazetadopovo.com.br/${year}/${month}/${year}-${month}-${day}.xml`,
  language: 'pt-br',
  filterUrlset: sitemapUtils.getTodayUrls,
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
      pattern: 'meta[property="article:published_time"]',
      isProp: true
    }
  }
};

export default source;
