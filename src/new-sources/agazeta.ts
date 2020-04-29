import dateParser from '../utils/dateParser';
// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const today = dateParser.formatDate();
const [day, month, year] = today.split('/');

const source: Source = {
  sourceName: 'A Gazeta',
  sitemapUrl: `https://www.agazeta.com.br/${year}/${month}/${year}-${month}-${day}.xml`,
  language: 'pt-br',
  date: today,
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
