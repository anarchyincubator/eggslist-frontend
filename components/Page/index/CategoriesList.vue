<template>
  <section class="categories">
    <h2>Explore Categories</h2>
    <div v-if="!loading" class="categories__list">
      <div
        v-for="(element, index) in categories"
        :key="index"
        class="categories__list--element"
        @click="handleClickCategory(element)"
      >
        <div :style="getBackgroundStyle(element.image)" alt="category" />
        <h3>{{ element.name }}</h3>
      </div>
    </div>
    <div v-else class="categories__list">
      <SkeletonCategoryItem
        v-for="(item, index) in 4"
        :key="index"
        class="categories__list__item"
      ></SkeletonCategoryItem>
    </div>
  </section>
</template>

<script>
import SkeletonCategoryItem from "../../Common/SkeletonCategoryItem";
export default {
  name: "CategoriesList",
  components: { SkeletonCategoryItem },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getBackgroundStyle(path) {
      return {
        "background-image": `url(${path})`,
      };
    },
    handleClickCategory(val) {
      let query = "?";
      val.subs.forEach(({ slug }) => {
        query += `subcategory=${slug}&`;
      });
      this.$router.push(`/catalog${query}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  &__list {
    display: flex;
    margin-top: 3rem;
    flex-wrap: wrap;
    &__item {
      margin-right: auto;
      cursor: pointer;
      &:nth-child(4) {
        margin-right: 0;
      }
      @include layout-mobile() {
        margin-right: mvw(20px);
        margin-top: mvw(24px);
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
    &--element {
      margin-right: auto;
      cursor: pointer;
      &:nth-child(4) {
        margin-right: 0;
      }
      div {
        border-radius: 1.875rem;
        width: 18.75rem;
        height: 8.6875rem;
        background-size: cover;
        background-color: #605139;
        @include layout-mobile() {
          width: mvw(130px);
          height: mvw(60px);
          border-radius: mvw(15px);
        }
      }
      h3 {
        margin-top: 1rem;
        @include layout-mobile() {
          margin-top: mvw(8px);
        }
      }
      &:hover {
        opacity: 0.9;
      }
      @include layout-mobile() {
        margin-right: mvw(20px);
        margin-top: mvw(24px);
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
    @include layout-mobile() {
      margin-top: 0;
    }
  }
}
</style>
