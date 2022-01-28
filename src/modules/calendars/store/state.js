import calendarMutations from "@/modules/calendars/store/mutations";
import calendarActions from "@/modules/calendars/store/actions";
import calendarGetters from "@/modules/calendars/store/getters";
import { minusDays, newDateFomat } from "@/common/helpers";
export default {
  namespaced: true,
  state() {
    return {
      calendarStatus: false,
      periodData: {
        start: minusDays(newDateFomat(new Date()), 7),
        end: minusDays(newDateFomat(new Date()), 1),
      },
    };
  },
  mutations: calendarMutations,
  actions: calendarActions,
  getters: calendarGetters,
};
