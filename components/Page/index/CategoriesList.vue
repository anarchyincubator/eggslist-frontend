<template>
  <section class="categories">
    <h2>Explore Categories</h2>
    <div class="categories__list">
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
  </section>
</template>

<script>
export default {
  name: "CategoriesList",
  props: {
    categories: {
      type: Array,
      required: true,
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
    margin-top: vw(48px);
    flex-wrap: wrap;
    &--element {
      margin-right: vw(30px);
      cursor: pointer;
      &:nth-child(4) {
        margin-right: 0;
      }
      div {
        border-radius: vw(30px);
        width: vw(300px);
        height: vw(139px);
        background-size: cover;
        background-color: #605139;
        @include layout-mobile() {
          width: mvw(130px);
          height: mvw(60px);
          border-radius: mvw(15px);
        }
      }
      h3 {
        margin-top: vw(16px);
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
