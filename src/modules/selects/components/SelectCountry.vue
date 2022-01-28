<template>
  <v-select
    v-bind:options="paginated"
    v-model="selectCountry"
    v-bind:clearable="false"
    v-bind:filterable="false"
    v-on:search="onSearch"
  >
    <!-- eslint-disable-next-line vue/no-unused-vars  -->
    <template v-slot:no-options="{ search, searching, loading }">
      The name " {{ search }} ” was not found.
    </template>

    <template v-slot:open-indicator="{ attributes }">
      <span v-bind="attributes"
        ><svg
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.701869"
            d="M0.691192 1.51396C0.577059 1.36887 0.558456 1.17493 0.643427 1.01261C0.728901 0.850276 0.902865 0.747803 1.09342 0.747803L10.1436 0.747803C10.3341 0.747803 10.5081 0.850276 10.5936 1.01261C10.6288 1.08012 10.6464 1.15386 10.6464 1.22665C10.6464 1.32817 10.6122 1.42968 10.5458 1.51396L6.02073 7.26012C5.9262 7.38079 5.77688 7.45166 5.6185 7.45166C5.46012 7.45166 5.3113 7.38079 5.21627 7.26012L0.691192 1.51396Z"
            fill="#AAAFB7"
          /></svg
      ></span>
    </template>

    <template v-slot:list-footer class="pagination">
      <li class="v-select__btn--group">
        <button
          class="v-select__btn"
          v-bind:disabled="!hasPrevPage"
          v-on:click="offset -= limit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </button>
        <button
          class="v-select__btn"
          v-bind:disabled="!hasNextPage"
          v-on:click="offset += limit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </li>
    </template>
  </v-select>
</template>
<script>
import { VueSelect as VSelect } from "vue-select";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SelectCountry",
  components: {
    VSelect,
  },
  props: {
    limit: {
      type: Number,
      require: true,
      default: 5,
    },
  },
  computed: {
    ...mapGetters("covid-statistics", ["getSelectionCountry"]),
    ...mapGetters("selects", ["getCountryActive"]),
    filtered() {
      return this.getSelectionCountry.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    paginated() {
      return this.filtered.slice(this.offset, this.limit + this.offset);
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.filtered.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.filtered.slice(prevOffset, this.limit + prevOffset).length
      );
    },
  },
  watch: {
    getCountryActive() {
      this.selectCountry = this.getCountryActive;
    },
    selectCountry(newValue) {
      this.setActiveCountry({ data: newValue });
    },
  },
  data() {
    return {
      selectCountry: null,
      search: "",
      offset: 0,
    };
  },
  methods: {
    ...mapActions("selects", ["setActiveCountry"]),
    onSearch(query) {
      this.search = query;
      this.offset = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-select {
  width: 100%;
  font-size: $font-md;
  &__btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $white;
    border: 0;
    cursor: pointer;
    font-weight: 300;
    transition: all 250ms ease-in-out;
    padding: 4px 8px;
    width: 100%;
    &:first-of-type {
      border-right: 1px solid $grey;
    }
    &--group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
    }
    &:hover {
      background-color: $richBlack;
      color: $white;
    }
    &:focus {
      outline: none;
    }

    svg {
      width: 20px;
    }
  }
}
</style>