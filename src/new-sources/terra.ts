// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';

const source: Source = {
  sourceName: 'Terra',
  sitemapUrl: 'https://www.terra.com.br/sitemap/page/1/20e07ef2795b2310VgnVCM3000009af154d0RCRD.xml?is_news=true',
  date: dateParser.getTodayDate(),
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
      pattern: 'meta[name="publishdate"]',
      isProp: true
    }
  }
};

export default source;
