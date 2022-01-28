import convert from "color-convert";
import { pascalize, numberFormat } from "@/common/helpers";
import * as topojson from "topojson-client";

export const CHART_COLORS = rgbaChartColor([
  { name: "default", main: "#656565", secondary: "#BFBFBF" },
  { name: "increase", main: "#0A9396", secondary: "#5FC6C8" },
  { name: "decrease", main: "#ae2012", secondary: "#F35F50" },
  { name: "base", main: "#BFBFBF", secondary: "#F0F0F0" },
]);

export function getCSSValueRGBA(rgb = [0, 0, 0], alpha = 1) {
  if (rgb.length > 3) {
    rgb.pop();
  }
  rgb.push(alpha);
  return "rgba(" + rgb.join(",") + ")";
}

export function rgbaChartColor(colors = []) {
  // colors = [ {name: "smaple", main: "#ffffff", secondary: "#000000"} ]
  const result = {};
  if (colors.length) {
    colors.forEach((color) => {
      result[color.name] = { gredient: {}, map: {} };
      const colorObj = result[color.name];
      color.main = convert.hex.rgb(color.main);
      color.secondary = convert.hex.rgb(color.secondary);
      colorObj.gredient = {};
      colorObj.point = getCSSValueRGBA(color.secondary);
      colorObj.background = getCSSValueRGBA(color.main, 0.5);
      colorObj.border = getCSSValueRGBA(color.main);
      colorObj.gredient.main = getCSSValueRGBA(color.main, 0.6);
      colorObj.gredient.secondary = getCSSValueRGBA(color.secondary, 0.2);
      colorObj.map.outline = getCSSValueRGBA(color.main, 0.2);
      colorObj.map.background = getCSSValueRGBA(color.secondary, 0.1);
      colorObj.map.active = getCSSValueRGBA(color.main, 0.5);
    });
  }
  return result;
}

export function setChartStyle(datasetConfig, type, theme) {
  // Remove specifically properties for bar chart
  delete datasetConfig.borderRadius;
  delete datasetConfig.barPercentage;
  // Remove specifically properties for bar chart
  delete datasetConfig.pointBackgroundColor;
  delete datasetConfig.pointBorderColor;
  delete datasetConfig.borderJoinStyle;
  delete datasetConfig.fill;
  delete datasetConfig.pointRadius;
  delete datasetConfig.pointBorderWidth;
  delete datasetConfig.hoverRadius;
  delete datasetConfig.hoverBorderWidth;

  if (type === "bar") {
    datasetConfig.type = "bar";
    datasetConfig.backgroundColor = CHART_COLORS[theme].background;
    datasetConfig.borderColor = CHART_COLORS[theme].border;
    datasetConfig.borderWidth = 3;
    datasetConfig.borderRadius = 100;
    datasetConfig.barPercentage = 1;
  }
  if (type === "doughnut") {
    delete datasetConfig.type;
    datasetConfig.borderWidth = 0;
    datasetConfig.backgroundColor = [];
    datasetConfig.borderColor = [];
    datasetConfig.theme.forEach((t) => {
      datasetConfig.backgroundColor.push(CHART_COLORS[t].background);
      datasetConfig.borderColor.push(CHART_COLORS[t].border);
    });
  }
  if (type === "line") {
    datasetConfig.type = "line";
    datasetConfig.borderWidth = 3;
    datasetConfig.borderColor = CHART_COLORS[theme].border;
    datasetConfig.pointBackgroundColor = CHART_COLORS[theme].point;
    datasetConfig.pointBorderColor = CHART_COLORS[theme].border;
    datasetConfig.borderJoinStyle = "round";
    datasetConfig.fill = true;
    datasetConfig.pointRadius = 4;
    datasetConfig.pointBorderWidth = 2;
    datasetConfig.hoverRadius = 8;
    datasetConfig.hoverBorderWidth = 4;
    datasetConfig.backgroundColor = function (context) {
      const chart = context.chart;
      const { ctx, chartArea } = chart;
      if (!chartArea) {
        return;
      }
      return getlinearGredient(ctx, chartArea, theme);
    };
  }
}

export function getlinearGredient(ctx, chartArea, mode = "default") {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, CHART_COLORS[mode].gredient.secondary);
  gradient.addColorStop(1, CHART_COLORS[mode].gredient.main);
  return gradient;
}

export function getChartBtns(data, btnIndexActiveInit = 0) {
  return data.datasets.map((x, index) => {
    return {
      active: !x.active && btnIndexActiveInit !== index ? false : true,
      label: x.label,
      id: x.label + "-" + index,
    };
  });
}

export function setChartType(
  label,
  type,
  data,
  options = { theme: "default" }
) {
  const config = {};
  config.label = label;
  config.data = [...data.data];
  config.order = options.order;
  config.theme = options.theme;
  setChartStyle(config, type, options.theme);
  return config;
}

export function setChartData(currentChartData) {
  currentChartData = currentChartData.chartData
    ? currentChartData.chartData.value
    : currentChartData;
  const newDatasets = currentChartData.datasets.map((data, index) => {
    let type;
    if (data.type === "doughnut") {
      type = data.type;
    } else {
      type = index === 0 ? "bar" : "line";
    }
    return setChartType(data.label, type, data, {
      theme: data.theme,
      order: data.order || data.order === 0 ? data.order : index,
    });
  });
  currentChartData.datasets = newDatasets;
  return currentChartData;
}

export async function getDataForChartGeo() {
  let contriesRes = null;
  try {
    const contries = await fetch(
      "https://unpkg.com/world-atlas/countries-50m.json"
    );
    if (!contries.ok) {
      throw new Error("cannot get data countries.");
    }
    contriesRes = await contries.json();
    contriesRes = topojson.feature(
      contriesRes,
      contriesRes.objects.countries
    ).features;
  } catch (err) {
    contriesRes = err;
  }
  return contriesRes;
}

export async function setChartGeoData(currentChartData) {
  const labels = [];
  const currentData = currentChartData.value.datasets[0].data;
  const countryList = await getDataForChartGeo();
  const newCountryList = countryList.map((countryFeature, countryIndex) => {
    labels.push(countryFeature.properties.name);
    const dataIndex = currentData.findIndex(
      (data) =>
        countryFeature.properties.name.toUpperCase() ===
        data.feature.toUpperCase()
    );
    let data = null;
    if (dataIndex >= 0) {
      data = { ...currentData[dataIndex].data };
    }
    return {
      feature: countryFeature,
      data: data,
      value: countryIndex,
    };
  });
  currentChartData.value.datasets[0].backgroundColor =
    CHART_COLORS["default"].map.background;
  currentChartData.value.datasets[0].borderColor =
    CHART_COLORS["default"].map.outline;
  currentChartData.value.labels = labels;
  currentChartData.value.datasets[0].data = newCountryList;
}

export function setContentMapTooltip(ctx, srcProps, displayRef) {
  const dataSets = srcProps.value.datasets[0];
  const dataProps = dataSets.data;
  const tooltipModel = ctx.tooltip;
  tooltipModel.body[0].lines.forEach((x) => {
    const newData = x.split(":");
    const countryName = newData[0];
    const targetIndex = parseInt(newData[1]);
    const dataObject = dataProps[targetIndex];

    let contextHTML = `<div class="custom-tippy__title">
                          <h2>${countryName}</h2>
                        </div>`;
    if (dataObject.data) {
      let listStates = `<ul class="custom-tippy__items">`;

      for (const props in dataObject.data) {
        const pointStyle = `background-color: ${
          CHART_COLORS[dataSets.theme[props]].point
        }; border-color: ${CHART_COLORS[dataSets.theme[props]].border};`;
        listStates += `<li class="custom-tippy__item">
                          <span class="custom-tippy__pointstyle" style="${pointStyle}"></span><span>${pascalize(
          props
        )}: ${numberFormat(dataObject.data[props])}</span>
                        </li>`;
      }
      listStates += `</ul>`;
      contextHTML += listStates;
    }
    displayRef.value = contextHTML;
  });
}
