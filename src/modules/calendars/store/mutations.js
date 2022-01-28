export default {
  setPeriodData(state, payload) {
    state.periodData.start = payload.data.start;
    state.periodData.end = payload.data.end;
  },
  setCalendarStatus(state) {
    state.calendarStatus = !state.calendarStatus;
  },
};
