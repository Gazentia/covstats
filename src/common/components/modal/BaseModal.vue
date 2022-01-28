<template>
  <teleport to="body">
    <div class="modal">
      <slot name="header" class="modal__header"></slot>
      <slot name="body" class="modal__body"></slot>
      <slot name="footer" class="modal__footer"></slot>
      <div class="modal__dismiss-wrapper">
        <div
          class="modal__dismiss-btn"
          type="button"
          v-on:click="$emit('close-modal')"
        >
          <svg
            class="modal__dismiss-btn--icon"
            stroke-width="8"
            stroke-dashoffset="0"
            stroke-dasharray="0"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <line x1="15" y1="15" x2="85" y2="85" />
            <line x1="85" y1="15" x2="15" y2="85" />
          </svg>
        </div>
      </div>
    </div>
    <div class="modal--backdrop"></div>
  </teleport>
</template>
<script>
export default {
  name: "baseModal",
  emits: ["close-modal"],
};
</script>
<style lang="scss">
.modal {
  position: fixed;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $white;
  width: 100%;
  max-width: 500px;
  @include breakpoint-down("md") {
    width: calc(100% - 20px);
  }
  //border: 1px solid rgba($grey, 0.5);
  box-shadow: 0 0 5px rgba($richBlack, 0.25);
  border-radius: 20px;
  border-radius: 20px;
  padding: 20px;

  &__header {
    color: $richBlack;
    font-size: $font-md;
    font-weight: normal;
    margin-bottom: 24px;
  }
  &__body {
    margin-bottom: 24px;
  }
  &--backdrop {
    background-color: rgba($richBlack, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }

  &__dismiss-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &__dismiss-btn {
    border-radius: 50%;
    box-shadow: 0 0 5px 0 $grey;
    background-color: $richBlack;
    border-radius: 50%;
    padding: 8px 10px;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    @include breakpoint-down("md") {
      padding: 6px 8px;
    }

    &--icon {
      transform: rotate(180deg);
      fill: $white;
      stroke: $white;
      width: 25px;
      transition: transform 250ms ease-in-out;
      @include breakpoint-down("md") {
        width: 20px;
      }
    }

    &:hover {
      box-shadow: 0 0 5px 5px $grey;
      .modal__dismiss-btn--icon {
        fill: $white;
        stroke: $white;
      }
    }
  }
}
</style>