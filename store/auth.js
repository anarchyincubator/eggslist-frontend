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
        response = await this.$axios.$post("auth/login", user);
        this.$cookies.set("JWT-token", response.meta.token);
        await dispatch("setToken", response.meta.token);
        await dispatch("user/setUserData", response.data, { root: true });
        await resolve(response);
      } catch (e) {
        reject(e.response.status);
      }
    });
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, "Bearer");
    commit("setToken", token);
  },
  clearToken({ commit }) {
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
