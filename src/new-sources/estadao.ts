// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const source: Source = {
  sourceName: 'Estadão',
  sitemapUrl: 'https://saude.estadao.com.br/sitemaps/auto/mes-atual/sitemap-news.xml',
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
      pattern: '#sw-P_1.3281644 > div > section > div > section.col-xs-12.col-content.col-center > div.box.area-select > div.n--noticia__state > div > p',
      isProp: true
    }
  }
};

export default source;
