// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = date.getDate();

const source: Source = {
  sourceName: 'JC Net',
  sitemapUrl: `https://www.jcnet.com.br/sitemap/2020/${month}/${day}.xml`,
  language: 'pt-br',
  date: dateParser.formatDate(),
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
