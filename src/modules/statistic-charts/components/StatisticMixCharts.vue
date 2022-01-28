<template>
  <base-chart-mix v-bind:chartData="getChartDataMix"></base-chart-mix>
</template>
<script>
import BaseChartMix from "@/common/components/charts/BaseChartMix.vue";
import { mapGetters } from "vuex";

export default {
  name: "StatisticMixCharts",
  components: {
    BaseChartMix,
  },
  computed: {
    ...mapGetters("statistic-charts", ["getChartDataMix"]),
  },
};
</script>
<style lang="scss" scoped></style>
