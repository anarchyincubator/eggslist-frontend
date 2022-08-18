<template>
  <header
    class="navbar"
    :class="{ navbar__scrolled: isUserScrolling || isStatic }"
  >
    <nuxt-link class="navbar__logo" to="/">
      <img alt="logo" :src="logoLink" />
    </nuxt-link>
    <div class="navbar__links">
      <nuxt-link class="navbar__link menu-1" to="/catalog"> Market </nuxt-link>
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
      <CustomButton theme="primary" :is-large="false">
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
  props: {
    isStatic: {
      type: Boolean,
      default: true,
    },
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
      return !this.isUserScrolling && !this.isStatic ? logo : logoDark;
    },
  },
  mounted() {
    if (this.isStatic) return;

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
    }, 50),
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 4rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  margin-left: calc(0rem - $padding-with-width);
  padding: 0 $padding-with-width;
  z-index: 500;
  align-items: center;
  color: $primary-cream;
  transition: background-color 0.25s;
  &__scrolled {
    background-color: $primary-cream;
    color: #282220;
  }
  &__logo {
    width: 7.5rem;
    margin-right: 3rem;
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
    margin-right: 1.875rem;
  }
  &__side {
    display: flex;
    align-items: center;
    &--login {
      margin-right: 1.5rem;
      cursor: pointer;
    }
  }
  &__auth {
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    &__like {
      height: 1.25rem;
      margin-right: 1.625rem;
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
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
