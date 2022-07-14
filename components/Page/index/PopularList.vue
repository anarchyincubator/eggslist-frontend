<template>
  <client-only>
    <div class="popular">
      <div class="popular__top">
        <h2>Popular Near You</h2>
        <nuxt-link to="/">View All Listings</nuxt-link>
      </div>
      <div class="list">
        <div v-swiper:swiperInstance="swiperOptionsInner" class="fake">
          <div v-swiper:swiperInstance="swiperOptionsInner" class="list-cards">
            <div class="swiper-wrapper">
              <CardItem
                v-for="(product, index) in products"
                :key="index"
                :title="product.title"
                :price="product.price"
                class="swiper-slide"
                :background="product.image"
                :author-config="product.seller"
              ></CardItem>
            </div>
          </div>
        </div>
        <div class="list__buttons">
          <div
            class="list__buttons__button list__buttons__button--left"
            :class="{ 'list__buttons__button-not': isInButtonLeft }"
            @click="slidePrev"
          >
            <img slot="content" src="@/assets/images/icons/arrow_left.svg" />
          </div>
          <div
            class="list__buttons__button list__buttons__button--right"
            :class="{ 'list__buttons__button-not': isInButtonRight }"
            @click="slideNext"
          >
            <img slot="content" src="@/assets/images/icons/arrow_right.svg" />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import CardItem from "../../Common/CardItem";
export default {
  name: "PopularList",
  components: { CardItem },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mounted: false,
      isInButtonRight: false,
      isInButtonLeft: false,
      swiperOptionsInner: {
        slidesPerView: 2,
        spaceBetween: 20,
        allowTouchMove: false,
        breakpoints: {
          729: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        },
      },
    };
  },
  computed: {
    isMobile() {
      return this.$store.getters["isMobile"];
    },
  },

  mounted() {
    setTimeout(() => {
      this.reCalcStyle();
    }, 100);
  },
  methods: {
    reCalcStyle() {
      this.isInButtonRight =
        this.swiperInstance.realIndex + (this.isMobile ? 2 : 4) >=
        this.products.length;
      this.isInButtonLeft = this.swiperInstance.realIndex === 0;
    },
    slidePrev() {
      if (this.swiperInstance) {
        this.swiperInstance.slidePrev();
        this.reCalcStyle();
      }
    },
    slideNext() {
      if (this.swiperInstance) {
        this.swiperInstance.slideNext();
        this.reCalcStyle();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popular {
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
  &__buttons {
    &__button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid $primary-marigold;
      width: vw(48px);
      height: vw(48px);
      top: 40%;
      transform: translateY(-50%);
      cursor: pointer;
      &:hover {
        background: $primary-marigold-dark;
        @include layout-mobile() {
          background: transparent;
        }
      }
      img {
        height: vw(18px);
        @include layout-mobile() {
          height: mvw(18px);
        }
      }
      &--left {
        left: vw(-110px);
        @include layout-mobile() {
          left: inherit;
          margin-right: mvw(8px);
        }
      }
      &--right {
        right: vw(-90px);
        @include layout-mobile() {
          right: inherit;
        }
      }
      &-not {
        cursor: inherit;
        opacity: 0.6;
        user-select: none;
        &:hover {
          background: transparent;
        }
      }

      @include layout-mobile() {
        width: mvw(48px);
        height: mvw(48px);
        position: inherit;
        top: auto;
        transform: none;
      }
    }
    @include layout-mobile() {
      display: flex;
      margin-top: mvw(32px);
    }
  }
}
</style>
