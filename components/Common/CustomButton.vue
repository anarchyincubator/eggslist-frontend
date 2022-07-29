<template>
  <component
    :is="type"
    :class="classes"
    :tabindex="tabIndex"
    @click="handleClick"
  >
    <span class="button__text">
      <span v-if="isLoading" class="button__loader" />
      <slot v-else />
    </span>
    <slot name="add"></slot>
  </component>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    tabIndex: {
      type: String,
      default: "-1",
    },
    theme: {
      type: String,
      required: true,
      validator(value) {
        return ["primary", "secondary", "outlined"].includes(value);
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  computed: {
    type() {
      if (this.href) return "a";

      if (this.to) return "router-link";

      return "button";
    },
    classes() {
      return [
        "button",
        `button-${this.theme}`,
        {
          "button-disabled": this.isDisabled || this.isLoading,
        },
      ];
    },
  },
  methods: {
    handleClick(event) {
      if (this.isDisabled) return;

      this.$emit("click", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.75s;

  &__loader {
    display: inline-block;
    width: vw(14px);
    height: vw(14px);

    @include layout-mobile() {
      width: mvw(14px);
      height: mvw(14px);
    }
  }

  &__loader:after {
    content: " ";
    display: block;
    width: vw(18px);
    height: vw(18px);
    border-radius: 50%;
    border: vw(3px) solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: loader-animation 1.2s linear infinite;

    @include layout-mobile() {
      width: mvw(18px);
      height: mvw(18px);
      border-width: mvw(3px);
    }
  }

  &-primary,
  &-secondary,
  &-outlined {
    display: flex;
    justify-content: center;
    padding: vw(10px) vw(20px);
    background: $primary-marigold;
    border: 1.5px solid #282220;
    border-radius: vw(12px);
    text-align: center;
    font-size: vw(16px);

    @include layout-mobile() {
      font-size: mvw(14px);
      width: 100%;
      border-radius: mvw(12px);
      padding: mvw(16px) mvw(90px);
    }

    &:hover {
      background: $secondary-marigold;
    }

    .button__text {
      text-align: center;
      display: flex;
      color: $primary-black;
    }
  }
  &-secondary {
    background: transparent;
    border: 1.5px solid $primary-marigold;
  }
  &-outlined {
    background: transparent;
    border: max(1px, vw(1px)) solid #fef6f4;
  }
  &-disabled {
    pointer-events: none;
    cursor: not-allowed;
    background: #201e1d;
  }
}
@keyframes loader-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
