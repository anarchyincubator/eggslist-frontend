export const state = () => ({
  windowWidth: null,
});
export const getters = {
  isMobile: (state) => state.windowWidth < 729,
};
export const actions = {};
export const mutations = {
  changeWindowSize(state, { windowWidth }) {
    state.windowWidth = windowWidth;
  },
};
