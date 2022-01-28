<template>
  <div class="header header--float">
    <div class="header__brand">
      <router-link to="/">COVSTATS</router-link>
    </div>
    <nav class="header__menu hide-for-mobile">
      <ul class="header__items">
        <li class="header__item">
          <calendar-nav />
        </li>
        <li class="header__item header__item--right header__form">
          <select-country />
        </li>
      </ul>
    </nav>
    <div
      class="header__hamburger hide-for-desktop"
      v-bind:class="{ open: getNavbarStatus }"
      v-on:click="toggleNavbar"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <navbar-menu-mobile />
</template>
<script>
import CalendarNav from "@/modules/calendars/components/CalendarNav.vue";
import SelectCountry from "@/modules/selects/components/SelectCountry.vue";
import NavbarMenuMobile from "@/modules/navbars/components/NavbarMenuMobile.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavbarMain",
  components: {
    CalendarNav,
    SelectCountry,
    NavbarMenuMobile,
  },
  computed: {
    ...mapGetters("navbar", ["getNavbarStatus"]),
  },
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    ...mapActions("navbar", ["toggleNavbar"]),
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  position: relative;
  background-color: $white;
  @include breakpoint-down("md") {
    padding: 24px 30px;
  }
  &--float {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 3;
  }
  &::after {
    content: "";
    height: 1px;
    display: inline-block;
    width: calc(100% - 96px);
    background-color: $lightGrey;
    position: absolute;
    bottom: 0;
  }
  &__brand {
    font-weight: bold;
    font-size: $font-lg;
    color: $richBlack;
    margin-right: 48px;

    & > a {
      font-weight: bold;
      font-size: $font-lg;
      color: $richBlack;
    }
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__menu {
    margin-left: auto;
    @include breakpoint-down("md") {
      display: none;
    }
  }
  &__item {
    color: $grey;
    font-size: $font-md;
    margin-right: 48px;
    padding-left: 24px;
    position: relative;
    flex: 1 1 auto;
    &:first-of-type {
      padding-left: 0;
    }
    &::after {
      content: "";
      position: absolute;
      right: -48px;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 42px;
      display: inline-block;
      background-color: $lightGrey;
    }
    &:last-of-type {
      margin-right: 0;
    }
    & > a {
      color: $grey;
      font-size: $font-md;
    }

    &--right {
      margin-left: auto;
    }
  }
  &__form {
    .v-select {
      min-width: 250px;
    }
  }

  &__hamburger {
    width: 30px;
    height: 30px;
    position: relative;
    transition: 0.1s;
    cursor: pointer;
    display: inline-block;

    &:hover {
      span {
        transform: scale(1.2);
        transition: 350ms cubic-bezier(0.8, 0.5, 0.2, 1.4);
      }
    }

    span {
      width: 5px;
      height: 5px;
      background-color: $richBlack;
      display: block;
      border-radius: 50%;
      position: absolute;

      &:nth-child(1) {
        left: 0;
        top: 0;
      }
      &:nth-child(2) {
        left: 12px;
        top: 0;
      }
      &:nth-child(3) {
        right: 0;
        top: 0;
      }
      &:nth-child(4) {
        left: 0;
        top: 12px;
      }
      &:nth-child(5) {
        position: absolute;
        left: 12px;
        top: 12px;
      }
      &:nth-child(6) {
        right: 0px;
        top: 12px;
      }
      &:nth-child(7) {
        left: 0px;
        bottom: 0px;
      }
      &:nth-child(8) {
        position: absolute;
        left: 12px;
        bottom: 0px;
      }
      &:nth-child(9) {
        right: 0px;
        bottom: 0px;
      }
    }

    &.open {
      transform: rotate(180deg);
      cursor: pointer;
      transition: 0.2s cubic-bezier(0.8, 0.5, 0.2, 1.4);

      span {
        border-radius: 50%;
        transition-delay: 200ms;
        transition: 0.2s cubic-bezier(0.8, 0.5, 0.2, 1.4);
        &:nth-child(2) {
          left: 6px;
          top: 6px;
        }
        &:nth-child(4) {
          left: 6px;
          top: 18px;
        }
        &:nth-child(6) {
          right: 6px;
          top: 6px;
        }
        &:nth-child(8) {
          left: 18px;
          bottom: 6px;
        }
      }
    }
  }
}
</style>