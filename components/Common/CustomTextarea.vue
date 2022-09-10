<template>
  <textarea
    v-model="inputData"
    placeholder="Lorem ipsum dolor sit amet."
    class="textarea"
  ></textarea>
</template>

<script>
export default {
  name: "CustomTextarea",
  props: {
    value: {
      type: null,
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
textarea {
  border: 1px solid $primary-white;
  border-radius: 0.75rem;
  padding: 0.75rem;
  width: 100% !important;
  height: 15rem;
  box-sizing: border-box;
  color: $primary-black;
  border: 1px solid $neutral-70;
  background-color: $primary-white;
  resize: none;
  @include layout-mobile() {
    font-size: mvw(16px);
  }
  &:focus {
    outline: 0 !important;
    outline-offset: 0 !important;
    background: $primary-white;
    border: 1.5px solid $primary-marigold;
    @include layout-mobile() {
      border: 1px solid $primary-marigold;
    }
  }
  &::placeholder {
    color: $neutral-45;
    @include layout-mobile() {
      font-size: mvw(14px);
    }
  }
}
</style>
