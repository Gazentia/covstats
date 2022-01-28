export function isExistCountry(country, countryActive) {
  return (
    country.country.toUpperCase().indexOf(countryActive.toUpperCase()) === 0
  );
}

export function setTheme(type) {
  let resultTheme = "default";
  type = type.toLowerCase();
  switch (type) {
    case "cases":
      resultTheme = "decrease";
      break;
    case "deaths":
      resultTheme = "default";
      break;
    case "recovered":
      resultTheme = "increase";
      break;
    default:
      resultTheme = "default";
  }
  return resultTheme;
}

export function calculateRatio(to, from) {
  return parseFloat(parseFloat((to * 100) / from).toFixed(2));
}
