<template>
  <div class="page">
    <div class="header-container">
      <h1>Farmer’s Market</h1>
      <PatternTop class="header-container__bottom" />
    </div>
    <div class="page__container">
      <FiltersCatalog
        ref="filterCatalog"
        :categories="categories"
        @reset="handleReset"
        @apply="handleApplyFilter"
      ></FiltersCatalog>
      <div class="page__container__right">
        <div v-if="products.length > 0" class="page__container__results">
          <div class="page__container__lists">
            <p>{{ products.length }} listings</p>
            <DropdownSort v-model="sort" :variants="sortOptions"></DropdownSort>
          </div>
          <CatalogList :items="products"></CatalogList>
          <ThePagination
            v-model="currentPage"
            class="page__container__pagination"
            :pages="totalPage"
            @input="handleChangePagination"
          ></ThePagination>
        </div>
        <div v-else class="page__container__not">
          <h3>No Results</h3>
          <p class="body-1">
            No one has posted any products that match your selection yet. To get
            more results, try changing or removing some filters!
          </p>
          <CustomButton
            class="page__container__not-button"
            theme="primary"
            @click="handleResetButton"
          >
            Reset Filters</CustomButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatternTop from "../components/Page/index/PatternTop";
import FiltersCatalog from "../components/Page/catalog/FiltersCatalog";
import CatalogList from "../components/Page/catalog/CatalogList";
import ThePagination from "../components/Common/ThePagination";
import CustomButton from "../components/Common/CustomButton";
import DropdownSort from "../components/Page/catalog/DropdownSort";

export default {
  name: "CatalogPage",
  components: {
    DropdownSort,
    CustomButton,
    ThePagination,
    CatalogList,
    FiltersCatalog,
    PatternTop,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      sort: "price",
      query: "",
      totalPage: 0,
      sortOptions: [
        { name: "Price up", key: "price" },
        { name: "Price down", key: "-price" },
        { name: "Date down", key: "-date_created" },
        { name: "Date Up", key: "date_created" },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    },
  },
  async mounted() {
    this.$store.dispatch("categories/getCategories");
    const resp = await this.$store.dispatch("products/getProducts");
    this.totalPage = resp.totalPage;
    console.log(resp);
    this.products.push(...resp?.products);
  },
  methods: {
    async handleResetButton() {
      this.$refs.filterCatalog.resetFilters();
      await this.handleReset();
    },
    async handleReset() {
      this.query = "";
      await this.getProducts();
    },
    async handleApplyFilter(val) {
      this.query = val;
      await this.getProducts();
    },
    async getProducts() {
      const q = this.query + `&page=${this.currentPage}`;
      const resp = await this.$store.dispatch("products/getProducts", q);
      this.totalPage = resp.totalPage;
      this.products.splice(0, this.products.length);
      this.products.push(...resp?.products);
      window.scrollTo(0, 0);
    },
    handleChangePagination() {
      this.getProducts();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: vw(120px);

  &__container {
    display: flex;
    &__results {
      width: 100%;
    }
    &__right {
      width: 100%;
      align-items: center;
      display: flex;
      flex-direction: column;
      margin-left: vw(30px);
    }
    &__lists {
      margin-bottom: vw(32px);
      display: flex;
      justify-content: space-between;
      p {
        font-size: vw(16px);
        line-height: vw(24px);
      }
    }
    &__pagination {
    }
    &__not {
      margin-top: vw(120px);
      display: flex;
      width: vw(514px);
      align-items: center;
      text-align: center;
      flex-direction: column;
      p {
        margin-top: vw(16px);
        margin-bottom: vw(32px);
      }
      &-button {
        font-weight: 600;
        height: vw(56px);
      }
    }
  }
  .header-container {
    background-color: $primary-black;
    padding-top: vw(169px);
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
    &__bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: vw(75px);
      background-size: cover;
      @include layout-mobile() {
        height: mvw(60px);
        bottom: mvw(-20px);
        transform: scale(1);
      }
    }
  }
}
</style>
