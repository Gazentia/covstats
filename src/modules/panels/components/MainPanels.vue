<template>
  <div
    class="main__panel-toggle"
    v-bind:class="{ open: getInfoPanelStatus }"
    type="button"
    v-on:click="toggleInfoPanelStatus"
  >
    <svg
      class="main__panel-toggle--icon"
      stroke-width="8"
      stroke-dashoffset="0"
      stroke-dasharray="0"
      stroke-linecap="round"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <line x1="20" y1="20" x2="80" y2="20" />
      <line x1="50" y1="35" x2="50" y2="85" />
      <polyline fill="none" points="30,50 50,35 70,50" />
    </svg>
  </div>

  <div
    class="main__panel-wrapper-float"
    v-bind:class="{ open: getInfoPanelStatus }"
  >
    <div class="main__panel-wrapper">
      <div class="main__panel-wrapper-row">
        <div class="main__panel main__panel--fix-width">
          <base-widget
            v-bind:widgetData="{
              title: 'Static Cumulative',
              subtitle: getCountryActive,
            }"
          >
            <template v-slot:body>
              <statistic-mix-charts />
            </template>
          </base-widget>
        </div>
        <div class="main__panel main__panel--fix-width">
          <base-widget
            v-bind:widgetData="{
              title: 'Daily Data',
              subtitle: getCountryActive,
            }"
            v-bind:body-inline="true"
          >
            <template v-slot:body>
              <statistic-doughnut-charts />
            </template>
            <template v-slot:list>
              <div class="widget__list">
                <div class="widget__info">
                  <span class="widget__info-title">Cases</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.cases
                  }}</span>
                </div>
                <div class="widget__info">
                  <span class="widget__info-title">Today Cases</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.todayCases
                  }}</span>
                </div>
                <div class="widget__info">
                  <span class="widget__info-title">Recovered</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.recovered
                  }}</span>
                </div>
                <div class="widget__info">
                  <span class="widget__info-title">Today Recovered</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.todayRecovered
                  }}</span>
                </div>
                <div class="widget__info">
                  <span class="widget__info-title">Deaths</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.deaths
                  }}</span>
                </div>
                <div class="widget__info">
                  <span class="widget__info-title">Today Deaths</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.todayDeaths
                  }}</span>
                </div>
                <div class="widget__info">
                  <span class="widget__info-title">Population</span>
                  <span class="widget__info-content">{{
                    getCountryActiveStatistic.population
                  }}</span>
                </div>
              </div>
            </template>
          </base-widget>
        </div>
      </div>
      <div class="main__panel">
        <statistic-table />
      </div>
    </div>
  </div>
</template>
<script>
import BaseWidget from "@/common/components/widgets/BaseWidget.vue";
import StatisticTable from "@/modules/statistic-tables/components/StatisticTable.vue";
import StatisticMixCharts from "@/modules/statistic-charts/components/StatisticMixCharts.vue";
import StatisticDoughnutCharts from "@/modules/statistic-charts/components/StatisticDoughnutCharts.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainPanels",
  components: {
    BaseWidget,
    StatisticMixCharts,
    StatisticDoughnutCharts,
    StatisticTable,
  },
  computed: {
    ...mapGetters("panels", ["getInfoPanelStatus"]),
    ...mapGetters("covid-statistics", ["getCountryActiveStatistic"]),
    ...mapGetters("selects", ["getCountryActive"]),
  },
  methods: {
    ...mapActions("panels", ["toggleInfoPanelStatus"]),
  },
};
</script>
<style lang="scss" scoped>
.main {
  &__map {
    position: relative;
    margin-bottom: 24px;
  }
  &__panel {
    margin-right: 48px;
    &--fix-width {
      max-width: 40%;
      @include breakpoint-down("lg") {
        max-width: 50%;
      }
      @include breakpoint-down("md") {
        max-width: 100%;
      }
    }
    @include breakpoint-down("md") {
      margin-right: 0;
      margin-bottom: 24px;
    }
    &:last-of-type,
    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }
    &-toggle {
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: scale(1) translateX(-50%);
      transform-origin: 5%;
      border-radius: 50%;
      box-shadow: 0 0 2px 0 $grey;
      background-color: $richBlack;
      z-index: 2;
      border-radius: 50%;
      padding: 8px 10px;
      transition: all 250ms ease-in-out;
      cursor: pointer;
      @include breakpoint-down("md") {
        padding: 6px 8px;
        bottom: 10px;
      }
      &--icon {
        fill: $white;
        stroke: $white;
        width: 25px;
        transition: transform 250ms ease-in-out;
        @include breakpoint-down("md") {
          width: 20px;
        }
      }
      &.open {
        .main__panel-toggle--icon {
          transform: rotate(180deg);
        }
      }
      &:hover {
        box-shadow: 0 0 4px 0 $grey;
        transform: scale(1.1) translateX(-50%);
        .main__panel-toggle--icon {
          fill: $white;
          stroke: $white;
        }
      }
    }
    &-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 48px;
      height: 100%;
      overflow-y: auto;
      @include breakpoint-down("md") {
        padding-left: 24px;
        padding-right: 24px;
      }
      @include breakpoint-down("sm") {
        padding-left: 12px;
        padding-right: 12px;
      }
      &-row {
        flex-direction: row;
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 48px;
        & > * {
          flex: 1 1 100%;
        }
        @include breakpoint-down("md") {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      &-float {
        margin-top: $headerHeight;
        position: fixed;
        background-color: rgba($white, 0.5);
        z-index: 1;
        top: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        transition: all 250ms ease-in-out;
        &.open {
          top: 0;
          .main__panel-toggle {
            bottom: 15px;
            .main__panel-toggle--icon {
              transform: rotate(360deg);
            }
          }
        }
      }
    }
    @include breakpoint-down("md") {
      width: 100%;
    }
    &--left {
      margin-left: 24px;
      @include breakpoint-down("md") {
        margin-left: 0;
      }
    }
    &--right {
      margin-right: 24px;
      @include breakpoint-down("md") {
        margin-right: 0;
      }
    }
  }
}
</style>