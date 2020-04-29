// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'Correio Braziliense',
  sitemapUrl: 'https://www.correiobraziliense.com.br/noticia_127983242361_outros_ultimas-noticias_sitemap.xml',
  language: 'pt-br',
  date: '',
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
