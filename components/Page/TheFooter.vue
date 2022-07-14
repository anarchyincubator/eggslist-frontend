<template>
  <footer class="footer">
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
export default {
  name: "TheFooter",
  methods: {
    handleShareClick(type) {},
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: $primary-black;
  width: 100%;
  margin-left: -$padding-left;
  padding: vw(52px) $padding-left vw(80px) $padding-left;
  color: $primary-cream;
  display: flex;
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
