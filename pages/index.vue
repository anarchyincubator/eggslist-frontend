<template>
  <div class="page">
    <div class="header-container">
      <h1>Find Farmers Near You</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.page {
  .header-container {
    background-image: url("@/assets/images/homepage.jpg");
    background-size: cover;
    padding-top: vw(150px);
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
        text-align: center;
      }
    }
    @include layout-mobile() {
      padding: mvw(60px) $padding-left-mobile 0 $padding-left-mobile;
      margin-left: -$padding-left-mobile;
      width: 100%;
    }
  }
}
</style>
