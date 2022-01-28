export default {
  setStatistic(state, payload) {
    state.statistics = payload.data;
  },
  setTimeline(state, payload) {
    const updatedTimeline = state.statistics.map((countryData) => {
      const timelineData = payload.data.find((timeline) => {
        return timeline.country.toString() === countryData.country.toString();
      });
      if (timelineData) {
        return {
          ...countryData,
          timeline: timelineData.timeline,
        };
      }
      return {
        ...countryData,
      };
    });
    state.statistics = updatedTimeline;
  },
};
