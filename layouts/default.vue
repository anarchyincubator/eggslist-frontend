<template>
  <div class="page-container">
    <TheNavbar v-if="!isMobile" />
    <MobileNavbar v-else />
    <section class="default-layout-root">
      <nuxt />
    </section>
  </div>
</template>
<script>
import TheNavbar from "~/components/page/TheNavbar.vue";
import MobileNavbar from "~/components/page/MobileNavbar.vue";

export default {
  name: "DefaultLayout",
  components: {
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
<style lang="scss" scoped></style>
