<template>
  <div class="page">
    <div class="page__header" @click="handleToProfile">
      <div class="page__header__button">
        <img src="@/assets/images/icons/arrow-forward.svg" />
      </div>
      <span> Profile</span>
    </div>
    <div class="page__content">
      <h1>Edit Page</h1>
      <UploadPhoto
        v-model="profile.file"
        class="page__content__upload"
        title="Upload profile photo."
        subtitle="Optimal size 1000x1000."
      />
      <div class="page__content__row">
        <CustomInput
          v-model="profile.firstName"
          class="page__content__row--input"
          ><span slot="label" class="page__content__row--label"
            >First Name <strong>*</strong>
          </span></CustomInput
        >
        <CustomInput
          v-model="profile.lastName"
          class="page__content__row--input"
          ><span slot="label" class="page__content__row--label"
            >Last Name
          </span></CustomInput
        >
      </div>
      <h4>
        Location
        <TooltipComponent
          >Contact information is required to start selling.
        </TooltipComponent>
      </h4>
      <div class="page__content__row">
        <CustomDropdown
          v-model="profile.selectedCountry"
          class="page__content__row--input"
          :selects="selectsCountry"
          :is-lock="true"
          ><span slot="label" class="page__content__row--label"
            >Country
          </span></CustomDropdown
        >
        <CustomDropdown
          v-model="profile.selectedState"
          class="page__content__row--input"
          :selects="selectsStates"
          @input="handleChangeState"
          ><span slot="label" class="page__content__row--label"
            >State
          </span></CustomDropdown
        >
      </div>
      <div class="page__content__row">
        <SearchComponent
          v-model="selectedCity"
          :is-padding="true"
          :is-lock="!isState"
          placeholder="Search city"
          no-text="No cities"
          :result="searchCities"
          :is-in-valid="Boolean(errorCity)"
          :error-text="errorCity"
          class="page__content__row--input"
          @setupCity="handleEmitCity"
          @changeInput="handleChangeCity"
          ><span slot="label" class="page__content__row--label"
            >City
          </span></SearchComponent
        >
        <SearchComponent
          v-model="selectedZip"
          :is-padding="true"
          :is-lock="!isState || !isCity"
          placeholder="Search zip"
          no-text="No zip"
          :is-in-valid="Boolean(errorZip)"
          :error-text="errorZip"
          :result="searchZipCut"
          class="page__content__row--input"
          @setupCity="handleEmitZip"
          @changeInput="handleChangeZip"
          ><span slot="label" class="page__content__row--label"
            >Zip Code
          </span></SearchComponent
        >
      </div>
      <h4>
        Contact info
        <TooltipComponent
          >Contact information is required to start selling.
        </TooltipComponent>
      </h4>
      <div class="page__content__row">
        <CustomInput
          v-model="profile.phone"
          class="page__content__row--input"
          :mask="'+1(###)-###-####'"
          placeholder="+1("
          ><span slot="label" class="page__content__row--label"
            >Phone Number
          </span></CustomInput
        >
      </div>
      <div class="page__content__row">
        <CustomInput
          v-model="profile.email"
          :is-in-valid="Boolean(errorLogin)"
          :error-text="errorLogin"
          class="page__content__row--input"
          @focus="handleFocusEmail"
          @focusout="validateLoginField(profile.email)"
          ><span slot="label" class="page__content__row--label"
            >Email
          </span></CustomInput
        >
      </div>
      <h4>About</h4>
      <div class="page__content__row">
        <CustomTextarea
          v-model="profile.bio"
          class="page__content__row--input"
          placeholder="Tell other farmers a bit about yourself."
          ><span slot="label" class="page__content__row--label"
            >Bio
          </span></CustomTextarea
        >
      </div>
      <div class="page__content__buttons">
        <CustomButton
          class="page__content__buttons--verified"
          :theme="theme"
          :is-loading="loadingSave"
          @click="handleUpdate"
          >Update Profile</CustomButton
        >
        <CustomButton
          class="page__content__buttons--cancel"
          theme="secondary"
          @click="handleToProfile"
          >Cancel</CustomButton
        >
        <span
          class="page__content__buttons--cancel--mobile button-1"
          @click="handleToProfile"
          >Cancel</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import CustomButton from "../../components/Common/CustomButton";
import UploadPhoto from "../../components/Common/UploadPhoto";
import CustomInput from "../../components/Common/CustomInput";
import CustomDropdown from "../../components/Common/CustomDropdown";
import SearchComponent from "../../components/Common/SearchComponent";
import CustomTextarea from "../../components/Common/CustomTextarea";
import TooltipComponent from "../../components/Common/Tooltip";
export default {
  name: "EditPage",
  components: {
    TooltipComponent,
    CustomTextarea,
    SearchComponent,
    CustomDropdown,
    CustomInput,
    UploadPhoto,
    CustomButton,
  },
  middleware: ["auth"],
  data() {
    return {
      selectsCountry: [{ key: "usa", value: "United States" }],
      states: [],
      searchCities: [],
      searchZip: [],
      searchZipCut: [],
      selectedZip: "",
      selectedCity: "",
      errorLogin: "",
      errorCity: "",
      errorZip: "",
      loadingSave: false,
      isChooseCity: false,
      isZipCode: false,
      profile: {
        file: null,
        firstName: "",
        lastName: "",
        selectedCountry: { key: "usa", value: "United States" },
        selectedState: null,
        city: "",
        zipCode: "",
        bio: "",
        phone: "",
        email: "",
      },
    };
  },
  computed: {
    isState() {
      return this.profile.selectedState !== null;
    },
    user() {
      return this.$store.getters["user/user"];
    },
    selectsStates() {
      return this.states.map((item) => {
        return {
          key: item.slug,
          value: item.name,
        };
      });
    },
    isCity() {
      return Boolean(this.profile.city);
    },
    theme() {
      return this.canSave ? "primary" : "disabled";
    },
    canSave() {
      return Boolean(!this.errorLogin && this.profile.firstName);
    },
  },
  async mounted() {
    this.setProfileData();
    this.states = await this.$store.dispatch("utils/getStates");
    this.setAdditionalData();
  },
  methods: {
    handleChangeState() {
      this.selectedZip = "";
      this.selectedCity = "";
      this.profile.city = "";
      this.profile.zipCode = "";
      this.isChooseCity = true;
      this.isZipCode = true;
      this.handleChangeCity("");
    },
    handleFocusEmail() {
      this.errorLogin = null;
    },
    validateLoginField(email) {
      this.errorLogin = null;

      let re = /\S+@\S+\.\S+/;

      if (!re.test(email)) {
        this.errorLogin = "Email is not valid";
        return false;
      }

      this.errorLogin = null;
      return true;
    },
    validateStateZip() {
      this.errorCity = null;
      this.errorZip = null;
      if (!this.isChooseCity || !this.profile.city)
        this.errorCity = "Please fill out a city to update your location";

      if (!this.isZipCode || !this.profile.zipCode)
        this.errorZip = "Please fill out a zip code to update your location";

      return !(this.errorZip || this.errorCity);
    },
    setProfileData() {
      this.profile.firstName = this.user.firstName;
      this.profile.lastName = this.user.lastName;
      this.profile.email = this.user.email;
      this.profile.phone = this.user.phone;
      this.profile.bio = this.user.bio;
    },

    async setAdditionalData() {
      let state = this.states.find(
        (item) => item.name === this.user.location.state
      );

      this.profile.selectedState = {
        key: state.slug,
        value: state.name,
      };
      this.profile.zipCode = this.user.location.zip_code;
      this.profile.city = this.user.location.city;
      this.selectedZip = this.user.location.zip_code;
      this.selectedCity = this.user.location.city;
      this.isZipCode = true;
      this.isChooseCity = true;
    },

    handleToProfile() {
      this.$router.push("/profile");
    },
    async handleEmitCity(val) {
      this.isChooseCity = true;
      this.errorCity = null;
      this.profile.city = val.slug;
      this.searchZip = await this.$store.dispatch("utils/getZip", {
        city: this.profile.city,
        state: this.profile.selectedState?.key,
      });
      this.selectedZip = "";
      this.searchZipCut = [...this.searchZip];
    },
    async handleUpdate() {
      this.validateLoginField(this.profile.email);

      if (!this.validateStateZip()) return;

      if (!this.canSave) return;

      this.loadingSave = true;

      let data = {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        email: this.profile.email,
        phone: "+" + this.profile.phone.replace(/\D/g, ""),
        bio: this.profile.bio,
        zip: this.profile.zipCode,
      };

      if (this.profile.file) data.avatar = this.profile.file;

      try {
        await this.$store.dispatch("user/updateProfile", data);
        await this.$store.dispatch("user/getUserData");
      } catch (e) {}

      this.loadingSave = false;
    },
    handleEmitZip(val) {
      this.isZipCode = true;
      this.errorZip = null;
      this.profile.zipCode = val.slug;
    },
    handleChangeZip(val) {
      this.isZipCode = false;
      this.searchZipCut = this.searchZip
        .filter(({ name }) => {
          return name.includes(val);
        })
        .map((obj) => {
          return { name: obj.name, slug: obj.slug };
        });
    },

    handleChangeCity: debounce(async function (val) {
      this.isChooseCity = false;
      this.isZipCode = false;
      this.selectedZip = "";
      this.profile.zipCode = "";
      this.searchCities = await this.$store.dispatch("utils/getCities", {
        search: val,
        state: this.profile.selectedState?.key,
      });
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: calc(100% + #{$padding-with-width} * 2);
  margin-left: calc(0rem - $padding-with-width);
  padding: 8rem $padding-with-width 8.6875rem $padding-with-width;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: $primary-white;
  @include layout-mobile() {
    width: calc(100% + #{$padding-left-mobile} * 2);
    margin-left: calc(0rem - $padding-left-mobile);
    padding: mvw(80px) $padding-left-mobile;
  }
  &__header {
    display: flex;
    margin-bottom: 3rem;
    align-items: center;
    margin-right: auto;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
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
  &__content {
    width: 39.375rem;
    display: flex;
    flex-direction: column;
    @include layout-mobile() {
      width: 100%;
    }

    h1 {
      margin-bottom: 3rem;
      @include layout-mobile() {
        margin-bottom: mvw(32px);
      }
    }
    h4 {
      margin-top: 2rem;
      display: flex;
      margin-bottom: 1rem;
      @include layout-mobile() {
        margin-top: mvw(32px);
        margin-bottom: mvw(16px);
      }
      div {
        margin-left: 0.5rem;
      }
    }
    &__upload {
      margin-bottom: 3rem;
    }
    &__row {
      display: flex;
      margin-bottom: 1rem;
      @include layout-mobile() {
        flex-direction: column;
        margin-bottom: mvw(16px);
      }
      div:first-child {
        @include layout-mobile() {
          margin-bottom: mvw(16px);
        }
      }
      &--input {
        margin-right: 1.5rem;
        &:last-child {
          margin-right: 0;
        }
      }
      &--label {
        strong {
          color: #b00020;
        }
      }
    }
    &__buttons {
      display: flex;
      margin-top: 3rem;
      @include layout-mobile() {
        flex-direction: column;
        align-items: center;
      }
      &--verified {
        margin-right: 1.5rem;
        width: 10.9375rem;
        @include layout-mobile() {
          width: 100%;
          padding: 0;
          margin: 0;
        }
      }
      &--cancel {
        display: flex;
        @include layout-mobile() {
          display: none;
        }
        &--mobile {
          border-bottom: 2px solid $primary-marigold;
          display: none;
          @include layout-mobile() {
            display: flex;
            width: mvw(58px);
            margin-top: mvw(24px);
          }
        }
      }
    }
  }
}
</style>
