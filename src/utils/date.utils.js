export const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const NTH = function (d) {
  if (3 < d && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function getDates(startDate, stopDate) {
  let dateArray = new Array();
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export function formatDate(d, m, y) {
  let day = d.length == 1 ? '0' + d : d;
  let month = MONTH[m];
  let year = y;
  return day + '-' + month + '-' + year;
}

export function currentDate() {
  return formatDate(new Date().getDate(), new Date().getMonth(), new Date().getFullYear());
}
