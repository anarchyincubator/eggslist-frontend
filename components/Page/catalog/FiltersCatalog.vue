<template>
  <div class="filter-container">
    <div class="filter-container__header">
      <div class="filter-container__reset" @click="resetFilters">
        Reset Filters
      </div>
      <CustomButton
        class="filter-container__header--button"
        theme="primary"
        @click="handleApplyFilter"
        >Apply Filters</CustomButton
      >
    </div>
    <div class="filter-container__input">
      <img
        class="filter-container__input--icon"
        src="@/assets/images/icons/search.svg"
        alt="search"
      />
      <CustomInput
        v-model="searchInput"
        :padding-default="false"
        placeholder="Search"
        class="filter-container__search"
      />
    </div>
    <h6>Category</h6>
    <TheCategory
      v-for="(category, index) in categories"
      :key="index"
      v-model="selects[index]"
      :category="category"
      class="filter-container__category"
      @input="handleChangeSelect($event, index)"
    ></TheCategory>
    <h6>Price</h6>
    <div class="filter-container__price">
      <CustomInput
        v-model="priceMin"
        placeholder="$ Min"
        type="number"
      ></CustomInput>
      <p>to</p>
      <CustomInput
        v-model="priceMax"
        placeholder="$ Max"
        type="number"
      ></CustomInput>
    </div>
    <h6>Pickup</h6>
    <SearchComponent
      v-model="city"
      class="filter-container__search"
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
    <div class="filter-container__line" />
    <PickupOptions
      v-model="pickupSelects"
      :pickup="pickup"
      class="filter-container__category"
    ></PickupOptions>
  </div>
</template>

<script>
import CustomInput from "../../Common/CustomInput";
import TheCategory from "./TheCategory";
import SearchComponent from "../../Common/SearchComponent";
import PickupOptions from "./PickupOptions";
import CustomButton from "../../Common/CustomButton";
export default {
  name: "FiltersCatalog",
  components: {
    CustomButton,
    PickupOptions,
    SearchComponent,
    TheCategory,
    CustomInput,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selects: [],
      city: "",
      searchInput: "",
      resultCity: [],
      pickupSelects: [],
      priceMin: "",
      priceMax: "",
      pickup: {
        name: "Pickup Options",
        options: ["Allow pickup", "Allow delivery"],
      },
    };
  },
  computed: {
    selectedSlugs() {
      const obj = {};
      this.categories.forEach((item, index) => {
        if (this.selects[index].length === 0) return;

        obj[item.name] = item.subs
          .filter((it, ind) => this.selects[index][ind])
          .map(({ slug }) => {
            return slug;
          });
      });
      return obj;
    },
  },
  watch: {
    priceMin: {
      handler(val) {
        if (Number(val) <= Number(this.priceMax)) return;

        this.priceMax = val;
      },
    },
    priceMax: {
      handler(val) {
        if (Number(val) >= Number(this.priceMin)) return;

        this.priceMin = val;
      },
    },
    categories: {
      handler(val) {
        this.selects = val.map((item) => []);
      },
      deep: true,
    },
  },
  methods: {
    handleChangeSelect(val, index) {
      this.selects = this.categories.map((item) => []);
      this.selects[index] = val;
    },
    handleApplyFilter() {
      let query = "";
      Object.values(this.selectedSlugs).forEach((item, index) => {
        item.forEach((key, index) => {
          query +=
            `subcategory=${key}` + (index !== item.length - 1 ? "&" : "");
        });
      });

      if (this.searchInput) {
        query += `&search=${this.searchInput}`;
      }

      if (this.priceMin) {
        query += `&price_from=${this.priceMin}`;
      }
      if (this.priceMax) {
        query += `&price_to=${this.priceMax}`;
      }
      if (this.pickupSelects.length >= 1 && this.pickupSelects[0]) {
        query += "&allow_pickup=true";
      }
      if (this.pickupSelects.length >= 2 && this.pickupSelects[1]) {
        query += "&allow_delivery=true";
      }
      this.$emit("apply", query);
    },
    handleChangeCity(val) {},
    resetFilters() {
      this.selects = this.categories.map((item) => []);
      this.city = "";
      this.searchInput = "";
      this.resultCity = [];
      this.pickupSelects = [];
      this.priceMin = "";
      this.priceMax = "";
      this.$emit("reset");
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  width: vw(300px);
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: vw(32px);
    &--button {
      height: vw(40px);
      font-size: vw(12px);
      font-weight: 600;
      padding: 0 vw(12px);
      margin-left: auto;
    }
  }
  &__reset {
    font-size: vw(16px);
    line-height: vw(24px);
    text-decoration-line: underline;
    align-self: center;
    cursor: pointer;
  }
  &__search {
    position: relative;
  }
  &__input {
    position: relative;
    &--icon {
      position: absolute;
      left: vw(14px);
      width: vw(12px);
      z-index: 5;
      top: 50%;
      transform: translateY(-50%);
      @include layout-mobile() {
        width: mvw(18px);
        left: mvw(18px);
      }
    }
  }
  h6 {
    margin-top: vw(48px);
    font-size: vw(12px);
    line-height: vw(16px);
    letter-spacing: vw(1.2px);
    text-transform: uppercase;
  }
  &__category {
    margin-top: vw(20px);
  }
  &__price {
    display: flex;
    align-items: center;
    margin-top: vw(16px);
    p {
      font-size: vw(16px);
      line-height: vw(24px);
      margin: 0 vw(16px);
    }
  }
  &__search {
    margin-top: vw(16px);
    margin-bottom: vw(24px);
    position: relative;
  }
  &__line {
    height: 1px;
    width: 100%;
    background-color: $neutral-70;
  }
}
.icon {
  position: absolute;
  left: vw(13px);
  width: vw(12px);
  z-index: 5;
  top: 50%;
  transform: translateY(-50%);
  @include layout-mobile() {
    width: mvw(18px);
    left: mvw(18px);
  }
}
</style>
