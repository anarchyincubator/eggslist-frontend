import Blog from "@/utils/adapters/Blog";
export const state = () => ({});
export const getters = {};
export const actions = {
  async getBlogs({ commit }) {
    try {
      const response = await this.$axios.$get("/blogs/blogs/featured");
      return { blogs: response?.results.map(Blog) };
    } catch (e) {}
  },
};
export const mutations = {};
