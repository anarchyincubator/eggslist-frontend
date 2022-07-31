<template>
  <div class="reset">
    <h1>Reset Your Password</h1>
    <div v-if="sent" class="reset__sent body-1">
      Your Eggslist Password has been changed.
      <a @click="handleSign"> Sign In</a>
    </div>
    <div v-else class="reset__form">
      <custom-input
        v-model="password"
        type="password"
        class="reset__form--password"
        tabindex="1"
        :is-in-valid="Boolean(errorPassword)"
        :error-text="errorPassword"
        @focus="handleFocusPassword"
      >
        <label slot="label">New Password<strong>*</strong></label>
      </custom-input>
      <custom-input
        v-model="passwordRepeat"
        type="password"
        class="reset__form--password"
        tabindex="1"
        @focus="handleFocusPasswordRepeat"
      >
        <label slot="label">Confirm Password<strong>*</strong></label>
      </custom-input>
      <custom-button
        class="reset__form--button"
        tab-index="2"
        theme="primary"
        :is-loading="loading"
        @click="submitReset"
        >Submit</custom-button
      >
    </div>
  </div>
</template>

<script>
import visibilityIcon from "@/assets/images/icons/visibility.svg";
import CustomInput from "../../Common/CustomInput";
import CustomButton from "../../Common/CustomButton";
export default {
  name: "ResetView",
  components: {
    CustomInput,
    CustomButton,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      password: "",
      passwordRepeat: "",
      errorPassword: "",
      loading: false,
      sent: false,
      visibilityIcon,
    };
  },
  methods: {
    handleFocusPassword() {
      this.errorPassword = null;
    },
    handleFocusPasswordRepeat() {
      this.errorPassword = null;
    },
    handleSign() {
      this.$router.push("/?login=true");
    },
    validatePasswordField(password) {
      this.errorPassword = null;
      if (!password) {
        this.errorPassword = "The password is required";
        return false;
      }
      if (password.length <= 7) {
        this.errorPassword = "Password must be more than 7 symbols";
        return false;
      }

      this.errorPassword = null;
      return true;
    },
    validateRepeatPasswordField(password) {
      this.errorPassword = null;
      if (password !== this.password) {
        this.errorPassword = "Passwords must be same ";
        return false;
      }

      this.errorPassword = null;
      return true;
    },

    validateLogin() {
      let value = true;

      value &= this.validatePasswordField(this.password);
      value &= this.validateRepeatPasswordField(this.passwordRepeat);

      return value;
    },
    async submitReset() {
      if (!this.validateLogin()) return;
      this.loading = true;
      try {
        await this.$store.dispatch("auth/resetPassword", {
          code: this.code,
          password: this.password,
        });
        this.loading = false;
        this.sent = true;
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      } catch (e) {
        this.loading = false;
        this.errorPassword = e.data?.code;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reset {
  h1 {
    margin-bottom: vw(48px);
    @include layout-mobile() {
      margin-bottom: mvw(32px);
    }
  }
  &__create {
    margin-bottom: vw(48px);
    margin-top: vw(24px);
    display: flex;
    align-items: center;
    @include layout-mobile() {
      flex-direction: column;
      align-items: baseline;
      margin-bottom: mvw(32px);
      margin-top: mvw(24px);
    }
  }
  &__sent {
    margin-top: vw(24px);
    display: flex;
    align-items: center;
    a {
      font-size: vw(14px);
      line-height: vw(24px);
      cursor: pointer;
      font-weight: 600;
      margin-left: vw(4px);
      border-bottom: 2px solid $primary-marigold;
      @include layout-mobile() {
        font-size: mvw(14px);
        line-height: mvw(24px);
        margin: 0;
        margin-top: mvw(12px);
      }
    }
    @include layout-mobile() {
      flex-direction: column;
      align-items: baseline;
      margin-top: mvw(32px);
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
      width: vw(216px);
      font-weight: bold;
      height: vw(56px);
      margin-top: vw(48px);
      @include layout-mobile() {
        height: mvw(48px);
        width: 100%;
        padding: mvw(16px) mvw(10px);
      }
    }
    &--password {
      margin-bottom: vw(32px);
      @include layout-mobile() {
        margin-bottom: mvw(32px);
      }
    }
    strong {
      color: #b00020;
      font-weight: 400;
    }
  }
}
</style>
