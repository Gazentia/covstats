import { setDateFormat } from "@/modules/calendars/helper";
export default {
  getPeriodData(state) {
    const updatedPeriod = {
      ...state.periodData,
      startInput: setDateFormat(state.periodData.start),
      endInput: setDateFormat(state.periodData.end),
    };
    return updatedPeriod;
  },
  getCalendarStatus(state) {
    return state.calendarStatus;
  },
};
