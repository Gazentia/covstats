<template>
  <fork-corner />
  <splash-screen />
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script>
import initConfig from "@/common/components/charts/chart-configs.js";
import AppLayout from "@/layouts/AppLayout.vue";
import SplashScreen from "@/modules/splash-screen/components/splash-screen.vue";
import ForkCorner from "@/modules/github/components/ForkCorner.vue";

import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    AppLayout,
    SplashScreen,
    ForkCorner,
  },
  methods: {
    ...mapActions("covid-statistics", ["initData"]),
  },
  async mounted() {
    initConfig();
    await this.initData();
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  line-height: 1;
}

html,
body {
  height: 100%;
}

body {
  background-color: $white;
}

*::-webkit {
  &-scrollbar {
    width: 10px;
    height: 10px;
  }
  &-scrollbar-track {
    background-color: $lightGrey;
    transition: all 200ms ease-in-out;
  }
  &-scrollbar-thumb {
    border-radius: 100px;
    background-color: rgba($grey, 0.4);
    transition: all 200ms ease-in-out;
    &:hover {
      background-color: rgba($grey, 0.8);
    }
  }
}
</style>
