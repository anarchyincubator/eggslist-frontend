<template>
  <div class="page">
    <div class="header-container">
      <div class="page__header" @click="handleToBlogs">
        <div class="page__header__button">
          <img src="@/assets/images/icons/arrow-forward.svg" />
        </div>
        <span> All Stories</span>
      </div>
      <div class="header-container__body">
        <div class="header-container__left">
          <h5>{{ blog.category?.name }}</h5>
          <h1>{{ blog.title }}</h1>
          <div class="header-container__sub">
            <h5>By {{ blog.author?.firstName }} {{ blog.author?.lastName }}</h5>
            <div class="header-container__line" />
            <div class="body-2">11 // 22</div>
          </div>
        </div>
        <img
          v-if="blog.image"
          class="header-container__right"
          :src="blog.image"
        />
      </div>
    </div>
    <div class="blog__container">
      <div class="blog__container__body" v-html="blog.body"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPage",
  data() {
    return {
      blog: {},
    };
  },
  mounted() {
    this.getBlog();
  },
  methods: {
    handleToBlogs() {
      this.$router.push("/blogs");
    },
    async getBlog() {
      const slug = this.$route.query["slug"];

      if (!slug) {
        return this.$nuxt.error({ statusCode: 404, message: "err message" });
      }

      const { blog } = await this.$store.dispatch("blog/getBlog", slug);
      this.blog = { ...blog };
    },
  },
};
</script>
<style lang="scss">
.blog {
  &__container {
    &__body {
      display: flex;
      flex-direction: column;
      img {
        width: 53.75rem !important;
        height: 30.375rem !important;
        border-radius: 1.875rem;
        object-fit: cover;
        margin-top: 3rem;
        margin-bottom: 3rem;
      }
      a {
        color: $neutral-30;
        text-decoration: underline;
        &:hover {
          color: $primary-marigold;
        }
      }
      p {
        font-weight: 400;
        font-size: 1.25rem;
        line-height: 2rem;
        margin-top: 2rem;
      }
      h5 {
        margin-top: 2rem;
      }
      h2 {
        margin-top: 2rem;
      }
      br {
        margin: 1rem 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.page {
  padding-bottom: 7.5rem;

  .blog__container {
    display: flex;
    flex-direction: column;
    width: 53.125rem;
    margin: 0 auto;
  }
  &__header {
    display: flex;
    margin-bottom: 3rem;
    align-items: center;
    margin-right: auto;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 2rem;
      border: 1.5px solid $primary-marigold;
      border-radius: 50%;
      height: 2rem;
      img {
        width: 1rem;
        height: 1rem;
        transform: rotate(180deg);
        @include layout-mobile() {
          width: mvw(16px);
          height: mvw(16px);
        }
      }
      @include layout-mobile() {
        width: mvw(32px);
        height: mvw(32px);
      }
    }
    span {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
      margin-left: 0.5rem;
      @include layout-mobile() {
        font-size: mvw(16px);
        line-height: mvw(24px);
        margin-left: mvw(8px);
      }
    }
    @include layout-mobile() {
      margin-bottom: mvw(38px);
    }
  }
  .header-container {
    background-color: $primary-white;
    width: 100vw;
    box-sizing: border-box;
    margin-left: calc(0rem - $padding-with-width);
    margin-bottom: 3.125rem;
    padding: 10.5625rem $padding-with-width 0;
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
    &__sub {
      display: flex;
      align-items: center;
    }
    &__line {
      height: 1.5rem;
      margin: 0 0.75rem;
      width: 1px;
      background-color: $primary-black;
    }
    h1 {
      color: $primary-black;
      margin-bottom: 2rem;
      margin-top: 1.5rem;
      width: 39.375rem;
      @include layout-mobile() {
        width: auto;
        margin-top: mvw(64px);
        margin-bottom: mvw(16px);
      }
    }
  }
}
.header-container {
  &__body {
    display: flex;
    width: 100%;
  }
  &__right {
    width: 44.625rem;
    height: 29.3125rem;
    object-fit: cover;
    margin-left: 8.625rem;
    margin-top: -5rem;
  }
}
</style>
