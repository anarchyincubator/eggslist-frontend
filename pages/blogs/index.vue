<template>
  <div class="page">
    <div class="header-container">
      <div class="header-container__body">
        <h1>Our Stories</h1>
        <div class="body-1">
          Dive into the world of Brand. Explore insights. And stay up to date
          with product and company news.
        </div>
      </div>
      <PatternTop class="header-container__bottom" />
    </div>
    <div class="page__container">
      <div class="page__container__header">
        <div class="page__container__filters">
          <BlogCategory
            key-tab="all"
            title="All"
            :is-active="true"
          ></BlogCategory>
        </div>
        <SearchCommon
          v-model="searchInput"
          class="page__container__search"
          placeholder="Search"
          @enter="loadQueryBlogs"
        ></SearchCommon>
      </div>
      <BlogsList
        :blogs="blogs"
        :loading="loadingBlogs"
        :is-complete="completeLoader"
        @loadMore="loadMoreBlogs"
      ></BlogsList>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import searchIcon from "../../assets/images/icons/search.svg";
import PatternTop from "../../components/Page/index/PatternTop";
import BlogsList from "../../components/Blogs/BlogsList";
import SearchCommon from "../../components/Common/SearchCommon";
import BlogCategory from "../../components/Blogs/BlogCategory";
export default {
  name: "BlogsPage",
  components: {
    BlogCategory,
    SearchCommon,
    BlogsList,
    PatternTop,
  },
  data() {
    return {
      blogs: [],
      loadingBlogs: true,
      completeLoader: false,
      searchInput: "",
      page: 1,
      searchIcon,
    };
  },
  watch: {
    searchInput(val) {
      this.loadDebounceQueryBlogs();
    },
  },
  mounted() {
    this.$store
      .dispatch("blog/getBlogs", { page: this.page })
      .then(({ blogs }) => {
        this.blogs.push(...blogs);
        this.loadingBlogs = false;
      });
  },
  methods: {
    loadQueryBlogs() {
      this.loadingBlogs = true;
      this.page = 1;
      this.$store
        .dispatch("blog/getBlogs", {
          page: this.page,
          search: this.searchInput.trim().toLowerCase(),
        })
        .then(({ blogs }) => {
          this.blogs = [...blogs];
          this.loadingBlogs = false;
          this.completeLoader = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    loadDebounceQueryBlogs: debounce(function (val) {
      this.loadQueryBlogs();
    }, 500),
    loadMoreBlogs() {
      this.page += 1;
      this.$store
        .dispatch("blog/getBlogs", {
          page: this.page,
          search: this.searchInput.trim().toLowerCase(),
        })
        .then(({ blogs }) => {
          if (blogs?.length === 0) {
            this.completeLoader = true;
            return;
          }
          this.blogs.push(...blogs);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleEnter() {},
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 7.5rem;

  &__container {
    display: flex;
    flex-direction: column;
    &__header {
      margin-bottom: 4.5rem;
      display: flex;
      @include layout-mobile() {
        margin-bottom: mvw(64px);
      }
    }
    &__search {
      width: 19.125rem;
      margin-left: auto;
      @include layout-mobile() {
        width: 100%;
      }
    }
    &__filters {
      @include layout-mobile() {
        display: none;
      }
    }
  }
  .header-container {
    background-color: $primary-black;
    width: 100vw;
    box-sizing: border-box;
    margin-left: calc(0rem - $padding-with-width);
    margin-bottom: 3.125rem;
    padding: 10.5625rem $padding-with-width 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    @include layout-mobile() {
      margin-left: -$padding-left-mobile;
      padding: mvw(64px) $padding-left-mobile mvw(40px) $padding-left-mobile;
    }
    &__body {
      display: flex;
      @include layout-mobile() {
        flex-direction: column;
      }
      .body-1 {
        color: $primary-white;
        width: 39.375rem;
        @include layout-mobile() {
          width: auto;
        }
      }
    }
    h1 {
      color: $primary-marigold;
      margin-bottom: 2rem;
      width: 39.375rem;
      @include layout-mobile() {
        width: auto;
        margin-top: mvw(64px);
        margin-bottom: mvw(16px);
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
}
</style>
