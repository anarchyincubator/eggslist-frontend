<template>
  <div class="page">
    <div class="header-container">
      <h1>Find Farmers Near You</h1>
      <SearchCity class="header-container__search" />
    </div>
  </div>
</template>

<script>
import SearchCity from "../components/Page/index/SearchCity";
export default {
  components: { SearchCity },
};
</script>
<style lang="scss" scoped>
.page {
  .header-container {
    background-image: url("@/assets/images/homepage.jpg");
    background-size: cover;
    padding-top: vw(150px);
    padding-bottom: vw(80px);
    width: 100vw;
    margin-left: vw(-195px);
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      color: $primary-marigold;
      margin-bottom: vw(32px);
      @include layout-mobile() {
        margin-top: mvw(64px);
        margin-bottom: mvw(16px);
        text-align: center;
      }
    }
    &__search {
      width: vw(822px);
      @include layout-mobile() {
        width: 100%;
      }
    }
    @include layout-mobile() {
      padding: mvw(70px) $padding-left-mobile 0 $padding-left-mobile;
      margin-left: -$padding-left-mobile;
      background-image: url("@/assets/images/homepage_mob.jpg");
      width: 100%;
    }
  }
}
</style>
