import selectMutations from "@/modules/selects/store/mutations";
import selectActions from "@/modules/selects/store/actions";
import selectGetters from "@/modules/selects/store/getters";

export default {
  namespaced: true,
  state() {
    return {
      countryActive: null,
    };
  },
  mutations: selectMutations,
  actions: selectActions,
  getters: selectGetters,
};
