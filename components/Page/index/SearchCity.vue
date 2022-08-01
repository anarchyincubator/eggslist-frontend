<template>
  <div class="search-city">
    <div class="search-city__first">
      <img
        slot="icon"
        class="icon"
        src="@/assets/images/icons/search.svg"
        alt="search"
      />
      <CustomInput
        v-model="listing"
        class="search-clear"
        :padding-default="false"
        placeholder="Search for listings"
      >
      </CustomInput>
    </div>

    <div class="search-city__line" />
    <SearchComponent
      v-model="city"
      class="search-city__second search-clear"
      :result="resultCity"
      placeholder="Search city"
      no-text="No cities"
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
      Find Farmers
    </CustomButton>
  </div>
</template>

<script>
import SearchComponent from "@/components/Common/SearchComponent.vue";
import CustomButton from "../../Common/CustomButton";
import CustomInput from "../../Common/CustomInput";
import _ from "lodash";
export default {
  name: "SearchCity",
  components: {
    CustomInput,
    CustomButton,
    SearchComponent,
  },
  props: {
    cities: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listing: "",
      city: "",
      resultCity: [],
    };
  },
  mounted() {
    this.getCity();
  },
  methods: {
    async getCity() {
      try {
        const res = await this.$axios.$get("/users/locate?r=true");

        if (res?.city) {
          this.city = `${res.city}, ${res.state}`;
        }
      } catch (e) {}
    },

    handleChangeCity(val) {
      this.resultCity = this.cities
        .filter(({ name }) => {
          return name.includes(val);
        })
        .map((obj) => {
          return `${obj.name}, ${obj.state}`;
        });
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
    position: relative;
    align-items: center;
  }
  &__first {
    width: vw(458px);
    @include layout-mobile() {
      width: 100%;
    }
  }
  &__second {
    width: vw(175px) !important;
    margin-right: auto;
    @include layout-mobile() {
      margin: 0;
      width: 100% !important;
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
    font-size: vw(16px);
    @include layout-mobile() {
      width: 100%;
      font-size: mvw(14px);
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
  z-index: 5;
  top: 50%;
  transform: translateY(-50%);
  @include layout-mobile() {
    width: mvw(18px);
    left: mvw(18px);
  }
}
</style>
