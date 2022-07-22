<template>
  <footer class="footer">
    <div v-if="isAdditive" class="footer__additive">
      <img src="@/assets/images/footer_up.png" class="footer__additive--back" />
      <FooterQuotes :quotes="quotes"></FooterQuotes>
      <div v-if="isNonAuth" class="footer__additive__join">
        <div>
          <h2>Join The Movement!</h2>
          <div class="body-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
          </div>
        </div>
        <CustomButton class="footer__additive__join--button" theme="primary">
          Get Started
          <img slot="add" src="@/assets/images/icons/arrow-forward.svg" />
        </CustomButton>
      </div>
    </div>
    <div class="footer__top">
      <img class="footer__logo" src="@/assets/images/icons/logo.svg" />
      <div class="footer__top-center">
        <div class="footer__top-center--first">
          <p>Market</p>
          <p>About</p>
          <p>Our stories</p>
        </div>
        <div class="footer__top-center--second">
          <p>Account</p>
          <p>Contact us</p>
        </div>
      </div>
      <div class="footer__top-icons">
        <div class="footer__top--icon">
          <img
            src="@/assets/images/icons/social-fb.svg"
            @click="handleShareClick"
          />
        </div>
        <div class="footer__top--icon">
          <img
            src="@/assets/images/icons/social-tw.svg"
            @click="handleShareClick"
          />
        </div>
        <div class="footer__top--icon">
          <img
            src="@/assets/images/icons/social-inst.svg"
            @click="handleShareClick"
          />
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2022 Eggslist. All rights reserved.</span>
      <div class="footer__bottom-right">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  </footer>
</template>

<script>
import CustomButton from "../Common/CustomButton";
import FooterQuotes from "./index/FooterQuotes";
export default {
  name: "TheFooter",
  components: {
    CustomButton,
    FooterQuotes,
  },
  props: {
    isNonAuth: {
      type: Boolean,
      default: false,
    },
    isAdditive: {
      type: Boolean,
      default: false,
    },
    quotes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleShareClick(type) {},
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: $primary-black;
  width: 100%;
  position: relative;
  margin-left: -$padding-left;
  padding: vw(52px) $padding-left vw(80px) $padding-left;
  color: $primary-cream;
  display: flex;
  z-index: 5;
  flex-direction: column;
  &__logo {
    width: vw(120px);
    margin-right: vw(320px);
    cursor: pointer;
    @include layout-mobile() {
      width: mvw(120px);
      margin: 0;
      margin-bottom: mvw(48px);
    }
  }
  &__additive {
    &--back {
      height: vw(175px);
      margin-left: -$padding-left;
      width: 100%;
      position: absolute;
      top: vw(-145px);
      z-index: 5;
      @include layout-mobile() {
        height: mvw(70px);
        top: mvw(-65px);
        margin-left: -$padding-left-mobile;
      }
    }
    &__join {
      box-sizing: border-box;
      color: $primary-black;
      width: 100%;
      background-image: url("@/assets/images/pattern_white.jpg");
      background-size: cover;
      border-radius: vw(12px);
      padding: vw(70px);
      display: flex;
      align-items: center;
      margin-bottom: vw(200px);
      .body-1 {
        width: vw(850px);
        margin-top: vw(32px);
        @include layout-mobile() {
          width: 100%;
          margin-top: mvw(16px);
        }
      }
      &--button {
        height: vw(56px);
        display: flex;
        font-weight: 600;
        margin-left: auto;
        span {
          display: flex;
        }
        img {
          margin-left: vw(12px);
          align-items: center;
          width: vw(16px);
        }
        @include layout-mobile() {
          height: mvw(56px);
          width: 100%;
          font-size: mvw(16px);
          margin-top: mvw(24px);
          padding: 0;
          img {
            margin-left: mvw(12px);
            width: mvw(16px);
          }
        }
      }
      @include layout-mobile() {
        flex-direction: column;
        padding: mvw(30px) mvw(24px);
        text-align: center;
        border-radius: mvw(12px);
        margin-bottom: mvw(150px);
      }
    }
  }
  &__top {
    display: flex;
    align-items: flex-start;
    @include layout-mobile() {
      flex-direction: column;
    }
    &-center {
      display: flex;
      margin-right: auto;
      p {
        margin-bottom: vw(24px);
        font-size: vw(14px);
        line-height: vw(16px);
        font-weight: 600;
        @include layout-mobile() {
          font-size: mvw(14px);
          line-height: mvw(16px);
          margin-bottom: mvw(24px);
        }
      }
      &--first {
        margin-right: vw(220px);
        @include layout-mobile() {
          margin-right: mvw(50px);
        }
      }
    }
    &-icons {
      display: flex;
      @include layout-mobile() {
        margin-top: mvw(30px);
      }
    }
    &--icon {
      border: 1.5px solid $primary-marigold;
      width: vw(48px);
      height: vw(48px);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      margin-right: vw(16px);
      &:hover {
        opacity: 0.8;
      }
      img {
        height: vw(18px);
        @include layout-mobile() {
          height: mvw(18px);
        }
      }
      @include layout-mobile() {
        width: mvw(48px);
        height: mvw(48px);
        margin-right: mvw(16px);
      }
    }
  }
  &__bottom {
    margin: vw(80px) auto 0 auto;
    display: flex;
    span {
      font-size: vw(12px);
      line-height: vw(16px);
      margin-right: vw(15px);
      @include layout-mobile() {
        font-size: mvw(12px);
        line-height: mvw(16px);
        margin-right: 0;
        margin-bottom: mvw(16px);
      }
    }
    &-right {
      display: flex;
      @include layout-mobile() {
        flex-direction: column;
      }
    }
    @include layout-mobile() {
      flex-direction: column-reverse;
      margin: mvw(50px) 0 0 0;
    }
  }
  @include layout-mobile() {
    margin-left: -$padding-left-mobile;
    padding: mvw(43px) $padding-left-mobile mvw(64px) $padding-left-mobile;
  }
}
</style>
