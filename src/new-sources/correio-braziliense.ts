// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const source: Source = {
  sourceName: 'Correio Braziliense',
  sitemapUrl: 'https://www.correiobraziliense.com.br/noticia_127983242361_outros_ultimas-noticias_sitemap.xml',
  language: 'pt-br',
  filterUrlset: sitemapUtils.getTodayUrls,
  profile: {
    titlePattern: {
      pattern: 'meta[itemprop="name"]',
      isProp: true
    },
    imagePattern: {
      pattern: 'meta[itemprop="image"]',
      isProp: true
    },
    publicationDatePattern: {
      pattern: '#esquerda_8_12_1 > article > small',
      isProp: false
    }
  }
};

export default source;
