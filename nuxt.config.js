export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "egglist",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  ssr: false,
  analyze: true,
  target: "static",
  css: ["@/assets/sass/main.scss"],
  styleResources: {
    scss: [
      "@/assets/sass/variables.scss",
      "@/assets/sass/responsive.scss",
      "@/assets/sass/helpers.scss",
    ],
  },
  loading: { color: "transparent" },

  plugins: [
    { src: "~/plugins/windowSizePlugin.js", mode: "client" },
    { src: "~/plugins/v-outside.js", mode: "client" },
    { src: "~/plugins/vueSwiper.js", mode: "client" },
    { src: "~/plugins/v-scroll-lock.js", mode: "client" },
    { src: "~/plugins/nuxtClientInit.js", mode: "client" },
    { src: "~/plugins/v-mask.js", mode: "client" },
    { src: "~/plugins/vueObserver.js", mode: "client" },
  ],

  components: true,

  device: {
    refreshOnResize: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/dayjs",
    "@nuxtjs/style-resources",
    "@nuxtjs/proxy",
    ["vue-currency-input/nuxt", { globalOptions: { currency: "USD" } }],
  ],
  axios: {
    baseURL: process.env.BACKEND_URL,
    credentials: true,
    proxyHeaders: false,
  },
  /*axios: {
    prefix: "/api",
    proxy: true,
    proxyHeaders: false,
    credentials: true,
  },
  proxy: {
    "/api": {
      target: "https://eggslist-dev.ferialabs.com/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    },
  },*/

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
