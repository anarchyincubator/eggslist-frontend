<template>
  <div class="blog-item">
    <div class="blog-item__background" :style="backgroundStyle"></div>
    <h6>{{ category }}</h6>
    <h3>{{ title }}</h3>
    <div v-if="authorConfig" class="blog-item__author">
      <span>By {{ authorConfig.firstName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    authorConfig: {
      type: Object,
      default: null,
    },
  },
  computed: {
    backgroundStyle() {
      return {
        "background-image": `url(${this.background})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  h6 {
    font-size: vw(14px);
    font-weight: 500;
    line-height: vw(16px);
    margin-bottom: vw(16px);
    @include layout-mobile() {
      font-size: mvw(16px);
      line-height: mvw(16px);
    }
  }
  h3 {
    margin: vw(16px) 0;
    height: vw(64px);
    @include layout-mobile() {
      height: mvw(50px);
      margin: mvw(8px) 0 mvw(16px) 0;
    }
  }
  &__background {
    width: vw(410px);
    height: vw(270px);
    border-radius: vw(30px);
    margin-bottom: vw(24px);
    background-size: cover;
    background-color: $neutral-70;
    @include layout-mobile() {
      width: mvw(280px);
      height: mvw(184px);
      margin-bottom: mvw(16px);
      border-radius: mvw(15px);
    }
  }
  &__author {
    font-size: vw(14px);
    line-height: vw(16px);
    font-weight: 500;
    @include layout-mobile() {
      font-size: mvw(14px);
      line-height: mvw(16px);
    }
  }
}
</style>
