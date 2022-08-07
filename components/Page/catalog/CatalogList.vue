<template>
  <div class="catalog">
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
</template>

<script>
import CardItem from "../../Common/CardItem";
export default {
  name: "CatalogList",
  components: { CardItem },
  props: {
    items: {
      type: Array,
      required: true,
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
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
