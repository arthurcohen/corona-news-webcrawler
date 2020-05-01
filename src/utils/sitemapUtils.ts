import dateParser from './dateParser';

function getPubDate(url:any) : string {
  const newsPropNames = ['news', 'n'];
  let pubDate;
  for (let i = 0; i < newsPropNames.length; i++) {
    const newsProp = `${newsPropNames[i]}:news`;
    const pubDateProp = `${newsPropNames[i]}:publication_date`;
    const urlNewsProp = url && url[newsProp] && url[newsProp][0];
    pubDate = urlNewsProp && urlNewsProp[pubDateProp] && urlNewsProp[pubDateProp][0];
    if (pubDate) {
      i = newsPropNames.length;
    }
  }
  return pubDate;
}

function getUrlDate(url:any) : string {
  let urlDateStr = getPubDate(url);
  if (!urlDateStr) {
    urlDateStr = url && url.lastmod[0];
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
