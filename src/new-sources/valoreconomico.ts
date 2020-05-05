// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [day, month, year] = today.split('/');

const source: Source = {
  sourceName: 'Valor Econômico',
  sitemapUrl: `https://pox.globo.com/sitemap/valor/${year}/${month}/${day}_1.xml`,
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
      pattern: 'body > div.glb-grid > main > div.content__signa-share > div.content__signature > div.content-publication-data > div.content-publication-data__text > p.content-publication-data__updated > time',
      isProp: false
    }
  }
};

export default source;
