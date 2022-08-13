<template>
  <div class="page">
    <div class="header-container">
      <h1>Farmer’s Market</h1>
      <PatternTop class="header-container__bottom" />
    </div>
    <div class="page__container">
      <FiltersCatalog
        v-if="!isMobile"
        ref="filterCatalog"
        :categories="categories"
        :query="startQuery"
        @reset="handleReset"
        @apply="handleApplyFilter"
        @changeCity="handleChangeCity"
      ></FiltersCatalog>
      <FiltersCatalogMobile
        v-else
        ref="filterCatalogMobile"
        :categories="categories"
        :query="startQuery"
        @reset="handleReset"
        @apply="handleApplyFilter"
        @changeCity="handleChangeCity"
      ></FiltersCatalogMobile>
      <div class="page__container__right">
        <div
          v-if="products.length > 0 || loading"
          class="page__container__results"
        >
          <div class="page__container__lists">
            <p>{{ countItems }} listings</p>
            <DropdownSort
              v-if="!isMobile"
              v-model="sort"
              :variants="sortOptions"
              @input="changeSort"
            ></DropdownSort>
            <div v-else class="page__container__reset" @click="handleReset">
              Reset Filters
            </div>
          </div>
          <CatalogList :loading="loading" :items="products"></CatalogList>
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
import FiltersCatalogMobile from "../components/Page/catalog/FiltersCatalogMobile";

export default {
  name: "CatalogPage",
  components: {
    FiltersCatalogMobile,
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
      countItems: 0,
      loading: false,
      startQuery: {},
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
    isMobile() {
      return this.$store.getters["isMobile"];
    },
  },
  async mounted() {
    this.loading = true;
    this.$store.dispatch("categories/getCategories").then(() => {
      if (this.$route.query) {
        this.startQuery = this.$route.query;
      }
    });
    const resp = await this.$store.dispatch(
      "products/getProducts",
      window.location.search.replace("?", "")
    );
    this.totalPage = resp.totalPage;
    this.countItems = resp.count;
    this.products.push(...resp?.products);
    this.loading = false;
  },
  methods: {
    async handleResetButton() {
      if (this.isMobile) {
        this.$refs.filterCatalogMobile.resetFilters();
      } else {
        this.$refs.filterCatalog.resetFilters();
      }
      await this.handleReset();
    },
    async handleReset() {
      this.query = "";
      this.$router.push(`/catalog`);
      await this.getProducts();
    },
    async handleApplyFilter(val) {
      if (val === this.query) return;

      this.query = val;
      this.$router.push(`/catalog?${val}`);
      await this.getProducts();
    },

    async handleChangeCity(val) {
      this.query = val;
      this.$router.push(`/catalog?${val}`);
      await this.getProducts();
    },
    async changeSort(val) {
      await this.getProducts();
    },
    async getProducts(page = 1) {
      this.loading = true;
      const q = this.query + `&page=${page}` + `&ordering=${this.sort}`;
      const resp = await this.$store.dispatch("products/getProducts", q);
      this.totalPage = resp.totalPage;
      this.countItems = resp.count;
      this.products.splice(0, this.products.length);
      this.products.push(...resp?.products);
      this.loading = false;
    },
    async handleChangePagination() {
      window.scrollTo(0, 0);
      await this.getProducts(this.currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: vw(120px);

  &__container {
    display: flex;
    @include layout-mobile() {
      flex-direction: column;
    }
    &__results {
      width: 100%;
    }
    &__right {
      width: 100%;
      align-items: center;
      display: flex;
      flex-direction: column;
      margin-left: vw(30px);
      z-index: 8;
      @include layout-mobile() {
        margin-left: 0;
      }
    }
    &__reset {
      font-size: mvw(14px);
      line-height: mvw(24px);
      text-decoration-line: underline;
      align-self: center;
      cursor: pointer;
    }
    &__lists {
      margin-bottom: vw(32px);
      display: flex;
      justify-content: space-between;

      @include layout-mobile() {
        margin-bottom: mvw(32px);
        margin-top: mvw(16px);
      }
      p {
        font-size: vw(16px);
        line-height: vw(24px);
        @include layout-mobile() {
          font-size: mvw(16px);
          line-height: mvw(24px);
        }
      }
    }
    &__pagination {
      @include layout-mobile() {
        margin-bottom: mvw(20px);
      }
    }
    &__not {
      margin-top: vw(120px);
      display: flex;
      width: vw(514px);
      align-items: center;
      text-align: center;
      flex-direction: column;
      @include layout-mobile() {
        width: 100%;
        margin-top: mvw(50px);
      }
      p {
        margin-top: vw(16px);
        margin-bottom: vw(32px);
        @include layout-mobile() {
          margin-top: mvw(16px);
          margin-bottom: mvw(32px);
        }
      }
      &-button {
        font-weight: 600;
        height: vw(56px);
        @include layout-mobile() {
          height: mvw(56px);
          width: mvw(270px);
          margin-bottom: mvw(32px);
        }
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
    @include layout-mobile() {
      margin-left: -$padding-left-mobile;
      padding-top: mvw(64px);
      padding-bottom: mvw(40px);
    }
    h1 {
      color: $primary-marigold;
      margin-bottom: vw(32px);
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
      height: vw(35px);
      background-size: cover;
      @include layout-mobile() {
        height: mvw(40px);
        bottom: mvw(-20px);
        transform: scale(1);
      }
    }
  }
}
</style>
