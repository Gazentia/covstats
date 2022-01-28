<template>
  <BarChart
    ref="barChartRef"
    v-bind:chartData="chartUpdate"
    v-bind:options="chartOptions"
  />
  <div class="basemixchart" v-if="chartBtns && chartBtns.length">
    <ul class="basemixchart__items">
      <li
        v-for="chartBtn in chartBtns"
        class="basemixchart__item"
        v-bind:key="chartBtn.id"
      >
        <base-button
          v-bind:class="{ active: chartBtn.active }"
          btn-type="primary"
          type="button"
          v-on:click="switchChart(chartBtn.id)"
          >{{ chartBtn.label }}</base-button
        >
      </li>
    </ul>
  </div>
  <nest-loader v-if="isLoading" />
</template>

<script>
import { ref, computed, watch } from "vue";
import { BarChart } from "vue-chart-3";
import {
  setChartData,
  getChartBtns,
  setChartStyle,
} from "@/common/components/charts/chart-helpers";
import { ShortFinancialFormat } from "@/common/helpers";
import NestLoader from "@/common/components/loaders/NestLoader.vue";

export default {
  name: "BaseChartMix",
  components: {
    BarChart,
    NestLoader,
  },
  props: {
    chartData: {
      type: Object,
      require: true,
      default: function () {
        return {
          labels: [],
          datasets: [],
        };
      },
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const barChartRef = ref();
    const chartBtns = ref();
    const chartUpdate = computed(function () {
      if (props.chartData.labels.length === 0) {
        return props.chartData;
      }
      return setChartData(props.chartData);
    });
    const chartOptions = ref({
      responsive: true,
      onResize: function (chartIntance) {
        chartIntance.canvas.parentNode.style.height = chartIntance.width + "px";
      },
      resizeDelay: 75,
      animation: {
        animateScale: true,
      },
      transitions: {
        resize: {
          animation: {
            duration: 120,
          },
        },
      },
      plugins: {
        tooltip: {
          backgroundColor: "#ffffff",
          titleFont: {
            weight: 500,
          },
          padding: 10,
          titleColor: "#001219",
          bodyFont: {
            weight: 300,
          },
          bodyColor: "#001219",
          usePointStyle: true,
          borderWidth: 1,
          borderColor: "rgba(101, 101, 101, 0.2)",
          callbacks: {
            label: function (context) {
              const label = context.dataset.label;
              const valueY = context.formattedValue;
              return "  " + label + ":  " + valueY;
            },
          },
        },
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            font: {
              size: 12,
            },
          },
          position: "top",
          align: "end",
        },
        zoom: {
          limits: {
            y: {
              min: "original",
            },
            x: {
              min: "original",
              max: "original",
            },
          },
          pan: {
            enabled: true,
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
        },
      },
      scales: {
        x: {
          axis: "x",
          type: "time",
          time: {
            parser: "M/D/YY",
            unit: "day",
            tooltipFormat: "ddd, MMM DD, YYYY",
          },
        },
        y: {
          axis: "y",
          ticks: {
            callback: ShortFinancialFormat,
          },
        },
      },
    });
    function switchChart(id) {
      const chartInstance = barChartRef.value.chartInstance;
      const isZoom = chartInstance.isZoomedOrPanned(chartInstance);
      const chartConfig = chartInstance.config.data.datasets;
      const btnIndex = parseInt(id.split("-")[1]);
      if (chartBtns.value[btnIndex].active) {
        return;
      }
      let currentfirstChartIndex = chartConfig.findIndex(
        (data) => data.order === 0
      );
      currentfirstChartIndex =
        currentfirstChartIndex >= 0 ? currentfirstChartIndex : 0;
      const currentfirstChart = chartConfig[currentfirstChartIndex];
      chartBtns.value.forEach((btnData, idx) => {
        const currentChart = chartConfig[idx];
        if (btnIndex === idx) {
          btnData.active = true;
          currentChart.order = 0;
          currentfirstChart.order = idx;
          setChartStyle(currentChart, "bar", currentChart.theme);
          setChartStyle(currentfirstChart, "line", currentfirstChart.theme);
        } else {
          btnData.active = false;
        }
      });
      if (isZoom) {
        chartInstance.resetZoom();
      }
      chartInstance.update();
    }

    watch(chartUpdate, function (newValue, oldValue) {
      isLoading.value = true;
      chartBtns.value = getChartBtns(chartUpdate.value);
      if (
        oldValue.labels.length !== 0 &&
        newValue.datasets.length !== oldValue.datasets.length
      ) {
        const chartInstance = barChartRef.value.chartInstance;
        chartInstance.resetZoom();
        const lastDataIndex = newValue.datasets.length - 1;
        const newChart = newValue.datasets[lastDataIndex];
        const chartBtnIndexActive = chartBtns.value.findIndex((x) => x.active);
        newChart.order = lastDataIndex;
        newChart.type = "line";
        chartBtns.value = getChartBtns(newValue, chartBtnIndexActive);
        setChartStyle(newChart, newChart.type, newChart.theme);
      }
      isLoading.value = false;
    });

    return {
      barChartRef,
      chartOptions,
      chartUpdate,
      chartBtns,
      isLoading,
      switchChart,
    };
  },
};
</script>

<style lang="scss">
.basemixchart {
  margin-top: 10px;
  &__items {
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: center;
    align-content: center;
    padding: 0;
    margin: 0;
    @include breakpoint-down("sm") {
      flex-direction: column;
    }
  }
  &__item {
    flex: 1 1 auto;
    &:first-of-type {
      .btn {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        @include breakpoint-down("sm") {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom-left-radius: 0;
          border-top-width: 1px;
        }
      }
    }
    &:last-of-type {
      .btn {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-right-width: 1px;
        @include breakpoint-down("sm") {
          border-top-width: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
    & .btn {
      font-weight: 300;
      font-size: $font-sm;
      width: 100%;
      border-right-width: 0;
      border-radius: 0;
      text-transform: uppercase;
      padding: 10px 20px;
      color: $grey;
      @include breakpoint-down("sm") {
        border-width: 0 1px 1px 1px;
        padding: 6px 12px;
      }
      &:hover {
        background-color: rgba($dimGray, 0.2);
      }
      &.active {
        color: $richBlack;
        background-color: transparent;
        border-color: rgba($dimGray, 0.2);
      }
    }
  }
}
</style>
