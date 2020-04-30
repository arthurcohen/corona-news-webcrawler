
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const today = dateParser.getTodayDate();

const source: Source = {
  sourceName: 'O Popular',
  sitemapUrl: 'https://www.opopular.com.br/news-sitemap.xml',
  language: 'pt-br',
  date: today,
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
      pattern: '',
      isProp: false
    }
  }
};

export default source;
