<template>
  <div class="card">
    <div class="card__background" :style="backgroundStyle"></div>
    <h4>{{ title }}</h4>
    <div class="body-1">${{ price }}</div>
    <div v-if="authorConfig" class="card__author">
      <span>{{ authorConfig.firstName }}</span>
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
.card {
  h4 {
    @include layout-mobile() {
      font-size: mvw(16px);
      height: mvw(57px);
    }
  }
  &__background {
    width: vw(300px);
    height: vw(300px);
    border-radius: vw(30px);
    margin-bottom: vw(16px);
    background-color: $neutral-70;
    background-size: cover;
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
    border-radius: vw(100px);
    padding: vw(8px) vw(12px);
    width: min-content;
    margin-top: vw(13px);
    span {
      font-size: vw(14px);
      line-height: vw(16px);
      font-weight: 600;
    }
    @include layout-mobile() {
      display: none;
    }
  }
}
</style>
