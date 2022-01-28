<template>
  <base-chart-map
    v-bind:chartData="getDataGeoMap"
    v-on:active-country="selectCountry"
    v-bind:countryActive="getCountryActive"
  ></base-chart-map>
</template>
<script>
import BaseChartMap from "@/common/components/charts/BaseChartMap.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "StatisticGeoChart",
  components: {
    BaseChartMap,
  },
  computed: {
    ...mapGetters("statistic-charts", ["getDataGeoMap"]),
    ...mapGetters("selects", ["getCountryActive"]),
  },
  methods: {
    ...mapActions("selects", ["setActiveCountry"]),
    ...mapActions("panels", ["toggleInfoPanelStatus"]),
    selectCountry(countryName) {
      this.setActiveCountry({
        data: countryName,
      });
      this.toggleInfoPanelStatus();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>