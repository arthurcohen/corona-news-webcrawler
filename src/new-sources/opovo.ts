// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = date.getDate();

const source: Source = {
  sourceName: 'O Povo',
  sitemapUrl: `https://www.opovo.com.br/sitemap/2020/${month}/${day}.xml`,
  language: 'pt-br',
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
      pattern: 'time[itemprop=datePublished"]',
      isProp: true
    }
  }
};

export default source;
