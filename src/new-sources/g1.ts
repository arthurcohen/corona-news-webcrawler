// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
  sourceName: 'G1',
  sitemapUrl: 'http://pox.globo.com/sitemap/g1/2020/04/07_1.xml',
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
      pattern: 'b ody > div.glb-grid > main > div.content__signa-share > div.content__signature > div > div > p.content-publication-data__updated > time',
      isProp: false
    }
  }
};

export default source;
