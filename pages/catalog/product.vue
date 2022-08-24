<template>
  <div class="page">
    <div class="product-page">
      <div class="product-page__header" @click="handleGoMarket">
        <div class="product-page__button">
          <img src="@/assets/images/icons/arrow-forward.svg" />
        </div>
        <span>Market</span>
      </div>
      <div v-if="!loading" class="product-page__content">
        <img class="product-page__content--background" :src="product.image" />
        <div class="product-page__description">
          <div class="product-page__description--cat">
            {{ product.sub }}
          </div>
          <h2 class="product-page__description--title">
            {{ product.title }}
          </h2>

          <h3 class="product-page__description--price">${{ product.price }}</h3>
          <div class="product-page__description--desc body-2">
            {{ product.description }}
          </div>
          <div class="product-page__options">
            <p>Delivery options</p>
            <span>
              <img :src="getImgDeliver(product.allowDelivery)" /> Pickup</span
            >
            <span>
              <img :src="getImgDeliver(product.allowPickup)" /> Delivery</span
            >
          </div>
          <ProfileContact
            :author="product.seller || {}"
            @contact-click="showModal"
          />
        </div>
      </div>
      <div v-else class="product-page__content">
        <SkeletonItem
          class="product-page__content--background"
          :height="41.25"
          :height-mobile="280"
          :width="41.25"
          :width-mobile="280"
          :border="1.875"
          :border-mobile="30"
        />
        <div class="product-page__description">
          <SkeletonItem
            class="product-page__description--cat"
            :height="1"
            :height-mobile="16"
            :width="6.25"
            :width-mobile="100"
          />
          <SkeletonItem
            class="product-page__description--title"
            :height="3"
            :height-mobile="32"
            :width="18.75"
            :width-mobile="200"
          />
          <SkeletonItem
            class="product-page__description--price"
            :height="2"
            :height-mobile="24"
            :width="10"
            :width-mobile="100"
          />
          <SkeletonItem
            class="product-page__description--desc body-2"
            :height="5"
            :height-mobile="100"
            :width="25"
            :width-mobile="280"
          />
          <SkeletonItem
            class="product-page__options"
            :height="5"
            :height-mobile="100"
            :width="10"
            :width-mobile="140"
          />
        </div>
      </div>
    </div>
    <div class="page__lists">
      <ProductList
        :items="product.moreProduct || []"
        :loading="loading"
        title="More From This Farm"
        class="page__lists--more"
      ></ProductList>
      <ProductList
        :items="product.alsoLike || []"
        :loading="loading"
        :link="`/catalog?subcategory=${product.sub?.toLowerCase()}`"
        title="You May Also Like"
      ></ProductList>
    </div>
    <PopupProfile ref="modal" :seller="product.seller || {}" />
  </div>
</template>

<script>
import check from "@/assets/images/icons/check.svg";
import close from "@/assets/images/icons/close_dark.svg";
import SkeletonItem from "../../components/Common/SkeletonItem";
import ProductList from "../../components/Page/catalog/ProductList";
import ProfileContact from "../../components/Page/catalog/ProfileContact";
import PopupProfile from "../../components/Page/catalog/PopupProfile";
export default {
  components: { PopupProfile, ProfileContact, ProductList, SkeletonItem },
  data() {
    return {
      loading: true,
      product: {},
    };
  },
  watch: {
    "$route.query": {
      async handler(val) {
        window.scrollTo(0, 0);
        this.loading = true;
        const { product } = await this.$store.dispatch(
          "products/getProduct",
          val?.slug
        );
        this.product = product;
        this.loading = false;
      },
    },
  },
  async mounted() {
    const { product } = await this.$store.dispatch(
      "products/getProduct",
      this.$route.query.slug
    );
    this.product = product;
    this.loading = false;
  },
  methods: {
    getImgDeliver(val) {
      return val ? check : close;
    },
    showModal() {
      this.$refs.modal.show();
    },
    handleGoMarket() {
      this.$router.push("/catalog");
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: calc(100% + #{$padding-with-width} * 2);
  margin-left: calc(0rem - $padding-with-width);
  &__lists {
    padding: 8rem $padding-with-width;
    @include layout-mobile() {
      padding: mvw(64px) $padding-left-mobile;
    }
    &--more {
      margin-bottom: 8rem;
      @include layout-mobile() {
        margin-bottom: mvw(64px);
      }
    }
  }
  @include layout-mobile() {
    width: calc(100% + #{$padding-left-mobile} * 2);
    margin-left: calc(0rem - $padding-left-mobile);
  }
}
.product-page {
  background-color: $primary-white;
  padding: 8rem $padding-with-width 8.6875rem $padding-with-width;
  &__header {
    display: flex;
    margin-bottom: 3rem;
    align-items: center;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    span {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
      margin-left: 0.5rem;
      @include layout-mobile() {
        font-size: mvw(16px);
        line-height: mvw(24px);
        margin-left: mvw(8px);
      }
    }
    @include layout-mobile() {
      margin-bottom: mvw(38px);
    }
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2rem;
    border: 1.5px solid $primary-marigold;
    border-radius: 50%;
    height: 2rem;
    img {
      width: 1rem;
      height: 1rem;
      transform: rotate(180deg);
      @include layout-mobile() {
        width: mvw(16px);
        height: mvw(16px);
      }
    }
    @include layout-mobile() {
      width: mvw(32px);
      height: mvw(32px);
    }
  }
  &__content {
    display: flex;
    &--background {
      width: 41.25rem;
      height: 41.25rem;
      border-radius: 1.875rem;
      margin-right: 6.875rem;
      @include layout-mobile() {
        width: mvw(280px);
        height: mvw(280px);
        border-radius: mvw(30px);
        margin-right: 0;
        margin-bottom: mvw(48px);
      }
    }
    @include layout-mobile() {
      flex-direction: column;
    }
  }
  &__description {
    &--cat {
      color: $neutral-30;
      font-size: 0.875rem;
      line-height: 1rem;
      font-weight: 500;
      text-decoration-line: underline;
      margin-bottom: 0.5rem;
      @include layout-mobile() {
        font-size: mvw(14px);
        margin-bottom: mvw(8px);
        line-height: mvw(16px);
      }
    }
    &--title {
      margin-bottom: 1rem;
      @include layout-mobile() {
        margin-bottom: mvw(16px);
      }
    }
    &--price {
      color: $neutral-30;
      margin-bottom: 1rem;
      @include layout-mobile() {
        margin-bottom: mvw(16px);
      }
    }
    &--desc {
      margin-bottom: 1.5rem;
      @include layout-mobile() {
        margin-bottom: mvw(24px);
      }
    }
  }
  &__options {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    @include layout-mobile() {
      margin-bottom: mvw(48px);
    }
    p {
      margin: 0 0 0.5rem;
      font-weight: 700;
      font-size: 0.75rem;
      line-height: 1rem;
      @include layout-mobile() {
        padding-bottom: mvw(8px);
        font-size: mvw(14px);
        line-height: mvw(16px);
      }
    }
    img {
      width: 1rem;
      margin-right: 0.625rem;
      @include layout-mobile() {
        width: mvw(14px);
        margin-right: mvw(10px);
      }
    }
    span {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 1rem;
      line-height: 1.5rem;
      @include layout-mobile() {
        margin-bottom: mvw(8px);
        line-height: mvw(24px);
        font-size: mvw(16px);
      }
    }
  }
  @include layout-mobile() {
    padding: mvw(64px) $padding-left-mobile;
  }
}
</style>
