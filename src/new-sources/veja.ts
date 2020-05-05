// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [day, month, year] = today.split('/');

const source: Source = {
  sourceName: 'Veja',
  sitemapUrl: `https://veja.abril.com.br/sitemap.xml?yyyy=${year}&mm=${month}&dd=${day}`,
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
      pattern: 'meta[property="bt:pubDate"]',
      isProp: true
    }
  }
};

export default source;
