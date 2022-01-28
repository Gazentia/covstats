<template>
  <div class="data-table--wrapper">
    <div class="data-table__form form__control">
      <div class="data-table__filter">
        <label for="showPage" class="form__label">Row per page</label>
        <select
          name="showpage"
          id="showPage"
          class="form__select"
          v-model="showPage"
        >
          <option class="form__select-option" value="5">5</option>
          <option class="form__select-option" value="10">10</option>
          <option class="form__select-option" value="20">20</option>
        </select>
      </div>
      <div class="data-table__search">
        <input type="text" class="form__input" v-model="search" />
        <base-button btn-type="primary" type="button" v-on:click="searchData">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 106.37 106.36"
          >
            <title>magnifying-glass</title>
            <path
              class="cls-1"
              d="M455.33,115.48l12.27,12.25c5.14,5.14,10.3,10.27,15.42,15.43,2.51,2.53,2.68,5.69.5,7.93s-5.47,2.15-8.08-.44q-13-13-26-26a17.62,17.62,0,0,1-1.36-1.75c-23,17.18-50.38,7.39-61.78-9.21a42.86,42.86,0,1,1,69,1.8ZM389.27,89.15A32.16,32.16,0,1,0,421.51,57,32.13,32.13,0,0,0,389.27,89.15Z"
              transform="translate(-378.67 -46.35)"
            />
          </svg>
        </base-button>
      </div>
    </div>
    <div class="data-table--responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="(dataHeader, index) in dataHeaders"
              v-bind:key="index"
              v-bind:class="{
                'data-arrow': dataHeader.sort,
                active:
                  updateChanged.sort.columnIndex === index &&
                  updateChanged.sort.type === 'desc',
              }"
              v-on:click="sortColumn(index)"
            >
              {{ dataHeader.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="dataTable.data.length > 0">
            <tr v-for="(data, index) in dataTable.data" v-bind:key="index">
              <template v-for="(content, cIndex) in data" v-bind:key="cIndex">
                <td v-if="!content.html">
                  {{
                    content.formatted || content.formatted === 0
                      ? content.formatted
                      : content
                  }}
                </td>
                <td v-if="content.html">
                  <div
                    class="data-table--html"
                    v-html="content.formatted"
                  ></div>
                </td>
              </template>
            </tr>
          </template>
          <template v-if="dataTable.data.length === 0 && !isLoading">
            <tr>
              <td
                v-bind:colspan="dataHeaders.length"
                class="data-table--center"
              >
                {{ notFound }}
              </td>
            </tr>
          </template>
          <template v-if="isLoading">
            <tr>
              <td
                v-bind:colspan="dataHeaders.length"
                class="data-table--center"
              >
                <wave-loader />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="data-pagination" v-if="totalPages > 1">
      <div
        class="data-pagination__item data-pagination__prev"
        v-if="prevPage > 0"
        v-on:click="movePage(activePage - 1)"
      ></div>
      <template v-if="startPagination.length > 0">
        <div
          v-for="page in startPagination"
          v-bind:key="`p-${page}`"
          class="data-pagination__item"
          v-bind:class="{ active: activePage === page }"
          v-on:click="movePage(page)"
        >
          {{ page }}
        </div>
        <template v-if="startPagination.length === 1">
          <div class="data-pagination__dot">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </template>
      </template>
      <template v-if="innerPagination.length > 0">
        <div
          v-for="page in innerPagination"
          v-bind:key="`p-${page}`"
          class="data-pagination__item"
          v-bind:class="{ active: activePage === page }"
          v-on:click="movePage(page)"
        >
          {{ page }}
        </div>
      </template>
      <template v-if="endPagination.length > 0">
        <template v-if="endPagination.length === 1">
          <div class="data-pagination__dot">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </template>
        <div
          v-for="page in endPagination"
          v-bind:key="`p-${page}`"
          class="data-pagination__item"
          v-bind:class="{ active: activePage === page }"
          v-on:click="movePage(page)"
        >
          {{ page }}
        </div>
      </template>
      <div
        class="data-pagination__item data-pagination__next"
        v-if="nextPage > 0"
        v-on:click="movePage(activePage + 1)"
      ></div>
    </div>
  </div>
</template>
<script>
import WaveLoader from "@/common/components/loaders/WaveLoader.vue";

export default {
  name: "BaseTable",
  components: {
    WaveLoader,
  },
  props: {
    dataHeaders: {
      type: Array,
      require: true,
    },
    dataTable: {
      type: Object,
      require: true,
      default: function () {
        return {
          totalItem: 0,
          data: [],
          currentPage: 0,
        };
      },
    },
  },
  data() {
    return {
      updateChanged: {
        search: "",
        sort: {
          type: "asc",
          columnIndex: 0,
        },
        pageSize: 0,
        currentPage: 0,
      },
      prevPage: 0,
      activePage: 0,
      nextPage: 0,
      totalPages: 0,
      showPage: 5,
      maxPaginationItems: 4,
      extendPaginationItems: 2,
      innerPagination: [],
      startPagination: [],
      endPagination: [],
      notFound: "No Data Available in Table",
      search: "",
      isLoading: false,
    };
  },
  methods: {
    setActivcePage() {
      this.totalPages = Math.ceil(this.dataTable.totalItem / this.showPage);
      if (this.dataTable.currentPage === 0) {
        this.activePage = 1;
      }
      if (this.activePage > this.totalPages) {
        this.activePage = this.totalPages;
      } else {
        this.activePage = this.dataTable.currentPage;
      }
      this.updateChanged.currentPage = this.activePage;
    },
    setPagination() {
      this.updateChanged.pageSize = this.showPage;
      this.startPagination = [];
      this.endPagination = [];
      this.innerPagination = [];
      this.setActivcePage();
      let startPage = this.activePage;
      const maxMainPaginationitems =
        this.maxPaginationItems - this.extendPaginationItems;
      if (this.activePage - this.extendPaginationItems > 1) {
        this.startPagination = [1];
      }

      if (this.activePage + this.extendPaginationItems < this.totalPages) {
        this.endPagination = [this.totalPages];
      }

      if (
        this.activePage - this.extendPaginationItems > 1 &&
        this.activePage + this.extendPaginationItems < this.totalPages
      ) {
        startPage = startPage - this.extendPaginationItems;
        for (let p = 0; p < maxMainPaginationitems; p++) {
          this.innerPagination.push(startPage + p);
        }
      }

      if (this.activePage - this.extendPaginationItems <= 1) {
        let round = maxMainPaginationitems + 1;
        if (this.totalPages <= maxMainPaginationitems) {
          round = this.totalPages;
        }
        for (let p = 0; p < round; p++) {
          this.startPagination.push(p + 1);
        }
      }

      if (
        this.activePage + this.extendPaginationItems >= this.totalPages &&
        this.totalPages > maxMainPaginationitems
      ) {
        for (
          let p = this.totalPages;
          p >= this.totalPages - maxMainPaginationitems;
          p--
        ) {
          this.endPagination.unshift(p);
        }
      }
      if (this.totalPages > 1) {
        this.prevPage = this.activePage - 1;
        this.nextPage = this.activePage + 1;
      } else {
        this.prevPage = 0;
        this.nextPage = 0;
      }
    },
    sortColumn(index) {
      this.isLoading = true;
      if (this.updateChanged.sort.columnIndex === index) {
        this.updateChanged.sort.type =
          this.updateChanged.sort.type === "asc" ? "desc" : "asc";
        this.updateChanged.sort.columnIndex = index;
        this.$emit("table-changed", this.updateChanged);
      } else {
        this.updateChanged.sort.type = "desc";
        this.updateChanged.sort.columnIndex = index;
        this.$emit("table-changed", this.updateChanged);
      }
    },
    movePage(desPage) {
      this.isLoading = true;
      if (desPage === this.activePage) {
        this.isLoading = false;
        return;
      }
      this.updateChanged.currentPage = desPage;
      this.$emit("table-changed", this.updateChanged);
    },
    searchData() {
      this.isLoading = true;
      this.updateChanged.search = this.search;
      this.$emit("table-changed", this.updateChanged);
    },
    initTable() {
      this.isLoading = true;
      this.setPagination();
    },
    initTableConfig() {
      this.isLoading = true;
      this.extendPaginationItems = Math.floor(this.maxPaginationItems / 2) - 1;
    },
  },
  watch: {
    showPage(newValue) {
      this.isLoading = true;
      this.updateChanged.pageSize = newValue;
      this.$emit("table-changed", this.updateChanged);
    },
    search(newValue) {
      this.isLoading = true;
      this.updateChanged.search = newValue;
      this.$emit("table-changed", this.updateChanged);
    },
    dataTable() {
      this.initTable();
      this.isLoading = false;
    },
  },
  mounted() {
    this.initTableConfig();
    this.initTable();
  },
};
</script>
<style lang="scss">
.data {
  &-table {
    width: 100%;
    border-spacing: 0 16px;
    &--html {
      display: flex;
      align-items: center;
    }
    &--img {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: $white;
      background-position: center;
      background-size: cover;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
    &--wrapper {
      display: flex;
      flex-direction: column;
    }
    &--responsive {
      @include breakpoint-down("md") {
        overflow-x: auto !important;
      }
    }
    &__search {
      display: flex;
      flex-direction: row;
    }
    &--center {
      text-align: center;
    }
    &__filter {
      display: flex;
      flex-direction: row;
      @include breakpoint-down("md") {
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
    &__form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @include breakpoint-down("md") {
        flex-direction: column;
      }
      .form__label {
        margin-bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: $grey;
      }
      .form__input {
        margin-right: 10px;
        min-height: 42px;
        max-width: 200px;

        &:last-child {
          margin-right: 0;
        }
        @include breakpoint-down("md") {
          max-width: 100%;
        }
        &:last-child {
          margin-left: auto;
        }
      }
    }
    th {
      position: relative;
      font-weight: 300;
      padding: 24px 20px;
      margin-bottom: 5px;
      &:first-of-type {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
      &:last-of-type {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
      &:last-child {
        &.data-arrow {
          padding-right: 34px;
        }
      }
    }

    thead {
      background-color: $richBlack;
      color: $white;
    }
    tbody {
      tr {
        background: rgb(255, 255, 255);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(243, 243, 243, 1) 100%
        );
      }
      td {
        font-weight: normal;
        padding: 24px 20px;
        border-color: $lightGrey;
        border-style: solid;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 1px;
        border-bottom-width: 1px;
        &:first-of-type {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          border-left-width: 1px;
        }
        &:last-of-type {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          border-right-width: 1px;
        }
      }
    }
  }
  &-arrow {
    &::after {
      display: inline-block;
      cursor: pointer;
      height: 8px;
      width: 11px;
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(0deg);
      margin-left: 10px;
      background-image: url("../../../assets/icons/arrow-down.svg");
      transition: all 150ms ease-in-out;
    }
    &.active {
      &::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }
  &-pagination {
    display: flex;
    flex-direction: row;
    font-weight: normal;
    color: $richBlack;
    justify-content: flex-end;
    align-items: center;

    @include breakpoint-down("md") {
      justify-content: center;
      margin: 16px 0;
    }
    &__item {
      padding: 12px;
      border-radius: 6px;
      background-color: $lightGrey;
      cursor: pointer;
      margin-right: 12px;
      font-size: $font-sm;
      transition: all 150ms ease-in-out;
      &.active,
      &:hover {
        background-color: $grey;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__dot {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;
      > span {
        display: inline-block;
        background-color: $grey;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        margin-right: 4px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    &__prev {
      &::after {
        display: inline-block;
        height: 11px;
        width: 7px;
        content: "";
        background-image: url("../../../assets/icons/arrow-left.svg");
      }
    }
    &__next {
      &::after {
        display: inline-block;
        height: 11px;
        width: 7px;
        content: "";
        background-image: url("../../../assets/icons/arrow-right.svg");
      }
    }
  }
}
</style>
