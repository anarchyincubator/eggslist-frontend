<template>
  <header class="navbar">
    <nuxt-link class="navbar__logo" to="/">
      <img alt="logo" src="@/assets/images/icons/logo.svg" />
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
          <img src="@/assets/images/avatar_mock.png" alt="" />
        </div>
      </div>
      <CustomButton theme="primary" class="button-2">
        Post A Listing</CustomButton
      >
    </div>
  </header>
</template>

<script>
import CustomButton from "~/components/Common/CustomButton.vue";

export default {
  name: "NavBar",
  components: {
    CustomButton,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    handleClickLogin() {
      this.$store.dispatch("auth/setToken", "3213131");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-top: vw(18px);
  width: calc(100% - #{$padding-left} * 2);
  display: flex;
  position: fixed;
  z-index: 500;
  align-items: center;

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
    color: $primary-cream;
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
      color: $primary-cream;
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
        cursor: pointer;
        object-fit: contain;
        width: vw(32px);
        height: vw(32px);
      }
    }
  }
}
</style>
