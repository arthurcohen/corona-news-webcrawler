// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'Revista Galileu',
  sitemapUrl: 'https://revistagalileu.globo.com/sitemap/galileu/sitemapnews.xml',
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
      isProp: false
    }
  }
};

export default source;
