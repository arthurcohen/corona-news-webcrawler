// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';

const source: Source = {
  sourceName: 'CNN Brasil',
  sitemapUrl: 'https://www.cnnbrasil.com.br/sitemap-news.xml',
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
      pattern: '#__next > div.jsx-1583902798.main-layout > div > div:nth-child(5) > div.col-sm-7 > div > div > div.jsx-3805853902.authors-date > span.jsx-3805853902',
      isProp: true
    }
  }
};

export default source;
