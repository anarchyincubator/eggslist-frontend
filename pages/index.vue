<template>
  <div class="page">
    <div class="header-container">
      <h1>Find Farmers Near You</h1>
      <SearchCity class="header-container__search" />
      <div class="header-container__bottom" />
    </div>
    <CategoriesList :categories="categories"></CategoriesList>
    <PopularList class="page__popular" :products="products"></PopularList>
    <StoriesList class="page__stories" :stories="stories"></StoriesList>
  </div>
</template>

<script>
import SearchCity from "../components/Page/index/SearchCity";
import CategoriesList from "../components/Page/index/CategoriesList";
import PopularList from "../components/Page/index/PopularList";
import StoriesList from "../components/Page/index/StoriesList";
export default {
  components: { StoriesList, PopularList, CategoriesList, SearchCity },
  async asyncData({ store }) {
    const { products } = await store.dispatch("products/getProducts");
    return { products };
  },
  data() {
    return {
      stories: [
        {
          title: "Blog post title goes right here across two lines",
          category: "Category",
          author: {
            firstName: "Name",
          },
        },
        {
          title: "Blog s",
          category: "Category",
          author: {
            firstName: "Name",
          },
        },
        {
          title: "Blog post title goes right here across two lines",
          category: "Category",
          author: {
            firstName: "Name",
          },
        },
      ],
    };
  },
  async fetch() {
    await this.$store.dispatch("categories/getCategories");
  },
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    },
  },
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
    margin-bottom: vw(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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
    &__bottom {
      position: absolute;
      bottom: 0;
      background-image: url("@/assets/images/header_bottom.png");
      width: 100%;
      height: vw(75px);
      background-size: cover;
      @include layout-mobile() {
        height: mvw(70px);
      }
    }
    @include layout-mobile() {
      padding: mvw(70px) $padding-left-mobile 0 $padding-left-mobile;
      margin-left: -$padding-left-mobile;
      background-image: url("@/assets/images/homepage_mob.jpg");
      width: 100%;
    }
  }
  &__popular {
    margin: vw(128px) 0;
  }
  &__stories {
    margin-bottom: vw(128px);
  }
}
</style>
