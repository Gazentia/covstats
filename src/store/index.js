import { createStore } from "vuex";
import rootMutations from "@/store/mutations";
import rootActions from "@/store/actions";
import rootGetters from "@/store/getters";

import storePlugins from "@/plugins/storePlugins";
import coronaStatisticModule from "@/modules/covid-statistics/store/state";
import errorModule from "@/modules/errors/store/state";
import navbarModule from "@/modules/navbars/store/state";
import calendarModule from "@/modules/calendars/store/state";
import selectModule from "@/modules/selects/store/state";
import statisticTableModule from "@/modules/statistic-tables/store/state";
import statisticMixChartsModule from "@/modules/statistic-charts/store/state";
import panelsModule from "@/modules/panels/store/state";

const store = createStore({
  plugins: [storePlugins],
  modules: {
    "covid-statistics": coronaStatisticModule,
    errors: errorModule,
    navbar: navbarModule,
    calendars: calendarModule,
    selects: selectModule,
    panels: panelsModule,
    "statistic-tables": statisticTableModule,
    "statistic-charts": statisticMixChartsModule,
  },
  state() {
    return {
      loadingStatus: false,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
