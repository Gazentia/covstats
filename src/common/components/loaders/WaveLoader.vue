<template>
  <div class="wave-loader">
    <div class="wave-loader__item"></div>
    <div class="wave-loader__item"></div>
    <div class="wave-loader__item"></div>
    <div class="wave-loader__item"></div>
    <div class="wave-loader__item"></div>
  </div>
</template>
<script>
export default {
  name: "WaveLoader",
};
</script>
<style lang="scss" scoped>
:root {
  --size: 60px;
  --clr1: #bfbfbf;
  --clr2: #f0f0f;
}

.wave-loader {
  --animation-duration: 1000ms;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 0 auto;
  .wave-loader__item {
    height: 40%;
    background-color: var(--clr-spinner);
    width: calc(var(--size) / 13);
    animation: wave-loader var(--animation-duration) ease-in-out infinite;

    @keyframes wave-loader {
      25% {
        transform: scaleY(2);
      }

      50% {
        transform: scaleY(1);
      }
    }
    &:nth-child(1) {
      --clr-spinner: var(--clr1);
    }

    &:nth-child(2) {
      --clr-spinner: var(--clr2);
      animation-delay: calc(var(--animation-duration) / 10);
    }

    &:nth-child(3) {
      --clr-spinner: var(--clr1);
      animation-delay: calc(var(--animation-duration) / 10 * 2);
    }

    &:nth-child(4) {
      --clr-spinner: var(--clr2);
      animation-delay: calc(var(--animation-duration) / 10 * 3);
    }

    &:nth-child(5) {
      --clr-spinner: var(--clr1);
      animation-delay: calc(var(--animation-duration) / 10 * 4);
    }
  }
}
</style>
