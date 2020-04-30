// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const today = dateParser.getTodayDate();
const [day, month] = today.split('/');

const source: Source = {
  sourceName: 'Huff Post Brasil',
  sitemapUrl: `https://www.huffpostbrasil.com/sitemaps/archive/sitemap-2020-${month}-${day}.xml`,
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
