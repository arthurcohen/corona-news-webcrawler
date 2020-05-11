// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parse/lib/sync';

const fileName = './files/the-good-news.csv';
const allNews = getNews();

function getNews(): News[] {
  try {
    const stringFile = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
    const records = csv(stringFile, {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  } catch (err) {
    return [];
  }
}

function saveNews(news: News) {
  let objIndex = -1;
  const obj = allNews.find((c, index) => {
    const isEuqal = c.title === news.title;
    if (isEuqal) {
      objIndex = index;
    }
    return isEuqal;
  });

  if (obj) {
    allNews[objIndex].read = true;
  } else {
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
  saveFile
};
