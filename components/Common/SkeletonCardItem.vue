<template>
  <div class="skeleton-card">
    <SkeletonItem :height="300" :width="300" :border="30" color="" />
    <SkeletonItem class="skeleton-card__title" :height="24" :width="100" />
    <SkeletonItem class="skeleton-card__price" :height="24" :width="50" />
    <SkeletonItem :height="24" :width="70" />
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
  }
  &__price {
    margin-bottom: vw(8px);
  }
}
</style>
