import { minusDays, getDiffDays } from "@/common/helpers";

const baseURL = "https://disease.sh/v3/covid-19/";
const WORLD_WIDE = "World Wide";

function promiseHandler(promiseTarget) {
  return promiseTarget()
    .then((res) => {
      if (!res.ok) {
        throw new Error("Can't fetch data from server. status: " + res.status);
      }
      return res.json();
    })
    .then((resJson) => {
      return {
        isSuccess: true,
        value: resJson,
      };
    })
    .catch((err) => {
      return {
        isSuccess: false,
        value: err.message,
      };
    });
}

function fetchCovidData(countries = [""]) {
  countries = countries.join();
  let path = "countries/";
  if (countries === "all") {
    path = countries;
  } else {
    path = path + countries;
  }
  return fetch(baseURL + path, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function fetchCovidTimeline(countries = [], period = 7) {
  countries = countries.join();
  period = period ? "?lastdays=" + period : "";
  let url = baseURL + "historical/" + countries + period;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchData(dayPeriod) {
  return Promise.all([
    promiseHandler(fetchCovidData),
    promiseHandler(fetchCovidTimeline.bind(null, [], dayPeriod)),
    promiseHandler(fetchCovidData.bind(null, ["all"])),
    promiseHandler(fetchCovidTimeline.bind(null, ["all"], dayPeriod)),
  ])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

async function fetchTimelineData(countries = [], dayPeriod) {
  return Promise.all([
    promiseHandler(fetchCovidTimeline.bind(null, countries, dayPeriod)),
    promiseHandler(fetchCovidTimeline.bind(null, ["all"], dayPeriod)),
  ])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

export default {
  async initData(context) {
    context.dispatch(
      "setLoadingStatus",
      {
        data: true,
      },
      {
        root: true,
      }
    );
    const dayPeriod = getDiffDays(
      context.rootGetters["calendars/getPeriodData"].start,
      minusDays(new Date(), 1)
    );
    let fetchedData = [];
    fetchedData = await fetchData(dayPeriod);
    if (fetchedData && fetchedData[0].isSuccess && fetchedData[1].isSuccess) {
      let covidData = fetchedData[0].value;
      const covidTimeline = fetchedData[1].value;
      const covidDataWorlWide = fetchedData[2].value;
      const covidTimelineWorldWide = fetchedData[3].value;
      covidDataWorlWide.country = WORLD_WIDE;
      covidDataWorlWide.timeline = covidTimelineWorldWide;
      covidDataWorlWide.countryInfo = {
        flag: "https://static.wikia.nocookie.net/oratia/images/6/63/Global_union_flag.png",
      };
      covidData.push(covidDataWorlWide);
      covidData.forEach((data) => {
        data.timeline = data.timeline || null;
        const timelineData = covidTimeline.find((timeline) => {
          return timeline.country.toString() === data.country.toString();
        });
        if (timelineData) {
          data.timeline = timelineData.timeline;
        }
      });
      context.commit("setStatistic", {
        data: covidData,
      });
      context.commit(
        "selects/setCountryActive",
        {
          data: WORLD_WIDE,
        },
        {
          root: true,
        }
      );
      context.dispatch(
        "setLoadingStatus",
        {
          data: false,
        },
        {
          root: true,
        }
      );
    } else {
      context.dispatch(
        "errors/setError",
        {
          errorTitle: "Error",
          errorMessage: "Failed to retrieve data. please try again later.",
        },
        {
          root: true,
        }
      );
    }
  },
  async updateTimeline(context, payload = { countries: [], period: null }) {
    payload.period = payload.period || {
      start: minusDays(new Date(), 7),
      end: minusDays(new Date(), 1),
    };
    let dayPeriod = 7;
    if (payload.period) {
      dayPeriod = getDiffDays(payload.period.start, minusDays(new Date(), 1));
      if (dayPeriod <= 1) {
        dayPeriod = 7;
      }
    }
    let fetchedData = await fetchTimelineData(payload.countries, dayPeriod);
    if (fetchedData[0].isSuccess && fetchedData[1].isSuccess) {
      fetchedData = [
        ...fetchedData[0].value,
        { country: WORLD_WIDE, timeline: { ...fetchedData[1].value } },
      ];
      context.commit("setTimeline", {
        data: fetchedData,
      });
    } else {
      context.dispatch(
        "errors/setError",
        {
          errorTitle: "Error",
          errorMessage: "Failed to update timeline. please try again later.",
        },
        {
          root: true,
        }
      );
    }
  },
};
