import { numberFormat } from "@/common/helpers";

function isExistCountry(country, countryActive) {
  return (
    country.country.toUpperCase().indexOf(countryActive.toUpperCase()) === 0
  );
}

export default {
  getStatisticData(state) {
    return state.statistics;
  },
  getSelectionCountry(state) {
    return state.statistics.map((country) => {
      return country.country;
    });
  },
  getCountryActiveStatistic(state, getters, rootState, rootGetters) {
    const countryActive = state.statistics.find((x) => {
      return isExistCountry(x, rootGetters["selects/getCountryActive"]);
    });
    const result = {
      cases: 0,
      todayCases: 0,
      todayRecovered: 0,
      recovered: 0,
      deaths: 0,
      todayDeaths: 0,
      population: 0,
    };
    if (countryActive) {
      result.cases = numberFormat(countryActive.cases);
      result.todayCases = numberFormat(countryActive.todayCases);
      result.todayRecovered = numberFormat(countryActive.todayRecovered);
      result.recovered = numberFormat(countryActive.recovered);
      result.todayDeaths = numberFormat(countryActive.todayDeaths);
      result.deaths = numberFormat(countryActive.deaths);
      result.population = numberFormat(countryActive.population);
    }
    return result;
  },
};
