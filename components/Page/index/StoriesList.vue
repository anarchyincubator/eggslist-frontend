<template>
  <div class="stories">
    <div class="stories__top">
      <h2>Featured Stories</h2>
      <nuxt-link to="/">View All Listings</nuxt-link>
    </div>
    <div class="list">
      <BlogItem
        v-for="(story, index) in stories"
        :key="index"
        :title="story.title"
        class="list__item"
        :category="story.category"
        :background="story.image"
        :author-config="story.author"
      ></BlogItem>
    </div>
  </div>
</template>

<script>
import BlogItem from "../../Common/BlogItem";
export default {
  name: "StoriesList",
  components: { BlogItem },
  props: {
    stories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.stories {
  &__top {
    display: flex;
    align-items: baseline;
    margin-bottom: vw(48px);
    h2 {
      margin-right: auto;
    }
    a {
      font-size: vw(16px);
      line-height: vw(24px);
      padding-bottom: vw(1px);
      font-weight: 600;
      border-bottom: 2px solid $primary-marigold;
      height: min-content;
      &:hover {
        opacity: 0.75;
      }
      @include layout-mobile() {
        font-size: mvw(16px);
        line-height: mvw(24px);
        padding-bottom: mvw(1px);
        margin-top: mvw(16px);
      }
    }
    @include layout-mobile() {
      flex-direction: column;
      margin-bottom: mvw(32px);
    }
  }
}
.list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  @include layout-mobile() {
    flex-direction: column;
  }
  &__item {
    margin-right: vw(30px);
    &:nth-child(3) {
      margin-right: 0;
    }
    @include layout-mobile() {
      margin: 0 0 mvw(48px) 0;
    }
  }
}
</style>
