<template>
  <client-only>
    <div class="popular">
      <div class="popular__top">
        <h2>Popular Near You</h2>
        <a tabindex="-1" @click="pushCatalog">View All Listings</a>
      </div>
      <div v-show="!loading" class="list">
        <vueper-slides
          ref="myVueperSlides"
          class="no-shadow"
          :visible-slides="4"
          :arrows="false"
          :fixed-height="true"
          slide-multiple
          :gap="1"
          :slide-ratio="1 / 4"
          :bullets="false"
          :breakpoints="{ 860: { visibleSlides: 2, 'slide-ratio': 1 / 2 } }"
        >
          <vueper-slide v-for="(product, index) in products" :key="index">
            <template #content>
              <CardItem
                class="swiper-slide list__slide"
                :title="product.title"
                :slug="product.slug"
                :price="product.price"
                :out-stock="product.isOut"
                :background="product.image"
                :author-config="product.seller"
              ></CardItem>
            </template>
          </vueper-slide>
        </vueper-slides>
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
      <div v-show="loading" class="list-loading">
        <SkeletonCardItem
          v-for="(item, index) in 4"
          :key="index"
          class="list-loading__item"
        ></SkeletonCardItem>
      </div>
    </div>
  </client-only>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import SkeletonCardItem from "../../Common/SkeletonCardItem";
import CardItem from "../../Common/CardItem";
export default {
  name: "PopularList",
  components: { CardItem, SkeletonCardItem, VueperSlides, VueperSlide },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mounted: false,
      isInButtonRight: false,
      isInButtonLeft: false,
      done: false,
      swiperOptionsInner: {
        slidesPerView: 2,
        allowTouchMove: false,
        breakpoints: {
          860: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
      },
    };
  },
  computed: {
    isMobile() {
      return this.$store.getters["isMobile"];
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  watch: {},

  methods: {
    pushCatalog() {
      this.done = true;
      this.$router.push("/catalog");
    },
    slidePrev() {
      this.$refs.myVueperSlides.previous();
    },
    slideNext() {
      this.$refs.myVueperSlides.next();
    },
  },
};
</script>

<style lang="scss" scoped>
.vueperslides--fixed-height {
  height: 30rem;
  @include layout-mobile() {
    height: mvw(220px);
  }
}
.popular {
  &__top {
    display: flex;
    align-items: baseline;
    margin-bottom: 3rem;
    h2 {
      margin-right: auto;
    }
    a {
      font-size: 1rem;
      line-height: 1.5rem;
      padding-bottom: 0.0625rem;
      font-weight: 600;
      cursor: pointer;
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
.list-loading {
  display: flex;
  &__item {
    margin-right: 1.875rem;
    @include layout-mobile() {
      margin-right: mvw(20px);
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
      width: 3rem;
      height: 3rem;
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
        height: 1.125rem;
        @include layout-mobile() {
          height: mvw(18px);
        }
      }
      &--left {
        left: -5.75rem;
        @include layout-mobile() {
          left: inherit;
          margin-right: mvw(8px);
        }
      }
      &--right {
        right: -5.75rem;
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
