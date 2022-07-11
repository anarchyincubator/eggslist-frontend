<template>
  <div class="input-container">
    <slot></slot>
    <input
      v-model="inputData"
      class="input-container__input subtitle-1"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputData: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  width: 100%;
  &__input {
    width: 100%;
    border: 2px solid #d5bb91;
    border-radius: vw(12px);
    opacity: 1;
    padding: vw(12px) vw(32px);
    background: $primary-white;
    color: $primary-black;
    box-sizing: border-box;

    &::placeholder {
      color: #605139;
    }

    &:focus {
      outline: 0 !important;
      outline-offset: 0 !important;
      background: $primary-white;
      border: 2px solid $primary-marigold;

      & + label {
        opacity: 0;
      }
    }
    @include layout-mobile() {
      border-radius: mvw(12px);
      padding: mvw(15px) 0 mvw(15px) mvw(47px);
    }
  }
}
</style>
