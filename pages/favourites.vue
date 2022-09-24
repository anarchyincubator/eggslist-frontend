<template>
  <div class="page">
    <div class="header-container">
      <h1>Favourite Farmers</h1>
      <PatternTop class="header-container__bottom" />
    </div>
    <div>
      <div v-if="!loading" class="page__container">
        <FavouriteCard
          v-for="(i, index) in users"
          :key="index"
          :seller="i"
          class="page__container__item"
        />
      </div>
      <div v-else class="page__container">
        <SkeletonFavouriteCard
          v-for="i in 3"
          :key="i"
          class="page__container__item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PatternTop from "../components/Page/index/PatternTop";
import FavouriteCard from "../components/favourites/FavouriteCard";
import SkeletonFavouriteCard from "../components/favourites/SkeletonFavouriteCard";
export default {
  name: "FavouritesPage",
  components: { SkeletonFavouriteCard, FavouriteCard, PatternTop },
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  async mounted() {
    const users = await this.$store.dispatch("user/getFavourites");
    this.users = [...users];
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 7.5rem;
  .header-container {
    background-color: $primary-black;
    padding-top: 10.5625rem;
    padding-bottom: 5rem;
    width: 100vw;
    margin-left: calc(0rem - $padding-with-width);
    margin-bottom: 3.125rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    @include layout-mobile() {
      margin-left: -$padding-left-mobile;
      padding-top: mvw(64px);
      padding-bottom: mvw(40px);
    }
    h1 {
      color: $primary-marigold;
      margin-bottom: 2rem;
      @include layout-mobile() {
        width: mvw(280px);
        margin-top: mvw(64px);
        margin-bottom: mvw(16px);
        text-align: center;
      }
    }
    &__bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.5rem;
      background-size: cover;
      @include layout-mobile() {
        height: mvw(40px);
        bottom: mvw(-20px);
        width: 101%;
        transform: scale(1);
      }
    }
  }
  &__container {
    display: flex;
    flex-wrap: wrap;
    &__item {
      margin-right: 7.875rem;
      margin-bottom: 4rem;
      &:nth-child(3n) {
        margin-right: 0;
      }
      @include layout-mobile() {
        margin-right: 0;
        width: 100%;
        margin-bottom: mvw(32px);
      }
    }
  }
}
</style>
