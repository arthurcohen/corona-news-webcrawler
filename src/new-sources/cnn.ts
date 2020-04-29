// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'CNN',
  sitemapUrl: 'https://edition.cnn.com/sitemaps/cnn/news.xml',
  language: 'en-us',
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
      pattern: 'body > div.pg-special-article.pg-wrapper > article > div > div.pg-special-article__wrapper > div.pg-special-article__body > p.update-time',
      isProp: true
    }
  }
};

export default source;
