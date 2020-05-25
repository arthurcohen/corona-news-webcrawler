import dateParser from './dateParser';

function getPubDate(url:any) : string {
  const newsPropPrefixes = ['news', 'n'];

  for (const newsPropPrefix of newsPropPrefixes) {
    const newsProp = `${newsPropPrefix}:news`;
    const pubDateProp = `${newsPropPrefix}:publication_date`;
    const urlNewsProp = url && url[newsProp] && url[newsProp][0];
    const pubDate = urlNewsProp && urlNewsProp[pubDateProp] && urlNewsProp[pubDateProp][0];
    if (pubDate) {
      return pubDate;
    }
  }
}

function getUrlDate(url:any) : string {
  let urlDateStr = getPubDate(url);
  if (!urlDateStr) {
    urlDateStr = url && url.lastmod && url.lastmod[0];
  }
  return urlDateStr;
}

function getTodayUrls(urlset:any) : any[] {
  const today = dateParser.getTodayDate();

  return urlset.url.filter(url => {
    const urlDateStr = getUrlDate(url);

    if (!urlDateStr) {
      return true;
    }

    const urlDate = dateParser.getDateFromString(urlDateStr);
    return urlDate === today;
  });
};

export default {
  getTodayUrls
};
