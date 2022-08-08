<template>
  <div class="category-container">
    <div
      :class="{ 'category-container__header--select': isSelect }"
      class="category-container__header"
    >
      <img
        v-if="isSelect"
        class="category-container__icon"
        src="@/assets/images/icons/check.svg"
      />
      <p>{{ category.name }}</p>
      <div
        class="category-container__header--arrow"
        :class="{ 'category-container__header--arrow--down': !isOpened }"
        @click="handleClickButton"
      >
        <img src="@/assets/images/icons/arrow-up.svg" />
      </div>
    </div>
    <div v-if="isOpened" class="category-container__main">
      <CustomCheckbox
        v-for="(sub, index) in category.subs"
        :key="index"
        v-model="selectedData[index]"
        theme="dark"
        class="category-container__main--checkbox"
        @input="handleChangeValue"
      >
        {{ sub.name }}
      </CustomCheckbox>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from "../../Common/CustomCheckbox";
export default {
  name: "TheCategory",
  components: { CustomCheckbox },
  props: {
    value: {
      type: Array,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    openStart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      check: false,
      isOpened: false,
    };
  },
  computed: {
    isSelect() {
      return this.selectedData.filter((item) => item).length > 0;
    },
    selectedData: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    openStart(val) {
      if (val && this.isSelect) {
        this.isOpened = true;
      }
    },
  },
  methods: {
    handleClickButton() {
      this.isOpened = !this.isOpened;
    },
    handleChangeValue() {
      this.$emit("input", this.selectedData);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-container {
  width: 100%;
  &__icon {
    position: absolute;
    width: vw(11px);
    top: 50%;
    transform: translateY(-50%);
    left: vw(-16px);
  }
  &__header {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: vw(16px);
      line-height: vw(24px);
      color: $neutral-30;
      font-weight: 500;
    }
    &--select {
      p {
        color: $primary-black;
      }
    }
    &--arrow {
      cursor: pointer;
      width: vw(32px);
      height: vw(32px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $neutral-70;

      &:hover {
        opacity: 0.8;
      }
      img {
        width: vw(10px);
        transition: transform 0.5s;
      }
      &--down {
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
  &__main {
    margin-top: vw(18px);
    &--checkbox {
      margin-bottom: vw(20px);
    }
  }
}
</style>
