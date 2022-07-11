<template>
  <div v-click-outside="handleClose" class="search-container">
    <CustomInput
      v-model="inputData"
      :placeholder="placeholder"
      @focus="handleFocus"
    >
      <slot class="search-container__icon" name="icon"></slot>
    </CustomInput>

    <div v-if="isOpened" class="search-container__results">
      <div
        v-for="(ceil, index) in result"
        :key="index"
        class="search-container__results--ceil subtitle-1"
        @click="handleClickCeil(ceil)"
      >
        {{ ceil }}
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/Common/CustomInput.vue";
export default {
  name: "SearchComponent",
  components: {
    CustomInput,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    result: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpened: false,
      inputData: "",
    };
  },
  computed: {
    searchValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    result: {
      handler(ne, ol) {
        this.isOpened = true;
      },
      deep: true,
    },
    inputData(val) {
      if (this.searchValue === val) return;

      this.$emit("changeInput", val);
    },
    searchValue(val) {
      if (val === this.inputData) return;

      this.inputData = val;
    },
  },
  methods: {
    handleFocus() {
      if (this.result?.length > 0) this.isOpened = true;
    },
    handleClose() {
      this.isOpened = false;
    },
    handleClickCeil(ceil) {
      this.searchValue = ceil;
      this.inputData = ceil;
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  width: 100%;
  position: relative;

  &__results {
    z-index: 30;
    position: relative;
    width: 100%;
    height: vw(176px);
    top: calc(100% + 8px);
    position: absolute;
    background: $primary-white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: scroll;
    &--ceil {
      width: 100%;
      height: vw(40px);
      padding: vw(8px) vw(12px);
      box-sizing: border-box;
      transition: 0.25s background-color;
      cursor: pointer;

      &:hover {
        background-color: #d5bb91;
      }
      @include layout-mobile() {
        height: mvw(40px);
        padding: mvw(8px) mvw(12px);
      }
    }
    @include layout-mobile() {
      height: mvw(176px);
    }
  }
}
</style>
