<template>
  <div class="page-container" :class="{ 'page-container__index': isMainPage }">
    <client-only>
      <TheNavbar v-if="!isMobile" />
      <MobileNavbar v-else />
    </client-only>
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

export default {
  name: "DefaultLayout",
  components: {
    TheFooter,
    TheNavbar,
    MobileNavbar,
  },
  transition: {
    mode: "fade-enter",
  },
  data() {
    return {};
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile;
    },
    isMainPage() {
      return this.$route.path === "/";
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
    //background-image: url("@/assets/images/pattern_white_main.jpg");
    // background-size: 80%;
  }
  &__footer {
    margin-top: auto;
  }
}
</style>
