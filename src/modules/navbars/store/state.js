import navbarMutations from "@/modules/navbars/store/mutations";
import navbarActions from "@/modules/navbars/store/actions";
import navbarGetters from "@/modules/navbars/store/getters";

export default {
  namespaced: true,
  state() {
    return {
      navbarStatus: false,
    };
  },
  mutations: navbarMutations,
  actions: navbarActions,
  getters: navbarGetters,
};
