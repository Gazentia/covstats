<template>
  <div class="home__map">
    <statistic-geo-chart />
  </div>
  <main-panels />
</template>

<script>
import StatisticGeoChart from "@/modules/statistic-charts/components/StatisticGeoChart.vue";
import MainPanels from "@/modules/panels/components/MainPanels.vue";

export default {
  name: "Home",
  components: {
    StatisticGeoChart,
    MainPanels,
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__map {
    position: relative;
    margin-bottom: 24px;
  }
}
</style>
