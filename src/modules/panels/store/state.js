import panelMutations from "@/modules/panels/store/mutations";
import panelActions from "@/modules/panels/store/actions";
import panelGetters from "@/modules/panels/store/getters";
export default {
  namespaced: true,
  state() {
    return {
      infoPanelStatus: false,
    };
  },
  mutations: panelMutations,
  actions: panelActions,
  getters: panelGetters,
};
