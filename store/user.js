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
  async getUserInfo({ commit, dispatch }, id) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$get(`/users/profile/${id}`);
        resolve(User(response));
      } catch (e) {
        reject(e.response.data.error);
      }
    });
  },
  async changeFavouriteUser({ commit, dispatch }, id) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$post(
          `users/${id}/change-favorite-status`
        );
        resolve(User(response));
      } catch (e) {
        reject(e.response.data.error);
      }
    });
  },
  async updateProfile({}, data) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        const formData = new FormData();

        if (data.avatar) formData.append("avatar", data.avatar);

        if (data.firstName) formData.append("first_name", data.firstName);

        if (data.email) formData.append("email", data.email);

        if (data.phone) formData.append("phone_number", data.phone);

        if (data.bio) formData.append("bio", data.bio);

        if (data.zipCode) formData.append("zip_code", data.zipCode);

        if (data.state) formData.append("state", data.state);

        if (data.city) formData.append("city", data.city);

        response = await this.$axios.$patch(`/users/profile`, formData);
        resolve(User(response));
      } catch (e) {
        reject(e.response.data);
      }
    });
  },
};
export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = {};
  },
};
