// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parse/lib/sync';
import { LocalStorage } from 'node-localstorage';
import dateParser from '../utils/dateParser';

let fileName = '';
let allNews = [];
const localStorage = new LocalStorage('./scratch');

function configuraDataService(language:string) {
  fileName = './files/the-good-news-' + language + '.csv';

  if (dateParser.getTodayDate() !== localStorage.getItem('lastDayRun')) {
    localStorage.setItem('lastDayRun', dateParser.getTodayDate());
  } else {
    allNews = getNews();
  }
}

function getNews(): News[] {
  try {
    const stringFile = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
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

function saveNews(news: News) {
  const obj = allNews.find((c) => c.title === news.title);

  if (!obj) {
    allNews.push(news);
  }
}

function saveFile() {
  const newCSV = convertNewsToCsv(allNews);
  exportNewsToCsv(newCSV);
}

function convertNewsToCsv(allNews: News[]): string {
  const parser = new Parser();
  return parser.parse(allNews);
}

function exportNewsToCsv(csv: string): string {
  try {
    fs.mkdirSync('./files');
  } catch {
    // dir already exists
  }
  fs.writeFileSync(fileName, csv, 'utf8');

  return fileName;
}

export default {
  saveNews,
  exportNewsToCsv,
  convertNewsToCsv,
  saveFile,
  configuraDataService
};
