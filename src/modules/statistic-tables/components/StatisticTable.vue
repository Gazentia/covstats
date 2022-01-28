<template>
  <base-table
    v-bind:dataHeaders="getDataTable.dataHeaders"
    v-bind:dataTable="getDataTable.dataTable"
    v-on:table-changed="updateTable"
  ></base-table>
</template>
<script>
import BaseTable from "@/common/components/table/BaseTable.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StatisticTable",
  components: {
    BaseTable,
  },
  computed: {
    ...mapGetters("statistic-tables", ["getDataTable"]),
  },
  methods: {
    ...mapActions("statistic-tables", ["setFilterData"]),
    updateTable(dataUpdate) {
      this.setFilterData({
        data: dataUpdate,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>