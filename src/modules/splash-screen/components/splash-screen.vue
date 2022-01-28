<template>
  <div class="splash-screen" v-if="getLoadingStatus">
    <div class="splash-screen__wrapper">
      <div class="splash-screen__brand">COVSTATS</div>
      <div
        class="splash-screen__error"
        v-if="getErrorData.errorTitle || getErrorData.errorMessage"
      >
        {{ getErrorData.errorTitle ? getErrorData.errorTitle + " : " : "" }}
        {{ getErrorData.errorMessage }}
      </div>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SplashScreen",
  computed: {
    ...mapGetters(["getLoadingStatus"]),
    ...mapGetters("errors", ["getErrorData"]),
  },
};
</script>
<style lang="scss" scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  &__brand {
    font-size: $font-xlg;
    font-weight: 500;
    text-align: center;
  }

  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px;
  }

  &__error {
    color: $fireOpal;
    font-weight: 300;
    font-size: $font-sm;
    text-align: center;
  }
}

.lds-ripple {
  display: inline-block;
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid $grey;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>