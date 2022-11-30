<template>
  <div class="blog-item" @click="handleToSlug">
    <div :style="backgroundStyle" class="blog-item__background" />
    <h6 class="blog-item__category" @click="handleCategory">
      {{ blog.category.name }}
    </h6>
    <h3>{{ blog.title }}</h3>
    <h6 @click="handleTitle">By {{ fullName }}</h6>
  </div>
</template>

<script>
export default {
  name: "BlogsItem",
  props: {
    blog: {
      required: true,
      type: Object,
    },
  },
  computed: {
    backgroundStyle() {
      return {
        "background-image": `url(${this.background})`,
      };
    },
    background() {
      return this.blog?.image;
    },
    fullName() {
      return `${this.blog.author?.firstName} ${this.blog.author?.lastName}`;
    },
  },
  methods: {
    handleToSlug() {
      this.$router.push(`/blogs/blog?slug=${this.blog.slug}`);
    },
    handleCategory(e) {
      e.stopPropagation();
      this.$router.push(`/blogs/filter?category=${this.blog.category?.slug}`);
    },
    handleTitle(e) {
      e.stopPropagation();
      this.$router.push(`/blogs/filter?user-id=${this.blog.author?.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  display: flex;
  width: 25.625rem;
  height: 26.875rem;
  flex-direction: column;
  cursor: pointer;
  @include layout-mobile() {
    width: 100%;
    height: auto;
  }
  &__background {
    width: 100%;
    border-radius: 1.875rem;
    height: 16.875rem;
    background-size: cover;
    @include layout-mobile() {
      width: 100%;
      border-radius: mvw(15px);
      height: mvw(184px);
    }
  }
  &__category {
    margin: 1rem 0;
    width: min-content;
    @include layout-mobile() {
      margin-top: mvw(16px);
      margin-bottom: mvw(8px);
    }
  }
  h3 {
    margin-bottom: auto;
    @include layout-mobile() {
      margin-bottom: mvw(16px);
    }
  }
  h6 {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
