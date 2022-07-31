<template>
  <header class="navbar" :class="{ navbar__scrolled: isUserScrolling }">
    <nuxt-link class="navbar__logo" to="/">
      <img alt="logo" :src="logoLink" />
    </nuxt-link>
    <div class="navbar__links">
      <nuxt-link class="navbar__link menu-1" to="/market"> Market </nuxt-link>
      <nuxt-link class="navbar__link menu-1" to="/about"> About </nuxt-link>
      <nuxt-link class="navbar__link menu-1" to="/stories">
        Our stories
      </nuxt-link>
    </div>
    <div class="navbar__side">
      <template v-if="!isAuthenticated">
        <div class="navbar__side--login menu-1" @click="handleClickLogin">
          Log in
        </div>
      </template>
      <div v-else class="navbar__auth">
        <img
          alt="like"
          class="navbar__auth__like"
          src="@/assets/images/icons/like.svg"
        />
        <div class="navbar__auth__avatar">
          <img :src="user.avatar" alt="" />
        </div>
      </div>
      <CustomButton theme="primary" class="button-2">
        Post A Listing</CustomButton
      >
    </div>
  </header>
</template>

<script>
import logo from "@/assets/images/icons/logo.svg";
import logoDark from "@/assets/images/icons/logo_dark.svg";
import throttle from "lodash.throttle";
import CustomButton from "~/components/Common/CustomButton.vue";

export default {
  name: "NavBar",
  components: {
    CustomButton,
  },
  data() {
    return {
      isUserScrolling: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
    logoLink() {
      return !this.isUserScrolling ? logo : logoDark;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleClickLogin() {
      // this.$store.dispatch("auth/setToken", "3213131");
      this.$store.commit("setAuthComponent", true);
    },
    handleScroll: throttle(function (e) {
      this.isUserScrolling = window.scrollY > 0;
    }, 100),
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: vw(64px);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  margin-left: -$padding-left;
  padding: 0 $padding-left;
  z-index: 500;
  align-items: center;
  color: $primary-cream;
  transition: background-color 0.25s;
  &__scrolled {
    background-color: $primary-cream;
    color: #282220;
  }
  &__logo {
    width: vw(120px);
    margin-right: vw(48px);
    display: flex;
    align-items: center;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  &__links {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
  }
  &__link {
    margin-right: vw(30px);
  }
  &__side {
    display: flex;
    align-items: center;
    &--login {
      margin-right: vw(24px);
      cursor: pointer;
    }
  }
  &__auth {
    display: flex;
    align-items: center;
    margin-right: vw(24px);
    &__like {
      height: vw(20px);
      margin-right: vw(26px);
    }
    &__avatar {
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 50%;
      img {
        border-radius: 50%;
        cursor: pointer;
        object-fit: contain;
        width: vw(32px);
        height: vw(32px);
      }
    }
  }
}
</style>
