import coronaStatisticMutations from "@/modules/covid-statistics/store/mutations";
import coronaStatisticActions from "@/modules/covid-statistics/store/actions";
import coronaStatisticGetters from "@/modules/covid-statistics/store/getters";

export default {
  namespaced: true,
  state() {
    return {
      statistics: [],
    };
  },
  mutations: coronaStatisticMutations,
  actions: coronaStatisticActions,
  getters: coronaStatisticGetters,
};
