import User from "@/utils/adapters/User";
export const state = () => ({
  user: null,
});
export const getters = {
  user: (state) => (state.user ? User(state.user) : null),
};
export const actions = {
  getUserData({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$get("/users/profile");
        commit("setUser", response);
        resolve(response);
      } catch (e) {
        console.log(e);
        reject(e.response.data.error);
      }
    });
  },
};
export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};
