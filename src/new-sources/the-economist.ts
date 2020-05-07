// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import sitemapUtils from '../utils/sitemapUtils';
import dateParser from '../utils/dateParser';

const today = dateParser.getTodayDate();
const [, month, year] = today.split('/');
const quarter = `Q${getQuarterOfTheYear(month)}`;

function getQuarterOfTheYear(month:string) : Number {
  const quarterLength = 3;
  return Math.ceil(parseInt(month) / quarterLength);
}

const source: Source = {
  sourceName: 'The Economist',
  sitemapUrl: `https://www.economist.com/sitemap-${year}-${quarter}.xml`,
  language: 'en-us',
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
