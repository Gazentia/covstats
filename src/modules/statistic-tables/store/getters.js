import { numberFormat, normalizeValue } from "@/common/helpers";

export default {
  getDataTable(state, getters, rootState) {
    let activePage = state.filters.currentPage;
    const pageSize = state.filters.pageSize;
    const dataHeaders = [
      {
        name: "#",
      },
      {
        name: "country",
        sort: true,
      },
      {
        name: "Total Cases",
        sort: true,
      },
      {
        name: "Total Deaths",
        sort: true,
      },
      {
        name: "Total Recovered",
        sort: true,
      },
    ];
    const dataTable = { totalItem: 0, data: [], currentPage: 0 };

    dataTable.currentPage = state.filters.currentPage;

    // converting state to data rows
    rootState["covid-statistics"].statistics.forEach((country, index) => {
      const dataRow = [
        index + 1,
        {
          formatted: `<div class="data-table--img" style="background-image: url(${country.countryInfo.flag});"></div><div>${country.country}</div>`,
          value: country.country,
          html: true,
        },
        {
          formatted: numberFormat(country.cases),
          value: country.cases,
        },
        {
          formatted: numberFormat(country.deaths),
          value: country.deaths,
        },
        {
          formatted: numberFormat(country.recovered),
          value: country.recovered,
        },
      ];
      dataTable.data.push(dataRow);
    });

    // check for searhing
    const search = state.filters.search;
    if (search >= 0 || search) {
      dataTable.data = dataTable.data.filter((row) => {
        let isMatched = false;
        for (let col = 0; col < row.length; col++) {
          let colVal = normalizeValue(row[col]);
          colVal = typeof colVal === "number" ? String(colVal) : colVal;
          const searching = colVal.indexOf(search.toUpperCase());
          if (searching >= 0) {
            isMatched = true;
          }
        }
        return isMatched;
      });
    }
    // check for sorting
    const columnSortIndex = state.filters.sort.columnIndex;
    if (columnSortIndex >= 0) {
      const sortType = state.filters.sort.type;
      if (dataHeaders[columnSortIndex] && dataHeaders[columnSortIndex].sort) {
        dataTable.data = dataTable.data.sort((rowA, rowB) => {
          const dataA = normalizeValue(rowA[columnSortIndex]);
          const dataB = normalizeValue(rowB[columnSortIndex]);
          if (sortType === "asc") {
            if (dataA < dataB) {
              return -1;
            } else {
              return 1;
            }
          } else if (sortType === "desc") {
            if (dataA > dataB) {
              return -1;
            } else {
              return 1;
            }
          }
        });
      }
    }

    dataTable.totalItem = dataTable.data.length;
    // check active page greater than totalPages
    const totalPages = Math.ceil(dataTable.totalItem / pageSize);
    if (activePage > totalPages) {
      dataTable.currentPage = totalPages;
      activePage = totalPages;
    }
    // set display data
    const startRow = activePage * pageSize - pageSize;
    const endRow = activePage * pageSize;
    dataTable.data = dataTable.data.slice(startRow, endRow);
    return {
      dataHeaders,
      dataTable,
    };
  },
};
