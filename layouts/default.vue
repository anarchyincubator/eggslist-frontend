<template>
  <div class="page-container" :class="{ 'page-container__index': isMainPage }">
    <client-only>
      <TheNavbar v-if="!isMobile" />
      <MobileNavbar v-else />
    </client-only>
    <transition name="fade">
      <AuthComponent v-if="isAuthComponent"></AuthComponent>
    </transition>
    <section class="default-layout-root">
      <nuxt />
      <TheFooter v-if="!isMainPage" class="page-container__footer" />
    </section>
  </div>
</template>
<script>
import TheNavbar from "~/components/Page/TheNavbar.vue";
import MobileNavbar from "~/components/Page/MobileNavbar.vue";
import TheFooter from "../components/Page/TheFooter";
import AuthComponent from "../components/Auth/AuthComponent";

export default {
  name: "DefaultLayout",
  components: {
    AuthComponent,
    TheFooter,
    TheNavbar,
    MobileNavbar,
  },
  transition: {
    mode: "fade-enter",
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile;
    },
    isMainPage() {
      return this.$route.path === "/";
    },
    isAuthComponent() {
      return this.$store.state.authComponentShow;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &__index {
    background-image: url("@/assets/images/noise.jpg");
    background-size: 50%;
  }
  &__footer {
    margin-top: auto;
  }
}
</style>
