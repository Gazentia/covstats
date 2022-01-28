import errorMutations from "@/modules/errors/store/mutations";
import errorActions from "@/modules/errors/store/actions";
import errorGetters from "@/modules/errors/store/getters";

export default {
  namespaced: true,
  state() {
    return {
      errorTitle: null,
      errorMessage: null,
    };
  },
  mutations: errorMutations,
  actions: errorActions,
  getters: errorGetters,
};
