<template>
  <base-chart-doughnut
    v-bind:chartData="getChartDataDoughnut.deaths"
  ></base-chart-doughnut>
  <base-chart-doughnut
    v-bind:chartData="getChartDataDoughnut.recovered"
  ></base-chart-doughnut>
</template>
<script>
import BaseChartDoughnut from "@/common/components/charts/BaseChartDoughnut.vue";
import { mapGetters } from "vuex";

export default {
  name: "StatisticDoughnutCharts",
  components: {
    BaseChartDoughnut,
  },
  computed: {
    ...mapGetters("statistic-charts", ["getChartDataDoughnut"]),
  },
};
</script>
<style lang="scss" scoped></style>
