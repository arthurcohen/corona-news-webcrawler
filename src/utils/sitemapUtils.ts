import dateParser from './dateParser';

function getUrlDate(url:any) : string {
  const urlNewsProp = url && url['news:news'] && url['news:news'][0];
  let urlDateStr = urlNewsProp && urlNewsProp['news:publication_date'] &&
    urlNewsProp['news:publication_date'][0];

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
