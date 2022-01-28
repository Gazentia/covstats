<template>
  <div
    ref="BaseChartTooltipRef"
    id="chartjs-tooltip"
    class="tooltip"
    v-bind:style="tooltipStyle"
  >
    <div class="tooltip__title">
      <slot name="tooltip-title"></slot>
    </div>
    <div class="tooltip__body">
      <slot name="tooltip-body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseChartTooltip",
  props: {
    chartTooltip: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      tooltipStyle: {
        opacity: 0,
        left: 0,
        top: 0,
        pointerEvents: "none",
      },
    };
  },
  watch: {
    chartTooltip() {
      const tooltip = this.chartTooltip.tooltip;
      if (tooltip.opacity === 0) {
        this.tooltipStyle = {
          opacity: 0,
        };
      } else {
        const position = this.chartTooltip.chart.canvas.getBoundingClientRect();
        const tooltipClientRact =
          this.$refs.BaseChartTooltipRef.getBoundingClientRect();
        const positionTooltip = {};
        if (tooltip.caretX + tooltipClientRact.width > position.width) {
          positionTooltip.left =
            position.left +
            window.pageXOffset +
            tooltip.caretX -
            tooltipClientRact.width +
            "px";
        } else {
          positionTooltip.left =
            position.left + window.pageXOffset + tooltip.caretX + "px";
        }
        if (tooltip.caretY + tooltipClientRact.height > position.height) {
          positionTooltip.top =
            position.top +
            window.pageYOffset +
            tooltip.caretY -
            tooltipClientRact.height +
            "px";
        } else {
          positionTooltip.top =
            position.top + window.pageYOffset + tooltip.caretY + "px";
        }
        this.tooltipStyle = {
          ...this.tooltipStyle,
          ...positionTooltip,
          opacity: tooltip.opacity,
          maxWidth: "200px",
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tooltip {
  position: absolute;
  font-weight: 300;
  padding: 10px;
  background-color: $white;
  border-radius: 10px;
  border: 1px solid rgba($dimGray, 0.2);
  color: $richBlack;
  font-size: $font-sm;
  transition: opacity 250ms ease-in-out;
  &__title {
    font-weight: normal;
    margin-bottom: 5px;
  }
}
</style>