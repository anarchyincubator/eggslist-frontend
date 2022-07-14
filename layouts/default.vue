<template>
  <div class="page-container">
    <client-only>
      <TheNavbar v-if="!isMobile" />
      <MobileNavbar v-else />
    </client-only>
    <section class="default-layout-root">
      <nuxt />
    </section>
    <TheFooter class="page-container__footer" />
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
  computed: {
    isMobile() {
      return this.$store.getters.isMobile;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &__footer {
    margin-top: auto;
  }
}
</style>
