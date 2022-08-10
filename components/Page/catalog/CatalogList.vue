<template>
  <div v-if="!loading" class="catalog">
    <CardItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :background="item.image"
      :price="item.price"
      :author-config="item.seller"
      class="catalog__item"
    ></CardItem>
  </div>
  <div v-else class="catalog">
    <SkeletonCardItem
      v-for="(item, index) in 3"
      :key="index"
      class="catalog__item"
    ></SkeletonCardItem>
  </div>
</template>

<script>
import CardItem from "../../Common/CardItem";
import SkeletonCardItem from "../../Common/SkeletonCardItem";
export default {
  name: "CatalogList",
  components: { CardItem, SkeletonCardItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-wrap: wrap;
  &__item {
    margin-right: vw(30px);
    margin-bottom: vw(56px);

    @include layout-mobile() {
      margin-right: mvw(20px);
      margin-bottom: mvw(32px);
      width: mvw(130px);
    }
    &:nth-child(3n) {
      margin-right: 0;

      @include layout-mobile() {
        margin-right: mvw(20px);
      }
    }
    &:nth-child(2n) {
      @include layout-mobile() {
        margin-right: 0;
      }
    }
  }
}
</style>
