import City from "@/utils/adapters/City";

import { localStorageKeyCity, localStorageKeyAuth } from "../utils/data";

export const state = () => ({
  windowWidth: null,
  windowHeight: null,
  authComponentShow: false,
  cities: [],
  currentCity: null,
});
export const getters = {
  isMobile: (state) => state.windowWidth <= 860,
  cities: (state) => state.cities,
  currentCity: (state) => state.currentCity && City(state.currentCity),
};
export const actions = {
  async getCities({ commit, state }) {
    try {
      const response = await this.$axios.$get(
        "/site-configuration/location/cities"
      );
      commit("setCities", response);
      return { cities: response };
    } catch (e) {}
  },
  async getLocate({ commit, state }) {
    if (state.currentCity) return state.currentCity;

    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$get("/users/locate?r=true");
        const city = `${response.city}, ${response.state}`;
        commit("setCurrentCity", city);
        await resolve(city);
      } catch (e) {
        reject(e.response);
      }
    });
  },
  async saveCity({ commit }, { slug, name }) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await this.$axios.$post("/users/set-location", {
          slug: slug,
        });
        commit("setCurrentCity", name);
        await resolve(response);
      } catch (e) {
        reject(e.response);
      }
    });
  },
  async nuxtClientInit({ dispatch, commit }, { app }) {
    dispatch("getCities");
    const token = localStorage.getItem(localStorageKeyAuth);
    const city = localStorage.getItem(localStorageKeyCity);
    if (city) {
      await commit("setCurrentCity", city);
    }
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
  setCurrentCity(state, city) {
    //localStorage.setItem(localStorageKeyCity, city);
    state.currentCity = city;
  },
  setAuthComponent(state, show) {
    state.authComponentShow = show;
  },
};
