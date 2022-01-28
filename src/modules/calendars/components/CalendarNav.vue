<template>
  <div class="calendar__form">
    <svg
      class="calendar__form-icon calendar__form-icon--middle-right"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#000000"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
    <div class="calendar__form-range">
      <DatePicker
        ref="dateStatistic"
        v-model="range"
        v-bind:is-range="true"
        v-bind:max-date="new Date()"
        v-bind:step="1"
        v-bind:columns="2"
        v-bind:masks="masks"
        v-bind:popover="popoverOptions"
        v-bind:min-date="minDate"
      >
        <template v-slot="{ togglePopover }">
          <div
            class="calendar__form-control"
            v-on:click="toggleCalendar(togglePopover)"
          >
            <input
              class="calendar__form-input calendar__form-input--date"
              v-bind:value="getPeriodData.startInput"
            />
            <input
              class="calendar__form-input calendar__form-input--date"
              v-bind:value="getPeriodData.endInput"
              v-if="isNotSameDate"
            />
          </div>
        </template>
        <template v-slot:footer>
          <div class="calendar__footer">
            <button class="btn btn--primary" v-on:click="cancelCalendar">
              Cancel
            </button>
            <button class="btn btn--primary" v-on:click="getPreviousPeriod">
              Reset
            </button>
            <button class="btn btn--primary" v-on:click="updateCalendar">
              Update
            </button>
          </div>
        </template>
      </DatePicker>
    </div>
  </div>
</template>
<script>
import { DatePicker } from "v-calendar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CalendarNav",
  components: {
    DatePicker,
  },
  computed: {
    ...mapGetters("calendars", ["getPeriodData"]),
    isNotSameDate() {
      return (
        this.getPeriodData.start.getTime() !== this.getPeriodData.end.getTime()
      );
    },
    minDate() {
      const minDate = new Date();
      minDate.setMonth(minDate.getMonth() - 1);
      minDate.setDate(1);
      return minDate;
    },
  },
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      periodSearch: {
        start: null,
        end: null,
      },
      masks: {
        input: "YYYY/MM/DD",
      },
      popoverOptions: {
        keepVisibleOnInput: true,
        placement: "top-start",
      },
      toggleFn: null,
    };
  },
  methods: {
    ...mapActions("calendars", ["setPeriodData"]),
    getPreviousPeriod() {
      this.$refs.dateStatistic.updateValue({
        start: this.getPeriodData.start,
        end: this.getPeriodData.end,
      });
    },
    toggleCalendar(toggleFn) {
      this.$refs.dateStatistic.updateValue({
        start: this.getPeriodData.start,
        end: this.getPeriodData.end,
      });
      this.toggleFn = toggleFn;
      this.toggleFn();
    },
    cancelCalendar() {
      this.getPreviousPeriod();
      this.toggleFn();
    },
    updateCalendar() {
      this.periodSearch = {
        ...this.range,
      };
      this.setPeriodData({
        ...this.periodSearch,
      });
      this.toggleFn();
    },
    resetCalendar() {
      this.getPreviousPeriod();
    },
  },
  mounted() {
    this.$refs.dateStatistic.updateValue({
      start: this.getPeriodData.start,
      end: this.getPeriodData.end,
    });
  },
};
</script>
<style lang="scss" scoped>
.calendar {
  &__form {
    position: relative;
    &-control {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    &-range {
      position: relative;
    }
    &-input {
      border: 0;
      color: $richBlack;
      font-size: $font-sm;
      text-align: right;
      margin-bottom: 8px;
      width: 100%;
      &--date {
        max-width: 100px;
      }
      &:focus {
        outline: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    &-icon {
      width: 14px;
      &--clickable {
        cursor: pointer;
      }
      &--middle-right {
        position: absolute;
        right: -30px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }
      path {
        fill: $grey;
        stroke: $grey;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 6px 6px 6px;

    @include breakpoint-down("md") {
      justify-content: center;
    }
    .btn {
      font-size: $font-sm;
      padding: 10px 20px;
      margin-right: 12px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>