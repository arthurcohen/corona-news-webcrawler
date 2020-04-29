// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = date.getDate();

const source: Source = {
  sourceName: 'Valor Econômico',
  sitemapUrl: `https://pox.globo.com/sitemap/valor/2020/${month}/${day}_1.xml`,
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
      pattern: 'body > div.glb-grid > main > div.content__signa-share > div.content__signature > div.content-publication-data > div.content-publication-data__text > p.content-publication-data__updated > time',
      isProp: false
    }
  }
};

export default source;
