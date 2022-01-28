<template>
  <div class="chart-geo--wrapper" ref="chartGeoWrapper" v-bind:style="{}">
    <div class="backdrop" v-if="isLoading">
      <nest-loader />
    </div>
    <svg
      class="chart-geo"
      v-if="!isLoading"
      style="display: block"
      preserveAspectRatio="xMidYMid meet"
      v-bind:viewBox="viewBox"
      v-bind:width="width"
      v-bind:height="height"
      v-on:click="resetZoom"
    >
      <pattern
        id="pattern-circles"
        patternUnits="userSpaceOnUse"
        width="40"
        height="40"
        patternTransform="scale(0.10) rotate(0)"
      >
        <path
          d="M40 45a5 5 0 110-10 5 5 0 010 10zM0 45a5 5 0 110-10 5 5 0 010 10zM0 5A5 5 0 110-5 5 5 0 010 5zm40 0a5 5 0 110-10 5 5 0 010 10z"
          stroke-width="1"
          stroke="none"
          fill="#BFBFBF"
        />
      </pattern>

      <g v-bind:clip-path="`${location}#clip`" v-if="isPathReady">
        <path
          class="chart-geo__area"
          v-for="feature in geojson.features"
          v-bind:d="path(feature)"
          v-bind:key="feature.id"
          v-tippy="tippyOptions"
          v-on:mouseover="setContentMapTooltip($event)"
          v-bind:data-country="`${feature.id}-${feature.properties.name}`"
          v-on:click="activeCountry($event, feature.properties.name, feature)"
          v-bind:class="{ active: isActive(feature.properties.name) }"
          fill="url(#pattern-circles)"
          stroke="#BFBFBF"
        ></path>
      </g>
      <use
        v-bind:href="`${location}#outline`"
        fill="none"
        v-bind:stroke="outlineVbox"
      />
    </svg>
  </div>
</template>
<script>
import * as d3 from "d3";
import "d3-transition";
import { geoEquirectangular } from "d3-geo";
import * as topojson from "topojson-client";
import { directive } from "vue-tippy";
import { CHART_COLORS } from "@/common/components/charts/chart-helpers";
import { numberFormat, pascalize } from "@/common/helpers";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import NestLoader from "@/common/components/loaders/NestLoader.vue";
import debounce from "lodash.debounce";

export default {
  name: "BaseChartMap",
  components: {
    NestLoader,
  },
  directives: {
    tippy: directive,
  },
  props: {
    chartData: {
      type: Object,
      require: true,
    },
    outlineVbox: {
      type: String,
      default: "transparent",
    },
    countryActive: {
      type: String,
      default: "World Wide",
    },
  },
  computed: {
    viewBox() {
      return "0 0 " + this.width + " " + this.height;
    },
  },
  data() {
    return {
      location: window.location.href,
      graticule: null,
      outline: null,
      isLoading: false,
      width: 500,
      height: 500,
      isPathReady: false,
      zoomBehaviour: null,
      zoomBase: null,
      zoomTarget: null,
      zoomTargetSize: null,
      zoomFactor: null,
      pathSetted: null,
      cachedTransform: null,
      notFoundData: false,
      tippyOptions: {
        content: "",
        animation: "fade",
        theme: "custom-tooltip",
        allowHTML: true,
        followCursor: false,
        placement: "auto",
        hideOnClick: false,
        interactiveDebounce: 250,
      },
      dataGeoSVG: null,
    };
  },
  methods: {
    isActive(countryName) {
      return countryName.indexOf(this.countryActive) >= 0;
    },
    setZoomBehaviour(startZoom = 1, tExtent = [this.width, this.height]) {
      this.zoomBehaviour = d3
        .zoom()
        .scaleExtent([startZoom, 8])
        .translateExtent([[0, 0], tExtent])
        .on("zoom", (zoomEvent) => {
          let transform = zoomEvent.transform;
          this.zoomTarget
            .attr(
              "transform",
              "translate(" +
                transform.x +
                ", " +
                transform.y +
                " ) scale( " +
                transform.k +
                ")"
            )
            .attr("stroke-width", 1 / transform.k);
        })
        .on("end", () => {
          if (!this.cachedTransform) {
            this.updateCachedTransform();
          }
        });
      this.zoomBase.call(this.zoomBehaviour);
    },
    setZoomComponent() {
      this.zoomBase = d3.select(".chart-geo");
      this.zoomTarget = d3.select(".chart-geo g");
      this.zoomTargetSize = this.zoomTarget.node().getBoundingClientRect();
      this.zoomFactor = this.height / this.zoomTargetSize.height;
    },
    activeCountry(event, countryData, d) {
      if (!this.notFoundData) {
        this.zoomTo(event, d);
        this.$emit("active-country", countryData);
      }
    },
    setContentMapTooltip(event) {
      const countryName = event.target.dataset.country.split("-")[1];
      const dataTheme = this.chartData.datasets.theme;
      const dataSets = this.chartData.datasets.countries;
      const indexData = dataSets.findIndex(
        (x) => x.name.toUpperCase().indexOf(countryName.toUpperCase()) === 0
      );
      let contextHTML = `<div class="custom-tippy__title">
                          <h2>${countryName}</h2>
                        </div>`;
      if (indexData >= 0) {
        this.notFoundData = false;
        let listStates = `<ul class="custom-tippy__items">`;
        for (const props in dataTheme) {
          const pointStyle = `background-color: ${
            CHART_COLORS[dataTheme[props]].point
          }; border-color: ${CHART_COLORS[dataTheme[props]].border};`;
          listStates += `<li class="custom-tippy__item">
                          <span class="custom-tippy__pointstyle" style="${pointStyle}"></span><span>${pascalize(
            props
          )}: ${numberFormat(dataSets[indexData].data[props])}</span>
                        </li>`;
        }
        listStates += `</ul>`;
        contextHTML += listStates;
      } else {
        this.notFoundData = true;
      }
      this.tippyOptions.content = contextHTML;
    },
    path(feature) {
      return this.pathSetted(feature);
    },
    updateWidthHeight() {
      const ClientReact = this.$refs.chartGeoWrapper.getBoundingClientRect();
      this.height = ClientReact.height - ClientReact.top;
      this.width = ClientReact.width;
    },
    setPathGenerate() {
      this.updateWidthHeight();
      const projection = geoEquirectangular().translate([
        this.width / 2,
        this.height / 2,
      ]);
      projection.fitExtent(
        [
          [0, 0],
          [this.width, this.height],
        ],
        this.geojson
      );
      this.outline = { type: "Sphere" };
      this.projection = projection;
      this.isPathReady = true;
      this.pathSetted = d3.geoPath().projection(this.projection);
    },
    async fetchGeoJSON() {
      this.dataGeoSVG = await fetch(
        "https://unpkg.com/world-atlas/countries-110m.json"
      );
      if (!this.dataGeoSVG.ok) {
        throw Error();
      }
      this.dataGeoSVG = await this.dataGeoSVG.json();
      this.geojson = topojson.feature(
        this.dataGeoSVG,
        this.dataGeoSVG.objects.countries
      );
    },
    initZoom() {
      this.setZoomComponent();
      this.cachedTransform = null;
      if (window.innerWidth < 767) {
        this.setZoomBehaviour(this.zoomFactor);
        this.zoomBase
          .transition()
          .duration(750)
          .call(
            this.zoomBehaviour.translateBy,
            this.zoomTargetSize.width / 2,
            this.zoomTargetSize.height / 2
          )
          .call(this.zoomBehaviour.scaleBy, this.zoomFactor);
      } else {
        this.setZoomBehaviour(this.zoomFactor);
        this.zoomBase
          .transition()
          .duration(750)
          .call(
            this.zoomBehaviour.translateBy,
            this.zoomTargetSize.width / 2,
            this.zoomTargetSize.height / 2
          )
          .call(this.zoomBehaviour.scaleBy, this.zoomFactor);
      }
    },
    updateCachedTransform() {
      this.cachedTransform = d3.zoomTransform(this.zoomTarget.node());
    },
    zoomOut() {
      this.zoomBase
        .transition()
        .duration(750)
        .call(
          this.zoomBehaviour.transform,
          this.cachedTransform,
          d3
            .zoomTransform(this.zoomBase.node())
            .invert([this.width / 2, this.height / 2])
        );
    },
    resetZoom() {
      this.zoomOut();
    },
    zoomTo(event, d) {
      const [[x0, y0], [x1, y1]] = this.pathSetted.bounds(d);
      event.stopPropagation();
      this.zoomBase
        .transition()
        .duration(750)
        .call(
          this.zoomBehaviour.transform,
          d3.zoomIdentity
            .translate(this.width / 2, this.height / 2)
            .scale(
              Math.min(
                8,
                0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)
              )
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, this.zoomBase.node())
        );
    },
    resize() {
      this.setPathGenerate();
      this.initZoom();
    },
  },
  created() {
    window.addEventListener("resize", debounce(this.resize, 75));
  },
  unmounted() {
    window.removeEventListener("resize", debounce(this.resize, 75));
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchGeoJSON();
    this.setPathGenerate();
    this.isLoading = false;
    this.$nextTick(() => {
      this.initZoom();
    });
  },
};
</script>
<style lang="scss">
.chart-geo {
  display: block;
  width: 100%;
  &--wrapper {
    position: relative;
    height: 100vh;
    width: 100%;
  }
  pattern {
    path {
      fill: rgba($grey, 0.6);
      &:hover {
        fill: rgba($grey, 1);
      }
    }
  }
  &__area {
    fill: rgba($grey, 0);
    transition: fill 200ms ease-in-out;
    &.active,
    &:hover {
      cursor: pointer;
      fill: rgba($grey, 0.6);
    }
    &:focus {
      outline: none;
    }
  }
}
.custom-tippy {
  font-weight: 300;
  &__title {
    margin: 0 0 5px;
    font-weight: normal;
    font-size: $font-sm;
    h2 {
      margin: 0 0 5px 0;
      font-weight: normal;
      font-size: $font-sm;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  &__items {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__pointstyle {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: transparent;
    border: 1px solid $dimGray;
    border-radius: 100%;
    margin-right: 5px;
  }
}
// name: 'default', main: '#656565', secondary: '#BFBFBF'
.tippy-box[data-theme~="custom-tooltip"] {
  background: rgba($white, 1);
  border: 1px solid rgba($dimGray, 0.2);
  color: $richBlack;
  & > .tippy-svg-arrow {
    /* The border */
    & > svg {
      &:first-child {
        fill: rgba($dimGray, 0.5);
      }
      &:last-child {
        fill: rgba($grey, 0.1);
      }
    }
  }
  &[data-placement^="top"] > .tippy-arrow::before {
    border-top-color: rgba($grey, 0.5);
  }
  &[data-placement^="bottom"] > .tippy-arrow::before {
    border-bottom-color: rgba($grey, 0.5);
  }
  &[data-placement^="left"] > .tippy-arrow::before {
    border-left-color: rgba($grey, 0.5);
  }
  &[data-placement^="right"] > .tippy-arrow::before {
    border-right-color: rgba($grey, 0.5);
  }
}
</style>
