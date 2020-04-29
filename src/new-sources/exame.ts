// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = date.getDate();
const year = date.getFullYear();
const source: Source = {
  sourceName: 'Exame',
  sitemapUrl: `https://exame.abril.com.br/sitemap.xml?yyyy=${year}&mm=${month}&dd=${day}`,
  language: 'pt-br',
  date: dateParser.getTodayDate(),
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
      pattern: '',
      isProp: false
    }
  }
};

export default source;
