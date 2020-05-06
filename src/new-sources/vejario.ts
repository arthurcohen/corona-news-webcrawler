// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const today = dateParser.getTodayDate();
const [day, month, year] = today.split('/');

const source: Source = {
  sourceName: 'Veja Rio',
  sitemapUrl: `https://vejario.abril.com.br/sitemap.xml?yyyy=${year}&mm=${month}&dd=${day}`,
  language: 'pt-br',
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
      pattern: 'meta[property="bt:pubDate"]',
      isProp: true
    }
  }
};

export default source;
