<template>
  <div class="chart-doughnut--wrapper">
    <div class="backdrop" v-if="isLoading">
      <nest-loader />
    </div>
    <DoughnutChart
      v-if="!isLoading"
      ref="doughnutChartRef"
      v-bind:chartData="chartUpdate"
      v-bind:options="chartOptions"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { setChartData } from "@/common/components/charts/chart-helpers";
import NestLoader from "@/common/components/loaders/NestLoader.vue";

export default {
  name: "BaseChartDoughnut",
  components: {
    DoughnutChart,
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
    const isLoading = ref(true);
    const doughnutChartRef = ref();
    const chartUpdate = computed(function () {
      if (props.chartData.labels.length === 0) {
        return props.chartData;
      }
      return setChartData(props.chartData);
    });
    const chartOptions = ref({
      labelSuffix: null,
      cutout: "70%",
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
              return " " + context.label;
            },
          },
        },
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            font: {
              size: 14,
            },
            padding: 25,
            filter: function (legendItem) {
              return legendItem.index === 0;
            },
          },
          position: "bottom",
          align: "center",
          onClick: function () {
            return;
          },
        },
      },
    });
    watch(props, function () {
      isLoading.value = false;
    });
    return {
      doughnutChartRef,
      chartOptions,
      chartUpdate,
      isLoading,
    };
  },
};
</script>

<style lang="scss">
.chart-doughnut {
  &--wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
}
</style>
