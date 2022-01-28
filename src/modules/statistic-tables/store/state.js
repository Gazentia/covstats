import statisticTableMutations from "@/modules/statistic-tables/store/mutations";
import statisticTableActions from "@/modules/statistic-tables/store/actions";
import statisticTableGetters from "@/modules/statistic-tables/store/getters";

export default {
  namespaced: true,
  state() {
    return {
      filters: {
        search: "",
        sort: {
          type: "asc",
          columnIndex: 0,
        },
        pageSize: 5,
        currentPage: 1,
      },
    };
  },
  mutations: statisticTableMutations,
  actions: statisticTableActions,
  getters: statisticTableGetters,
};
