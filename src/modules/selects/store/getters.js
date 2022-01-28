export default {
  getCountryActive(state) {
    if (typeof state.countryActive !== "string") {
      return null;
    }
    return state.countryActive;
  },
};
