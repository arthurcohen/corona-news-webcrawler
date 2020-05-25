import newsService from '../src/services/news.service';
// eslint-disable-next-line no-unused-vars
import News from '../src/interfaces/news';
import * as fs from 'fs';
import DirUtils from '../src/utils/DirUtils';
import dataService from '../src/services/data.service';

const siteMapStub =
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        <url>
            <loc>https://oglobo.globo.com/cultura/maria-flor-sobre-ataques-virtuais-nao-vou-me-calar-24356723</loc>
        </url>
    </urlset>`;

const titleStub = 'Title stub';
const imageUrlStub = 'http://sourcestub.com/imageStub';
const url = 'https://g1.globo.com/sp/sorocaba-jundiai/noticia/2020/04/29/medico-que-contraiu-covid-19-e-surpreendido-com-festa-apos-cura-papai-voce-venceu.ghtml';
const publishedDateStub = '0001-01-01T00:00:00';
const htmlStub =
  `<html>
    <head>
        <meta property="og:title" content="${titleStub}">
        <meta property="og:image" content="${imageUrlStub}">
    </head>
    <body>${publishedDateStub}</body>
</html>`;

const sourceStub =
{
  sourceName: 'SourceStub',
  sitemapUrl: 'http://sourcestub.com/sitemap',
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
      pattern: 'body',
      isProp: false
    }
  }
};

const newsStub: News[] = [
  {
    title: titleStub,
    imageUrl: imageUrlStub,
    pubDate: '01/01/0001',
    sourceName: 'sourceName',
    url: url,
    rank: 10,
    read: false
  }
];

const testFilesPath = './testFiles';

describe('given an existent sitemap', () => {
  test('should get a news list from sitemap', async () => {
    const newsUrls = await newsService.getNewsUrlFromSitemap(siteMapStub);
    expect(newsUrls).toHaveLength(1);
  });

  test('should get info from html news content', () => {
    const news = newsService.buildNews(htmlStub, sourceStub, url);
    const expectedNews = newsStub[0];

    expect(news.title).toBe(expectedNews.title);
    expect(news.imageUrl).toBe(imageUrlStub);
    expect(news.pubDate).toBe(expectedNews.pubDate);
    expect(news.sourceName).toBe(sourceStub.sourceName);
  });

  test('should write file from sources', () => {
    dataService.configuraDataService('pt-br');
    const csvStub = dataService.convertNewsToCsv(newsStub);
    const path = `${dataService.exportNewsToCsv(csvStub, testFilesPath)}`;

    const data = fs.readFileSync(path);
    expect(data.toString()).toBe(csvStub);
  });

  afterAll(() => {
    DirUtils.deleteFolderRecursive(testFilesPath);
  });
});
