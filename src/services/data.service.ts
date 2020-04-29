// eslint-disable-next-line no-unused-vars
import News from '../interfaces/news';
import { Parser } from 'json2csv';
import * as fs from 'fs';

const allNews = [];

function saveNews(news: News) {
  allNews.push(news);
  const newCSV = convertNewsToCsv(allNews);
  exportNewsToCsv(newCSV);
}

function convertNewsToCsv(allNews: News[]): string {
  const parser = new Parser();
  return parser.parse(allNews);
}

function exportNewsToCsv(csv: string, path = './files'): string {
  const fileName = `${path}/the-good-news.csv`;
  try {
    fs.mkdirSync(path);
  } catch {
    // dir already exists
  }
  fs.writeFileSync(fileName, csv, 'utf8');

  return fileName;
}

export default {
  saveNews,
  exportNewsToCsv,
  convertNewsToCsv
};
