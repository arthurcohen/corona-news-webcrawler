// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
const date = new Date();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = date.getDate();

const source: Source = {
  sourceName: 'Veja Rio',
  sitemapUrl: `https://vejario.abril.com.br/sitemap.xml?yyyy=2020&mm=${month}&dd=${day}`,
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
      pattern: 'meta[property="bt:pubDate"]',
      isProp: true
    }
  }
};

export default source;
