<template>
  <nav
    class="mheader__menu hide-for-desktop"
    v-bind:class="{ open: getNavbarStatus }"
  >
    <ul class="mheader__items">
      <li class="mheader__item">
        <calendar-mobile-nav />
      </li>
      <li class="mheader__item">
        <select-country v-bind:limit="3" />
      </li>
    </ul>
    <ul class="mheader__contacts">
      <li class="mheader__contact">
        <a href="https://github.com/Gazentia/Gazentia"
          ><svg
            role="img"
            fill="#181717"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import CalendarMobileNav from "@/modules/calendars/components/CalendarMobileNav.vue";
import SelectCountry from "@/modules/selects/components/SelectCountry.vue";
import { mapGetters } from "vuex";


export default {
  name: "NavbarMenuMobile",
  components: {
    CalendarMobileNav,
    SelectCountry,
  },
  computed: {
      ...mapGetters("navbar", ["getNavbarStatus"]),
  }
};
</script>
<style lang="scss" scoped>
.mheader {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin: 24px 12px;
  z-index: 3;

  &__menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    left: 0;
    right: 0;
    top: $headerHeight;
    bottom: 0;
    padding: 90px 30px 24px 30px;
    background-image: linear-gradient(90deg, $white 0%, $white 100%);
    background-color: $white;
    transform: translateX(-120%);
    transition: transform 400ms ease-in-out;
    z-index: 3;

    &.open {
      transform: translateX(0);
    }
  }

  &__contacts {
    position: absolute;
    margin-bottom: 60px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__contact {
    margin-right: 16px;

    &.active {
      svg {
        fill: $grey;
      }
    }

    &:last-of-type {
      margin-right: 0;
    }
    svg {
      fill: $richBlack;
      width: 40px;
      transition: all 200ms ease-in-out;
    }
    &:hover {
      svg {
        fill: $grey;
      }
    }
  }

  &__items {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  &__item {
    position: relative;
    margin-bottom: 30px;
    &:last-of-type {
      margin-bottom: 0;
    }
    a {
      outline: none;
      font-size: $font-lg;
      transition: all 200ms ease-in-out;
      font-weight: 700;
    }
    &.active {
      a {
        color: $grey;
        &:active {
          color: $grey;
        }
      }
    }
    &:hover {
      a:hover {
        color: $grey;
      }
    }
  }
}
</style>