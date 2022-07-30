export const state = () => ({
  token: undefined,
});
export const getters = {
  token: (state) => state.token,
  isAuthenticated: (state) => state.token && state.token.length > 0,
};
export const actions = {
  login({ dispatch }, user) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$post("/users/sign-in", user);
        this.$cookies.set("JWT-token", response.access);
        await dispatch("setToken", response.access);
        await dispatch("user/getUserData", {}, { root: true });
        await resolve(response);
      } catch (e) {
        reject(e.response);
      }
    });
  },
  register({ dispatch }, user) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$post("/users/sign-up", user);
        this.$cookies.set("JWT-token", response.access_token);
        await dispatch("setToken", response.access_token);
        await dispatch("user/getUserData", {}, { root: true });
        await resolve(response);
      } catch (e) {
        reject(e.response);
      }
    });
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, "Bearer");
    commit("setToken", token);
  },
  clearToken({ commit }) {
    this.$axios.setToken(false);
    this.$cookies.remove("JWT-token");
    commit("clearToken");
  },
};
export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = undefined;
  },
};
