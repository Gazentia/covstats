export default {
  setActiveCountry(context, payload) {
    const isExist = context.rootState["covid-statistics"].statistics.findIndex(
      (x) => {
        return x.country.indexOf(payload.data) === 0;
      }
    );
    if (isExist >= 0) {
      context.commit("setCountryActive", {
        data: payload.data,
      });
    } else {
      context.dispatch(
        "errors/setError",
        {
          errorTitle: "Warning",
          errorMessage: "Not found the " + payload.data + "'s data. ",
        },
        {
          root: true,
        }
      );
    }
  },
};
