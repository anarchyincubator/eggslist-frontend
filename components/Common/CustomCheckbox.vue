<template>
  <div class="checkbox-container">
    <label :class="classes">
      <slot />
      <input v-model="inputData" type="checkbox" />
      <span class="checkmark">
        <svg
          v-if="inputData"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.0001 7.78002L1.2201 5.00002L0.273438 5.94002L4.0001 9.66669L12.0001 1.66668L11.0601 0.726685L4.0001 7.78002Z"
            fill="#FEF3E1"
          />
        </svg>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CustomCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "primary",
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
    classes() {
      return ["container", `container-${this.theme}`];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-end;
  position: relative;
  padding-left: vw(25px);
  margin-bottom: vw(13px);
  cursor: pointer;
  font-weight: 500;
  color: $neutral-30;
  line-height: vw(16px);
  font-size: vw(14px);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &-dark {
    color: $primary-black;
  }

  @include layout-mobile() {
    padding-left: mvw(24px);
    margin-bottom: mvw(13px);
    font-size: mvw(12px);
    line-height: mvw(16px);
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: vw(13px);
  width: vw(13px);
  border: 2px solid $neutral-30;
  border-radius: 1px;
  svg {
    position: absolute;
    width: 100%;
    left: 0;
  }

  @include layout-mobile() {
    height: mvw(13px);
    width: mvw(13px);
  }
}

.container:hover input ~ .checkmark {
  opacity: 0.8;
  @include layout-mobile() {
    opacity: 1;
  }
}

.container input:checked ~ .checkmark {
  background-color: $neutral-45;
  border: 2px solid $neutral-45;
}

.container {
  .checkmark {
    border: 2px solid $primary-black;
  }
}
.container input:checked ~ .checkmark {
  background-color: $primary-black;
  border: 2px solid $primary-black;
}
</style>
