// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const source: Source = {
  sourceName: 'UOL',
  sitemapUrl: 'https://noticias.uol.com.br/sitemap/v2/today.xml',
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
      pattern: 'body > article > div:nth-child(2) > div > div.col-sm-24.col-md-16.col-lg-17.content-article > div > div.col-xs-8.col-sm-21.col-md-21 > div.image-content-pad > div.author',
      isProp: true
    }
  }
};

export default source;
