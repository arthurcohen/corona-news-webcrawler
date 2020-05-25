// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parse/lib/sync';
import { LocalStorage } from 'node-localstorage';
import dateParser from '../utils/dateParser';

let fileName = '';
const dirName = './files';
let filePath = '';
let allNews = [];
const localStorage = new LocalStorage('./scratch');

function configuraDataService(language:string) {
  fileName = 'the-good-news-' + language + '.csv';
  filePath = `${dirName}/${fileName}`;
  if (dateParser.getTodayDate() !== localStorage.getItem('lastDayRun')) {
    localStorage.setItem('lastDayRun', dateParser.getTodayDate());
    allNews = [];
  } else {
    allNews = getNews();
  }
}

function getNews(): News[] {
  try {
    const stringFile = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    const records = csv(stringFile, {
      columns: true,
      skip_empty_lines: true
    });
    records.forEach(element => {
      element.read = true;
    });

    return records;
  } catch (err) {
    return [];
  }
}

function filterNews(urls:string[]) {
  return urls.filter(url => !allNews.some(news => news.url === url));
}

function saveNews(news: News) {
  const obj = allNews.find((c) => c.title === news.title);

  if (!obj) {
    allNews.push(news);
  }
}

function saveFile() {
  if (allNews.length > 0) {
    const newCSV = convertNewsToCsv(allNews);
    exportNewsToCsv(newCSV);
  }
}

function convertNewsToCsv(allNews: News[]): string {
  const parser = new Parser();
  return parser.parse(allNews);
}

function exportNewsToCsv(csv: string, filePath?: string): string {
  const dir = filePath || dirName;
  const fullPath = `${dir}/${fileName}`;
  try {
    fs.mkdirSync(dir);
  } catch {
    // dir already exists
  }
  fs.writeFileSync(fullPath, csv, 'utf8');

  return fullPath;
}

export default {
  saveNews,
  exportNewsToCsv,
  convertNewsToCsv,
  saveFile,
  configuraDataService,
  filterNews
};
