import statisticChartsMutations from "@/modules/statistic-charts/store/mutations";
import statisticChartsActions from "@/modules/statistic-charts/store/actions";
import statisticChartChartsGetters from "@/modules/statistic-charts/store/getters";

export default {
  namespaced: true,
  state() {
    return {
      countryActive: null,
    };
  },
  mutations: statisticChartsMutations,
  actions: statisticChartsActions,
  getters: statisticChartChartsGetters,
};
