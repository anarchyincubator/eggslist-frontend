export const state = () => ({
  windowWidth: null,
  windowHeight: null,
  authComponentShow: false,
  cities: [],
});
export const getters = {
  isMobile: (state) => state.windowWidth <= 729,
  cities: (state) => state.cities,
};
export const actions = {
  async getCities({ commit, state }) {
    if (!state.cities || state.cities.length !== 0) return;

    try {
      const response = await this.$axios.$get(
        "/site-configuration/location/cities"
      );
      commit("setCities", response);
      return { cities: response };
    } catch (e) {}
  },
  async nuxtClientInit({ dispatch }, { app }) {
    const token = app.$cookies.get("JWT-token");

    if (token) {
      try {
        await dispatch("auth/setToken", token);
        await dispatch("user/getUserData");
      } catch (e) {
        console.log(e);
        await dispatch("auth/clearToken");
      }
    }
  },
};
export const mutations = {
  changeWindowSize(state, { windowWidth, windowHeight }) {
    state.windowWidth = windowWidth;
    state.windowHeight = windowHeight;
  },
  setCities(state, cities) {
    state.cities = [...cities];
  },
  setAuthComponent(state, show) {
    state.authComponentShow = show;
  },
};
