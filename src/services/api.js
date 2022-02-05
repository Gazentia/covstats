class BaseApiService {
  baseUrl = process.env.VUE_APP_BASE_URL;
  mainResource;
  subResource = "";

  constructor(mainResource) {
    if (!mainResource) {
      throw new Error("Resource is not provided.");
    }
    this.mainResource = mainResource;
  }

  getUrl(queryParams = "") {
    queryParams = queryParams ? "?" + queryParams : "";
    return (
      this.baseUrl +
      "/" +
      this.mainResource +
      "/" +
      (this.subResource || "") +
      queryParams
    );
  }

  setSubResource(value) {
    this.subResource = value;
  }

  setMainResource(value) {
    this.mainResource = value;
  }

  handlerErrors(err) {
    return {
      isSuccess: false,
      value: err.message,
    };
  }
}

class ReadOnlyApiService extends BaseApiService {
  constructor(resource) {
    super(resource);
  }

  async fetch(queryParams, config = {}) {
    try {
      const response = await fetch(this.getUrl(queryParams), config);
      if (!response.ok) {
        throw new Error(
          "Can't fetch data from server. status: " + response.status
        );
      }
      const resJSON = await response.json();
      return {
        isSuccess: true,
        value: resJSON,
      };
    } catch (err) {
      return this.handlerErrors(err);
    }
  }

  async fetchs(fetchLists) {
    return Promise.all(fetchLists)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return this.handlerErrors(err);
      });
  }
}

class CovidApiService extends ReadOnlyApiService {
  constructor() {
    super("countries");
  }
  async fetchCovidData(countries = []) {
    countries = countries.join();
    if (countries === "all") {
      this.setMainResource("all");
      this.setSubResource(null);
    } else {
      this.setMainResource("countries");
      this.setSubResource(countries);
    }
    return await this.fetch("", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchCovidTimeLines(countries = [], period = 7) {
    countries = countries.join();
    this.setMainResource("historical");
    this.setSubResource(countries);
    return await this.fetch("lastdays=" + period, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchData(dayPeriod) {
    return await this.fetchs([
      this.fetchCovidData(),
      this.fetchCovidTimeLines([], dayPeriod),
      this.fetchCovidData(["all"]),
      this.fetchCovidTimeLines(["all"], dayPeriod),
    ]);
  }
  async updateTimeline(countries = [], dayPeriod) {
    return await this.fetchs([
      this.fetchCovidTimeLines(countries, dayPeriod),
      this.fetchCovidTimeLines(["all"], dayPeriod),
    ]);
  }
}

export const $api = {
  covids: new CovidApiService(),
};
