// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'Jornal Estado de Minas',
  sitemapUrl: 'https://www.em.com.br/sitemapnews.xml',
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
      pattern: '',
      isProp: true
    }
  }
};

export default source;
