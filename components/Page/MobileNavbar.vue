<template>
  <div
    v-scroll-lock="opened"
    class="navbar-container"
    :class="{ 'navbar-container--opened': opened }"
  >
    <div class="navbar-container__top">
      <img src="@/assets/images/icons/logo_dark.svg" @click="handleGoMain" />
      <TheHamburger v-model="opened" />
    </div>
    <div v-if="opened" class="navbar-container-opened">
      <nuxt-link class="ceil menu-1" to="/catalog" @click.native="handleClose">
        Market
      </nuxt-link>
      <nuxt-link class="ceil menu-1" to="/about" @click.native="handleClose">
        About
      </nuxt-link>
      <nuxt-link class="ceil menu-1" to="/stories" @click.native="handleClose">
        Our stories
      </nuxt-link>
      <div
        v-if="!isAuthenticated"
        class="ceil menu-1"
        @click="handleClickLogin"
      >
        Login
      </div>
      <nuxt-link
        v-else
        class="ceil menu-1"
        to="/favorites"
        @click.native="handleClose"
        >Favorite Farmers</nuxt-link
      >
      <div v-if="isAuthenticated" class="navbar-container__line" />
      <div
        v-if="isAuthenticated"
        class="navbar-container__avatar ceil"
        @click="handleProfile"
      >
        <img :src="user.avatar" alt="" />
        <span class="menu-1"> {{ user.firstName }}</span>
      </div>
      <CustomButton
        theme="primary"
        class="navbar-container__button button-2"
        @click="handlePost"
      >
        Post A Listing
      </CustomButton>
      <CustomButton
        v-if="isAuthenticated"
        theme="secondary"
        class="navbar-container__button--bottom button-2"
      >
        Write a Story
      </CustomButton>
      <div v-if="isAuthenticated">
        <ModalConfirmEmail ref="confirm" />
        <ModalEditProfile ref="edit" />
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "../Common/CustomButton.vue";
import TheHamburger from "../Common/TheHamburger.vue";
import ModalConfirmEmail from "./profile/ModalConfirmEmail";
import ModalEditProfile from "./profile/ModalEditProfile";
export default {
  name: "MobileNavbar",
  components: {
    TheHamburger,
    CustomButton,
    ModalConfirmEmail,
    ModalEditProfile,
  },
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    handleClickLogin() {
      this.$store.commit("setAuthComponent", true);
      this.opened = false;
    },
    handleGoMain() {
      this.$router.push("/");
    },
    handleClose() {
      this.opened = false;
    },
    handleProfile() {
      this.$router.push("/profile");
      this.handleClose();
    },
    handlePost() {
      if (!this.user.isEmail) {
        this.$refs.confirm.show();
        return;
      }
      if (!this.user.phone || !this.user.location) {
        this.$refs.edit.show();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$height-top: mvw(60px);
$padding-bottom: mvw(32px);
.ceil {
  width: 100%;
  height: mvw(56px);
  display: flex;
  align-items: center;
}
.navbar-container {
  position: fixed;
  z-index: 50;
  background: $primary-white;
  margin-left: -$padding-left-mobile;
  padding: 0 $padding-left-mobile;
  width: calc(100% - #{$padding-left-mobile} * 2);
  &--opened {
    height: 100%;
  }
  &__top {
    width: 100%;
    display: flex;
    padding: mvw(18px) 0;
    align-items: center;
    img {
      width: mvw(102px);
      margin-right: auto;
    }
  }
  &-opened {
    display: flex;
    height: calc(100% - #{$height-top} - #{$padding-bottom});
    flex-direction: column;
  }
  &__no-auth {
    display: flex;
    flex-direction: column;
  }
  &__button {
    margin-top: auto;
    &--bottom {
      margin-top: mvw(10px);
    }
  }
  &__line {
    border: 1px solid #d5bb91;
    margin: mvw(8px) 0;
  }
  &__avatar {
    display: flex;
    img {
      width: mvw(24px);
      border-radius: 50%;
      height: mvw(24px);
      margin-right: mvw(8px);
    }
  }
}
</style>
