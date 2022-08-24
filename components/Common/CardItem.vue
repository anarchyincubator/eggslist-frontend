<template>
  <div :class="classes" @click="handleClick">
    <div class="card__background" :style="backgroundStyle"></div>
    <h4>{{ title }}</h4>
    <div class="body-1">${{ price }}</div>
    <div v-if="authorConfig" class="card__author">
      <span>{{ authorConfig.firstName }}</span>
      <img
        v-if="authorConfig.isVerified"
        class="card__author--verified"
        src="@/assets/images/icons/verified.svg"
      />
      <img
        v-if="authorConfig.isFavourite"
        class="card__author--like"
        src="@/assets/images/icons/like_dark.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    authorConfig: {
      type: Object,
      default: null,
    },
    isBigHeight: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    backgroundStyle() {
      return {
        "background-image": `url(${this.background})`,
      };
    },
    classes() {
      return [
        "card",
        {
          "card-small": !this.isBigHeight,
        },
      ];
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: `/catalog/product`,
        query: { slug: this.slug },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  h4 {
    @include layout-mobile() {
      font-size: mvw(16px);
      height: mvw(57px);
    }
  }
  &__background {
    width: 18.75rem;
    height: 18.75rem;
    border-radius: 1.875rem;
    margin-bottom: 1rem;
    background-color: $neutral-70;
    background-size: cover;
    &:hover {
      opacity: 0.8;
    }
    @include layout-mobile() {
      width: mvw(130px);
      height: mvw(130px);
      margin-bottom: mvw(16px);
      border-radius: mvw(15px);
    }
  }
  &__author {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $neutral-70;
    border-radius: 6.25rem;
    padding: 0.5rem 0.75rem;
    width: min-content;
    margin-top: 0.8125rem;
    span {
      font-size: 0.875rem;
      line-height: 1rem;
      font-weight: 600;
    }
    img {
      margin-left: 0.3125rem;
    }
    &--verified {
      width: 0.9375rem;
    }
    &--like {
      width: 0.8125rem;
    }
    @include layout-mobile() {
      display: none;
    }
  }
  &-small {
    h4 {
      height: auto;
    }
  }
}
</style>
