const numeral = require("numeral");
export function ShortFinancialFormat(value) {
  if (value === 0) {
    return value;
  }
  return numeral(value).format("0.0 a");
}
export function numberFormat(value) {
  if (value === 0) {
    return value;
  }
  return numeral(value).format("0,0");
}

export function pascalize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toUpperCase() : word.toLowerCase();
  });
}

export function isImage(value) {
  return /^(http)?s?:?(\/\/[^""]*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(value);
}

export function addDays(dateData, days) {
  const result = dateData.setDate(dateData.getDate() + days);
  return new Date(result);
}
export function minusDays(dateData, days) {
  let result = dateData.setDate(dateData.getDate() - days);
  result = new Date(result);
  return result;
}

export function getDiffDays(dateStart, dateEnd) {
  const diffTime = Math.abs(dateEnd - dateStart);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function newDateFomat(dateValue) {
  return new Date(
    dateValue.getFullYear() +
      "/" +
      (dateValue.getMonth() + 1) +
      "/" +
      dateValue.getDate()
  );
}

export function normalizeValue(columnValue) {
  let dataResult =
    columnValue.value || columnValue.value === 0
      ? columnValue.value
      : columnValue;
  if (typeof dataResult !== "number") {
    dataResult = dataResult.toUpperCase();
  }
  return dataResult;
}
