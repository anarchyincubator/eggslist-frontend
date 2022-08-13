<template>
  <div class="page">
    <div class="header-container">
      <h1>Find Farmers Near You</h1>
      <SearchCity :cities="cities" class="header-container__search" />
      <PatternTop class="header-container__bottom" />
    </div>
    <CategoriesList :categories="categories"></CategoriesList>
    <PopularList class="page__popular" :products="products"></PopularList>
    <StoriesList class="page__stories" :stories="blogs"></StoriesList>
    <TheFooter
      :is-additive="true"
      :is-non-auth="!isAuthenticated"
      :quotes="quotes"
      class="page__footer"
    />
  </div>
</template>

<script>
import TheFooter from "../components/Page/TheFooter";
import SearchCity from "../components/Page/index/SearchCity";
import CategoriesList from "../components/Page/index/CategoriesList";
import PopularList from "../components/Page/index/PopularList";
import StoriesList from "../components/Page/index/StoriesList";
import PatternTop from "../components/Page/index/PatternTop";
export default {
  components: {
    PatternTop,
    StoriesList,
    PopularList,
    CategoriesList,
    SearchCity,
    TheFooter,
  },
  data() {
    return {
      blogs: [],
      products: [],
      quotes: [],
    };
  },
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    },
    cities() {
      return this.$store.getters["cities"];
    },
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  created() {
    if (this.$route.query.login) {
      this.$store.commit("setAuthComponent", true);
    }
  },

  async mounted() {
    this.$store.dispatch("categories/getCategories");
    this.$store.dispatch("blog/getBlogs").then(({ blogs }) => {
      this.blogs.push(...blogs);
    });

    this.$store.dispatch("products/getProductsPopular").then(({ products }) => {
      this.products.push(...products);
    });

    this.$store.dispatch("quotes/getQuotes").then(({ quotes }) => {
      this.quotes.push(...quotes);
    });
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
    margin-bottom: vw(50px);
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
      margin-bottom: vw(75px);
      @include layout-mobile() {
        width: 100%;
      }
    }
    &__bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: vw(35px);
      background-size: cover;
      @include layout-mobile() {
        height: mvw(60px);
        bottom: mvw(-42px);
        width: 101%;
        transform: scale(1);
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
    @include layout-mobile() {
      margin: mvw(64px) 0;
    }
  }
  &__stories {
    margin-bottom: vw(128px);
  }
}
</style>
