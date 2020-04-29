// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'Tecmundo',
  sitemapUrl: 'https://www.tecmundo.com.br/sitemap/noticias/1.xml',
  language: 'pt-br',
  date: '',
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
      pattern: 'body > #js-article-date > strong',
      isProp: true
    }
  }
};

export default source;
