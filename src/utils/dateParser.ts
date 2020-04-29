
function getDateFromURL(url): string {
  var matches = url.match(/(\d{4})\/(\d{2})\/(\d{2})/);

  if (!matches || matches.length <= 1) return '';

  var day = matches[3];
  var month = matches[2];
  var year = matches[1];

  return day + '/' + month + '/' + year;
}

function getDateFromString(date): string {
  const matches = date.split('-');

  if (!matches || matches.length <= 1) return '';

  var day = matches[2].slice(0, 2);
  var month = matches[1];
  var year = matches[0];

  return day + '/' + month + '/' + year;
}

function getTodayDate() {
  var d = new Date();
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
}

export default {
  getTodayDate,
  getDateFromString,
  getDateFromURL
};
