<template>
  <div class="widget">
    <div class="widget__header">
      <h2 v-if="widgetData.title" class="widget__title">
        {{ widgetData.title }}
      </h2>
      <small v-if="widgetData.subtitle" class="widget__subtitle">{{
        widgetData.subtitle
      }}</small>
    </div>
    <div class="widget__body">
      <div v-bind:class="{ 'widget__body--inline': bodyInline }">
        <slot name="body"></slot>
      </div>
      <slot name="list"></slot>
    </div>
    <div class="widget__footer"><slot name="footer"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    widgetData: {
      type: Object,
      require: true,
    },
    bodyInline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.widget {
  background-color: rgba($white, 0.3);
  border: 1px solid $grey;
  box-shadow: 0 0 5px $grey;
  border-radius: 20px;
  border-radius: 20px;
  padding: 20px;
  &__header {
    margin-bottom: 30px;
  }
  &__title {
    font-size: $font-md;
    margin: 0 0 6px 0;
  }
  &__subtitle {
    color: $grey;
    font-size: $font-sm;
    font-weight: 300;
  }
  &__body {
    &--inline {
      display: flex;
      flex-direction: row;
      justify-content: center;
      @include breakpoint-down("sm") {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
    }
    & > * {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    &-title {
      font-size: $font-sm;
      font-weight: 500;
    }
    &-content {
      font-size: $font-md;
    }
  }
}
</style>
