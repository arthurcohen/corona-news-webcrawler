import * as cheerio from "cheerio";
import * as xmlParser from "xml2js";
import { Parser } from "json2csv";
import * as fs from "fs";
// eslint-disable-next-line no-unused-vars
import News from "../interfaces/news";
// eslint-disable-next-line no-unused-vars
import { Source, Pattern } from "../interfaces/source";

async function getNewsUrlFromSitemap(sitemap: string): Promise<string[]> {
  const parsedSitemap = await xmlParser.parseStringPromise(sitemap);
  return parsedSitemap.urlset.url.map((r) => r.loc[0]);
}

function getNewsFromHtml(html: string, source: Source, url: string): News {
  const $ = cheerio.load(html);

  const title = getProperty($, source.profile.titlePattern).trim();
  const imageUrl = getProperty($, source.profile.imagePattern).trim();

  const date = getDateFromURL(url);
  const pubDate = !date
    ? getDateFromString(
        getProperty($, source.profile.publicationDatePattern).trim()
      )
    : date;

  const news: News = {
    title,
    url: url,
    imageUrl,
    pubDate,
    sourceName: source.sourceName.trim(),
  };

  return news;
}

function getDateFromURL(url): string {
  var matches = url.match(/(\d{4})\/(\d{2})\/(\d{2})/);

  if (!matches) return "";

  var day = matches[3];
  var month = matches[2];
  var year = matches[1];

  return day + "/" + month + "/" + year;
}

function getDateFromString(date): string {
  const matches = date.split("-");

  if (matches.length <= 1) return "";

  var day = matches[2].slice(0, 2);
  var month = matches[1];
  var year = matches[0];

  return day + "/" + month + "/" + year;
}

function getProperty($: CheerioStatic, pattern: Pattern): string {
  let property: string;

  if (pattern.isProp) {
    property = $(pattern.pattern).prop("content");
  } else {
    property = $(pattern.pattern).text();
  }

  return property || "";
}

function convertNewsToCsv(allNews: News[]): string {
  const parser = new Parser();
  return parser.parse(allNews);
}

function exportNewsToCsv(csv: string, path = "./files"): string {
  const fileName = `${path}/the-good-news.csv`;
  try {
    fs.mkdirSync(path);
  } catch {
    // dir already exists
  }
  fs.writeFileSync(fileName, csv, "utf8");
  return fileName;
}

export default {
  getNewsUrlFromSitemap,
  getNewsFromHtml,
  exportNewsToCsv,
  convertNewsToCsv,
};
