<template>
  <div class="skeleton-card">
    <SkeletonItem
      :height="300"
      :height-mobile="130"
      :width="300"
      :width-mobile="130"
      :border="30"
    />
    <SkeletonItem
      class="skeleton-card__title"
      :height="24"
      :height-mobile="50"
      :width="100"
      :width-mobile="100"
    />
    <SkeletonItem
      class="skeleton-card__price"
      :height="24"
      :height-mobile="24"
      :width="50"
      :width-mobile="50"
    />
    <SkeletonItem
      :height="24"
      :height-mobile="0"
      :width="70"
      :width-mobile="70"
    />
  </div>
</template>

<script>
import SkeletonItem from "./SkeletonItem";
export default {
  name: "CardItem",
  components: { SkeletonItem },
  props: {},
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
.skeleton-card {
  &__title {
    height: vw(24px);
    margin-top: vw(16px);
    margin-bottom: vw(8px);
    @include layout-mobile() {
      margin-top: mvw(16px);
      margin-bottom: mvw(8px);
    }
  }
  &__price {
    margin-bottom: vw(8px);
    @include layout-mobile() {
      margin-bottom: mvw(8px);
    }
  }
}
</style>
