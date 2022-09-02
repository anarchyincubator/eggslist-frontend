<template>
  <div class="profile">
    <div class="profile-header">
      <img :src="author.avatar" class="profile-header__avatar" />
      <div class="profile-header__name">
        <h4>
          {{ author.firstName }} {{ author.lastName }}
          <img
            v-if="author.isVerified"
            src="@/assets/images/icons/verified_dark.svg"
          />
        </h4>
        <h6>
          <img src="@/assets/images/icons/map.svg" />{{
            author.location?.zipcode
          }}, {{ author.location?.city }}, {{ author.location?.state }}
        </h6>
      </div>
    </div>
    <CustomButton
      class="profile__button"
      :is-large="true"
      theme="primary"
      @click="handleClickButton"
      >Contact</CustomButton
    >
    <nuxt-link :to="`/profile?id=${author.id}`">View profile</nuxt-link>
  </div>
</template>

<script>
import CustomButton from "../../Common/CustomButton";
export default {
  name: "ProfileContact",
  components: { CustomButton },
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  emits: ["contact-click"],
  methods: {
    handleClickButton() {
      this.$emit("contact-click");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  background-color: #f2e2ca;
  border-radius: 0.75rem;
  padding: 2rem;
  width: 25.5625rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @include layout-mobile() {
    border-radius: mvw(12px);
    width: 100%;
    padding: mvw(32px) mvw(24px);
  }
  &-header {
    display: flex;
    &__avatar {
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 1rem;
      @include layout-mobile() {
        width: mvw(56px);
        height: mvw(56px);
        margin-right: mvw(16px);
      }
    }
    h4 {
      display: flex;
      align-items: center;
      img {
        width: 0.8125rem;
        margin-left: 0.3125rem;
        @include layout-mobile() {
          width: mvw(13px);
          margin-left: mvw(6px);
        }
      }
    }
    h6 {
      margin-top: 0.5rem;
      @include layout-mobile() {
        margin-top: mvw(10px);
      }
      img {
        width: 0.625rem;
        margin-right: 0.3125rem;
        @include layout-mobile() {
          width: mvw(10px);
          margin-right: mvw(6px);
        }
      }
    }
  }
  &__button {
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 2.5rem;
    height: 3.5rem;
    @include layout-mobile() {
      height: mvw(56px);
      margin-top: mvw(40px);
      margin-bottom: mvw(16px);
    }
  }
  a {
    border-bottom: 2px solid $primary-marigold;
    padding-bottom: 0.0625rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    margin: 0 auto;
    @include layout-mobile() {
      padding-bottom: mvw(2px);
      font-size: mvw(16px);
      line-height: mvw(24px);
    }
  }
}
</style>
