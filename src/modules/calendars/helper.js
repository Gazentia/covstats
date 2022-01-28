export function fillZero(number) {
  number = String(number);
  return number >= 0 && number <= 9 ? "0" + number : number;
}

export function setDateFormat(dateValue) {
  const day = fillZero(dateValue.getDate());
  const month = fillZero(dateValue.getMonth() + 1);
  const years = dateValue.getFullYear();
  return years + " . " + month + " . " + day;
}
