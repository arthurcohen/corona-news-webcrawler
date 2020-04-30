// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const today = dateParser.getTodayDate();
const [day, month] = today.split('/');

const source: Source = {
  sourceName: 'JC Net',
  sitemapUrl: `https://www.jcnet.com.br/sitemap/2020/${month}/${day}.xml`,
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
      pattern: 'meta[property="article:published_time"]',
      isProp: true
    }
  }
};

export default source;
