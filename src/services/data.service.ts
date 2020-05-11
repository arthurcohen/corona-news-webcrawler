// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';
const fileName = './the-good-news.csv';
const allNews = getNews();

function getNews(): News[] {
  try {
    const stringFile = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    return JSON.parse(stringFile);
  } catch (err) {
    return [];
  }
}

function saveNews(news: News) {
  const obj = allNews.find(c => c.title === news.title);

  if (!obj) {
    obj.read = true;
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
