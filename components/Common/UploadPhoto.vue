<template>
  <div class="upload">
    <h4>{{ title }}</h4>
    <div class="body-2">
      {{ subtitle }}
    </div>
    <div class="upload__input">
      <input
        id="file"
        ref="input"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="file"
        class="inputfile"
        @change="onFileSelected"
      />
      <div v-if="fileName" class="body-2" @click="handleClick">
        {{ fileName }}
        <div class="upload__preview">
          <img :src="url" />
        </div>
      </div>
      <CustomButton
        class="button"
        theme="secondary"
        for="file"
        @click="handleClick"
        ><img src="@/assets/images/icons/upload.svg" />{{
          textButton
        }}</CustomButton
      >
    </div>
  </div>
</template>

<script>
import CustomButton from "./CustomButton";

export default {
  name: "UploadPhoto",
  components: { CustomButton },
  props: {
    preview: {
      type: String,
      default: "",
    },
    value: {
      type: File,
      required: false,
    },
    title: {
      type: String,
      default: "Upload a photo of your farm!",
    },
    subtitle: {
      type: String,
      default: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    textButton: {
      type: String,
      default: "Upload Photo",
    },
  },
  data() {
    return {
      selectedFile: null,
      fileName: "",
      url: null,
    };
  },
  computed: {
    inputData: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    async preview(val) {
      const response = await fetch(val);
      const blob = await response.blob();
      let name = val.split("/");

      if (name.length > 0) name = name.pop();
      else name = "image.png";

      this.inputData = new File([blob], name, {
        type: blob.type,
      });
      this.url = val;
      this.fileName = name;
    },
  },
  methods: {
    handleClick() {
      this.$refs.input.click();
    },
    onFileSelected(event) {
      let files = event.target.files;
      this.inputData = event.target.files[0];
      const [file] = files;
      if (file) {
        this.url = URL.createObjectURL(file);
      }
      this.fileName = event.target.value.replace(/^.*[\\\/]/, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background: #f2e2ca;
  border-radius: 0.75rem;
  @include layout-mobile() {
    text-align: center;
    padding: mvw(32px) mvw(20px);
  }

  h4 {
  }

  .body-2 {
    margin: 1rem 0;
    @include layout-mobile() {
      margin: mvw(16px) 0;
    }
  }
  &__input {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include layout-mobile() {
      width: 100%;
    }
    .body-2 {
      position: relative;
      cursor: pointer;
      margin-top: 0;
      border-bottom: 2px solid $primary-marigold;
      @include layout-mobile() {
        text-overflow: ellipsis;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .upload__preview {
      opacity: 0;
      position: absolute;
      width: 10rem;
      right: -14rem;
      bottom: -5rem;
      border-radius: 0.75rem;
      border: 1px solid $neutral-70;
      transition: opacity 0.5s;
      padding: 1rem;
      background-color: $primary-white;
      height: 10rem;
      @include layout-mobile() {
        display: none;
      }
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .body-2:hover .upload__preview {
      opacity: 1;
    }
  }
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + .button {
  display: inline-block;
}

.inputfile:focus + .button,
.inputfile + .button:hover {
}
.button {
  @include layout-mobile() {
    padding-left: mvw(40px);
    padding-right: mvw(40px);
    width: 100%;
    display: flex;
  }
  img {
    width: 1.5rem;
    margin-right: 0.625rem;
    @include layout-mobile() {
      width: mvw(20px);
      margin-right: mvw(5px);
    }
  }
}
</style>
