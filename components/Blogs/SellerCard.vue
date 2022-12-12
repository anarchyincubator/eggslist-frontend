<template>
  <div class="seller-card">
    <AvatarCard class="seller-card__avatar" :name="seller.firstName">
      <h1>{{ seller?.firstName[0] }}</h1>
    </AvatarCard>
    <div class="seller-card__info">
      <h2>{{ `${seller.firstName} ${seller.lastName}` }}</h2>
      <h4>
        <img src="@/assets/images/icons/map.svg" />{{
          seller.location?.zipcode
        }}, {{ seller.location?.city }}, {{ seller.location?.state }}
      </h4>
      <div class="seller-card__links">
        <nuxt-link class="button-1" :to="linkListings">
          View Listings</nuxt-link
        >
        <a class="button-1" @click="handleShow">Contact</a>
      </div>
    </div>
    <PopupProfile ref="modal" :seller="seller || {}" />
  </div>
</template>

<script>
import PopupProfile from "../Page/catalog/PopupProfile";
import AvatarCard from "../Common/AvatarCard";
export default {
  name: "SellerCard",
  components: { AvatarCard, PopupProfile },
  props: {
    seller: {
      type: Object,
      required: true,
    },
  },
  computed: {
    linkListings() {
      return `/profile?id=${this.seller.id}`;
    },
  },
  methods: {
    handleShow() {
      this.$refs.modal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.seller-card {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  &__avatar {
    width: 13.75rem;
    height: 13.75rem;
    margin-right: 2rem;
  }
  h4 {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    img {
      width: 0.875rem;
      margin-right: 0.4375rem;
    }
  }
  &__links {
    display: flex;
    a:first-child {
      margin-right: 1.5rem;
    }
    a {
      cursor: pointer;
      border-bottom: 2px solid $primary-marigold;
    }
  }
}
</style>
