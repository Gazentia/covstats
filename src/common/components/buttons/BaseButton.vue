<template>
  <button class="btn" v-bind:class="setTypeBtn()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["btnType"],
  methods: {
    setTypeBtn() {
      let btnClass = "btn--";
      switch (this.btnType) {
        case "primary":
          btnClass = btnClass + "primary";
          break;
        case "danger":
          btnClass = btnClass + "danger";
          break;
        case "success":
          btnClass = btnClass + "success";
          break;
        default:
          btnClass = btnClass + "primary";
      }
      return btnClass;
    },
  },
};
</script>

<style lang="scss">
$btn-border: (
  primary: #656565,
  danger: #ae2012,
  success: #0a9396,
);
$btn-bg: (
  primary: #edeef0,
  danger: #f35f50,
  success: #5fc6c8,
);
$btn-text: #001219;
$btn-text-hover: #ffffff;

@mixin btnBorder($type, $opacity: 1, $reverse: false) {
  @if $reverse == true {
    @if $type == "primary" {
      border: 1px solid rgba(map-get($btn-bg, $type), $opacity);
    } @else if $type == "danger" {
      border: 1px solid rgba(map-get($btn-bg, $type), $opacity);
    } @else if $type == "success" {
      border: 1px solid rgba(map-get($btn-bg, $type), $opacity);
    } @else {
      border: 1px solid rgba(map-get($btn-bg, "primary"), $opacity);
    }
  } @else {
    @if $type == "primary" {
      border: 1px solid rgba(map-get($btn-border, $type), $opacity);
    } @else if $type == "danger" {
      border: 1px solid rgba(map-get($btn-border, $type), $opacity);
    } @else if $type == "success" {
      border: 1px solid rgba(map-get($btn-border, $type), $opacity);
    } @else {
      border: 1px solid rgba(map-get($btn-border, "primary"), $opacity);
    }
  }
}
@mixin btnBg($type, $opacity: 1, $reverse: false) {
  @if $reverse == true {
    @if $type == "primary" {
      background-color: rgba(map-get($btn-border, $type), $opacity);
    } @else if $type == "danger" {
      background-color: rgba(map-get($btn-border, $type), $opacity);
    } @else if $type == "success" {
      background-color: rgba(map-get($btn-border, $type), $opacity);
    } @else {
      background-color: rgba(map-get($btn-border, "primary"), $opacity);
    }
  } @else {
    @if $type == "primary" {
      background-color: rgba(map-get($btn-bg, $type), $opacity);
    } @else if $type == "danger" {
      background-color: rgba(map-get($btn-bg, $type), $opacity);
    } @else if $type == "success" {
      background-color: rgba(map-get($btn-bg, $type), $opacity);
    } @else {
      background-color: rgba(map-get($btn-bg, "primary"), $opacity);
    }
  }
}

.btn {
  display: inline-block;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease-in-out;

  &:disabled,
  .disabled {
    cursor: not-allowed;
    @include btnBg("primary", 0.3, true);
    @include btnBorder("primary", 0.3, true);
    svg {
      & path {
        fill: map-get($btn-border, primary);
      }
    }

    &:hover {
      @include btnBg("primary", 0.3, true);
      @include btnBorder("primary", 0.3, true);

      svg {
        & path {
          fill: map-get($btn-border, primary);
        }
      }
    }
  }

  svg {
    width: 20px;
    height: 20px;
    & path {
      fill: $btn-text;
      transition: all 250ms ease-in-out;
    }
  }

  &:focus {
    outline: none;
  }

  &--primary {
    @include btnBg("primary", 0.2);
    @include btnBorder("primary", 0.2);

    &:hover,
    &.active {
      @include btnBg("primary", 0.8, true);
      @include btnBorder("primary", 0.8, true);
      color: $btn-text-hover;
      svg {
        & path {
          fill: $btn-text-hover;
        }
      }
    }
  }
  &--danger {
    @include btnBg("danger", 0.2);
    @include btnBorder("danger", 0.2);

    &:hover,
    &.active {
      @include btnBg("danger", 0.8, true);
      @include btnBorder("danger", 0.8, true);
      color: $btn-text-hover;
      svg {
        & path {
          fill: $btn-text-hover;
        }
      }
    }
  }
  &--success {
    @include btnBg("success", 0.2);
    @include btnBorder("success", 0.2);

    &:hover,
    &.active {
      @include btnBg("success", 0.8, true);
      @include btnBorder("success", 0.8, true);
      color: $btn-text-hover;
      svg {
        & path {
          fill: $btn-text-hover;
        }
      }
    }
  }
}
</style>
