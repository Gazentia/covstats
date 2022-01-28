export default {
  setPeriodData(context, payload) {
    context.commit("setPeriodData", {
      data: payload,
    });
    context
      .dispatch(
        "statistic-charts/updateTimeline",
        {
          countries: [],
          period: {
            start: context.state.periodData.start,
            end: context.state.periodData.end,
          },
        },
        {
          root: true,
        }
      )
      .then(() => {});
  },
  toggleCalendar(context) {
    context.commit("setCalendarStatus");
  },
};
