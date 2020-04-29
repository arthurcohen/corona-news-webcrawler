// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = date.getDate();

const source: Source = {
  sourceName: 'Jornal do Comércio',
  sitemapUrl: `https://jc.ne10.uol.com.br/sitemap/2019/${month}/${day}.xml`,
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
      pattern: 'meta[property="article:published_time"]',
      isProp: true
    }
  }
};

export default source;
