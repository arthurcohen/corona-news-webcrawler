// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');

const source: Source = {
  sourceName: 'Nexo',
  sitemapUrl: `https://www.nexojornal.com.br/sitemap-2020-${month}.xml`,
  language: 'pt-br',
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
      pattern: 'meta[name="articlePublishTime"]',
      isProp: true
    }
  }
};

export default source;
