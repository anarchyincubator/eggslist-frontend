<template>
  <div class="reg">
    <h2>Create an account</h2>
    <div class="reg__create">
      <span>Already have an account?</span>
      <a @click="handleLoginClick">Log in</a>
    </div>
    <h3 class="reg__h3">Sign up with email</h3>
    <div class="reg__form">
      <custom-input tabindex="0">
        <label slot="label">Email<strong>*</strong></label>
      </custom-input>
      <custom-input type="password" class="reg__form--password" tabindex="1">
        <label slot="label">Password<strong>*</strong></label>
      </custom-input>
      <div class="reg__form--forgot button-2">Forgot Password?</div>
      <custom-button class="reg__form--button" tabindex="2" theme="primary"
        >Create account</custom-button
      >
    </div>
    <div class="reg__border"></div>
    <h3 class="reg__bottom--h3">Log in with social</h3>
    <CustomButton class="reg__bottom--button" theme="secondary">
      <img src="@/assets/images/icons/google.svg" /> Continue with Google
    </CustomButton>
    <CustomButton class="reg__bottom--button" theme="secondary">
      <img src="@/assets/images/icons/fb.svg" /> Continue with Facebook
    </CustomButton>
  </div>
</template>

<script>
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/CustomButton";
export default {
  name: "RegView",
  components: { CustomButton, CustomInput },
  emits: ["loginClick"],
  methods: {
    handleLoginClick() {
      this.$emit("loginClick");
    },
  },
};
</script>

<style lang="scss" scoped>
.reg {
  h2 {
    margin-bottom: vw(16px);
    @include layout-mobile() {
      margin-bottom: mvw(16px);
    }
  }
  &__create {
    margin-bottom: vw(48px);
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      font-size: vw(16px);
      line-height: vw(24px);
      margin-right: vw(8px);
      @include layout-mobile() {
        font-size: mvw(16px);
        line-height: mvw(24px);
        margin: 0 0 mvw(4px);
      }
    }

    a {
      font-weight: 600;
      margin-bottom: vw(8px);
      font-size: vw(16px);
      line-height: vw(24px);
      border-bottom: 2px solid $primary-marigold;
      @include layout-mobile() {
        margin-bottom: 0;
        font-size: mvw(14px);
        line-height: mvw(24px);
      }
    }
    @include layout-mobile() {
      flex-direction: column;
      align-items: baseline;
      margin-bottom: mvw(24px);
    }
  }
  &__h3 {
    margin-bottom: vw(24px);
    @include layout-mobile() {
      font-size: mvw(18px);
      margin-bottom: mvw(16px);
    }
  }
  &__form {
    &--button {
      width: 100%;
      font-weight: bold;
      height: vw(56px);
      @include layout-mobile() {
        height: mvw(48px);
      }
    }
    &--password {
      margin: vw(24px) 0 vw(16px) 0;
      @include layout-mobile() {
        margin: mvw(20px) 0 mvw(20px) 0;
      }
    }
    &--forgot {
      border-bottom: 2px solid $primary-marigold;
      margin-bottom: vw(48px);
      padding-bottom: vw(4px);
      cursor: pointer;
      width: fit-content;
      @include layout-mobile() {
        margin-bottom: mvw(10px);
        padding-bottom: mvw(4px);
      }
    }
    strong {
      color: #b00020;
      font-weight: 400;
    }
  }
  &__border {
    height: vw(1px);
    background-color: $neutral-70;
    margin: vw(48px) 0;
    @include layout-mobile() {
      margin: mvw(32px) 0;
      height: mvw(1px);
    }
  }
  &__bottom {
    &--h3 {
      margin-bottom: vw(48px);
      @include layout-mobile() {
        margin-bottom: mvw(30px);
      }
    }
    &--button {
      width: 100%;
      margin-bottom: vw(16px);
      font-weight: 600;
      display: flex;
      align-items: center;

      img {
        width: vw(18px);
        margin-right: vw(11px);
        @include layout-mobile() {
          margin-right: mvw(11px);
          width: mvw(18px);
        }
      }
      @include layout-mobile() {
        margin-bottom: mvw(10px);
        height: mvw(48px);
        padding: mvw(10px);
      }
    }
  }
}
</style>
