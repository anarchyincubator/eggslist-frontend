<template>
  <div class="page-container">
    <NavBar v-if="!isMobile" />
    <MobileNavbar v-else />
    <section class="default-layout-root">
      <nuxt />
    </section>
  </div>
</template>
<script>
import NavBar from "@/components/page/Navbar.vue";
import MobileNavbar from "@/components/page/MobileNavbar.vue";

export default {
  name: "DefaultLayout",
  components: {
    NavBar,
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
