<template>
  <div class="search-city">
    <SearchComponent
      v-model="listing"
      class="search-city__first search-clear"
      :result="resultListing"
      placeholder="Search for listings"
      @changeInput="handleChangeListing"
    >
      <img
        slot="icon"
        class="icon"
        src="@/assets/images/icons/search.svg"
        alt="search"
      />
    </SearchComponent>
    <div class="search-city__line" />
    <SearchComponent
      v-model="city"
      class="search-city__second search-clear"
      :result="resultCity"
      placeholder="Search city"
      @changeInput="handleChangeCity"
    >
      <img
        slot="icon"
        class="icon"
        src="@/assets/images/icons/map.svg"
        alt="search"
      />
    </SearchComponent>
    <CustomButton
      class="search-city__button button-2"
      theme="primary"
      @click="handleFindListings"
    >
      Find Listings
    </CustomButton>
  </div>
</template>

<script>
import SearchComponent from "@/components/Common/SearchComponent.vue";
import CustomButton from "../../Common/CustomButton";
export default {
  name: "SearchCity",
  components: {
    CustomButton,
    SearchComponent,
  },
  data() {
    return {
      listing: "",
      resultListing: [],
      city: "",
      resultCity: [],
    };
  },
  mounted() {
    this.city = "Boston, MA";
    this.getCity();
  },
  methods: {
    handleChangeListing(val) {
      this.resultListing = ["One", "Second", "Third", "Third", "Third"];
    },
    async getCity() {
      try {
        const res = await this.$axios.$get("/users/locate?r=true");
      } catch (e) {}
    },
    handleChangeCity(val) {
      this.resultCity = ["One", "Second", "Third", "Third", "Third"];
    },
    handleFindListings() {},
  },
};
</script>

<style lang="scss" scoped>
.search-city {
  width: 100%;
  display: flex;
  background: #fef3e1;
  border-radius: vw(12px);
  padding: vw(15px) vw(15px) vw(15px) vw(15px);
  height: vw(56px);
  &__first,
  &__second {
    display: flex;
    align-items: center;
  }
  &__first {
    width: vw(458px);
    @include layout-mobile() {
      width: 100%;
    }
  }
  &__second {
    width: vw(175px);
    margin-right: auto;
    @include layout-mobile() {
      margin: 0;
      width: 100%;
    }
  }
  &__line {
    width: vw(2px);
    height: 100%;
    margin-right: vw(20px);
    background-color: $neutral-70;
    @include layout-mobile() {
      display: none;
    }
  }
  &__button {
    width: vw(166px);

    @include layout-mobile() {
      width: 100%;
    }
  }
  @include layout-mobile() {
    flex-direction: column;
    padding: 0 0 mvw(60px);
    border-radius: inherit;
    height: auto;

    background-color: transparent;
    & > * {
      margin-bottom: mvw(16px);
    }
  }
}
.icon {
  position: absolute;
  left: vw(0px);
  width: vw(18px);
  top: 50%;
  transform: translateY(-50%);
  @include layout-mobile() {
    width: mvw(18px);
    left: mvw(18px);
  }
}
</style>
