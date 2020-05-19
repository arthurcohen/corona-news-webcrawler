// https://www.thesun.co.uk/sitemap.xml?yyyy=2020&mm=05&dd=18

// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';
import dateParser from '../utils/dateParser';
import sitemapUtils from '../utils/sitemapUtils';

const today = dateParser.getTodayDate();
const [day, month, year] = today.split('/');

const source: Source = {
  sourceName: 'The Sun',
  sitemapUrl: `https://www.thesun.co.uk/sitemap.xml?yyyy=${year}&mm=${month}&dd=${day}`,
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
      pattern: 'meta[property="article:published_time"]',
      isProp: true
    }
  }
};

export default source;
