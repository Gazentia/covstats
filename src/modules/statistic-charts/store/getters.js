import {
  isExistCountry,
  setTheme,
  calculateRatio,
} from "@/modules/statistic-charts/helper";
import { pascalize } from "@/common/helpers";

export default {
  getChartDataMix(state, getters, rootState, rootGetters) {
    const chartData = {
      labels: [],
      datasets: [],
    };
    const dateFilter = rootGetters["calendars/getPeriodData"];
    const countryActive = rootState["covid-statistics"].statistics.find((x) => {
      return isExistCountry(x, rootGetters["selects/getCountryActive"]);
    });
    if (countryActive) {
      for (const typeCase in countryActive.timeline) {
        const covidStatics = {
          label: pascalize(typeCase),
          data: [],
          theme: setTheme(typeCase),
        };
        for (const dateData in countryActive.timeline[typeCase]) {
          const timelineDate = new Date(dateData);
          if (
            timelineDate >= dateFilter.start &&
            timelineDate <= dateFilter.end
          ) {
            if (chartData.labels.indexOf(dateData) < 0) {
              chartData.labels.push(dateData);
            }
            covidStatics.data.push(countryActive.timeline[typeCase][dateData]);
          }
        }
        chartData.datasets.push(covidStatics);
      }
    }
    return chartData;
  },
  getChartDataDoughnut(state, getters, rootState, rootGetters) {
    const chartData = {
      deaths: {
        labels: [],
        datasets: [],
      },
      recovered: {
        labels: [],
        datasets: [],
      },
    };
    const countryActive = rootState["covid-statistics"].statistics.find((x) => {
      return isExistCountry(x, rootGetters["selects/getCountryActive"]);
    });
    if (countryActive) {
      for (const typeCase in chartData) {
        if (typeCase !== "cases") {
          const mainRatio = calculateRatio(
            countryActive[typeCase],
            countryActive["cases"]
          );
          const secondRatio = parseFloat(
            parseFloat(100 - mainRatio).toFixed(2)
          );
          const covidStatics = {
            type: "doughnut",
            data: [mainRatio, secondRatio],
            theme: [setTheme(typeCase), "base"],
            hoverOffset: 4,
          };
          chartData[typeCase].labels.push(
            pascalize(typeCase) + " (" + mainRatio + "%)",
            "Cases (" + secondRatio + "%)"
          );
          chartData[typeCase].datasets.push(covidStatics);
        }
      }
    }
    return chartData;
  },
  getDataGeoMap(state, getters, rootState) {
    const datas = {
      datasets: {
        theme: {
          cases: "decrease",
          deaths: "default",
          recovered: "increase",
        },
        countries: [],
      },
    };
    rootState["covid-statistics"].statistics.forEach((country /* , index */) => {
      datas.datasets.countries.push({
        name: country.country,
        data: {
          cases: country.cases,
          deaths: country.deaths,
          recovered: country.recovered,
        },
      });
    });
    return datas;
  },
};
