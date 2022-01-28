<template>
  <DatePicker
    class="calendar"
    v-bind:class="{ open: getCalendarStatus }"
    ref="dateStatistic"
    v-model="range"
    v-bind:is-range="true"
    v-bind:max-date="new Date()"
    v-bind:step="1"
    v-bind:columns="1"
    v-bind:rows="1"
    v-bind:is-expanded="true"
    v-bind:masks="masks"
    v-bind:min-date="minDate"
  >
    <template v-slot:footer>
      <div class="calendar__footer">
        <button class="btn btn--primary" v-on:click="cancelCalendarMobile">
          Cancel
        </button>
        <button class="btn btn--primary" v-on:click="getPreviousPeriodMobile">
          Reset
        </button>
        <button class="btn btn--primary" v-on:click="updateCalendarMobile">
          Update
        </button>
      </div>
    </template>
  </DatePicker>
  <div class="calendar__form-control" v-on:click="toggleCalendar">
    <input
      class="calendar__form-input calendar__form-input--date"
      v-bind:value="getPeriodData.startInput"
    />
    <svg
      class="calendar__form-icon"
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
    <input
      class="calendar__form-input calendar__form-input--date"
      v-bind:value="getPeriodData.endInput"
      v-if="isNotSameDate"
    />
  </div>
</template>
<script>
import { DatePicker } from "v-calendar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CalendarMobileNav",
  components: {
    DatePicker,
  },
  computed: {
    ...mapGetters("calendars", ["getPeriodData", "getCalendarStatus"]),
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
        startInput: null,
        endInput: null,
      },
      masks: {
        input: "YYYY/MM/DD",
      },
    };
  },
  methods: {
    ...mapActions("calendars", ["setPeriodData", "toggleCalendar"]),
    getPreviousPeriod() {
      this.$refs.dateStatistic.updateValue({
        start: this.getPeriodData.start,
        end: this.getPeriodData.end,
      });
    },
    toggleCalendarMobile() {
      this.$refs.dateStatistic.updateValue({
        start: this.getPeriodData.start,
        end: this.getPeriodData.end,
      });
      this.toggleCalendar();
    },
    cancelCalendarMobile() {
      this.getPreviousPeriod();
      this.toggleCalendar();
    },
    updateCalendarMobile() {
      this.periodSearch = {
        ...this.range,
      };
      this.setPeriodData({
        ...this.periodSearch,
      });
      this.toggleCalendar();
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(0) translate(-50%, -50%);
  z-index: 3;
  transform-origin: 5% 5%;
  transition: all 250ms ease-in-out;
  &.open {
    transform: scale(1) translate(-50%, -50%);
  }
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
      width: 24px;
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
.calendar__form-control {
  align-items: center;
}
.calendar__form-input {
  text-align: center;
  font-size: $font-lg;
}

.calendar__form-input--date {
  max-width: 100%;
  margin-bottom: 0;
}

.calendar__form-icon {
  margin: 20px 0;
  width: 20px;
}
</style>