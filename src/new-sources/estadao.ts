// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'Estadão',
  sitemapUrl: 'https://www.estadao.com.br/sitemaps/auto/mes-atual/sitemap-news.xml',
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
      pattern: '#sw-P_1.3281644 > div > section > div > section.col-xs-12.col-content.col-center > div.box.area-select > div.n--noticia__state > div > p',
      isProp: true
    }
  }
};

export default source;
