import Blog from "@/utils/adapters/Blog";
export const state = () => ({});
export const getters = {};
export const actions = {
  async getFeaturedBlogs({ commit }) {
    try {
      const response = await this.$axios.$get("/blogs/blogs/featured");
      return { blogs: response?.results.map(Blog) };
    } catch (e) {}
  },
  async getCategoriesBlogs({ commit }) {
    try {
      const response = await this.$axios.$get("/blogs/categories");
      return { categories: response };
    } catch (e) {}
  },
  async getBlogs({ commit }, params) {
    try {
      let query = "?";
      if (params.page) {
        query += query.length > 1 ? "&" : "";
        query += `page=${params.page}`;
      }
      if (params.search) {
        query += `&search=${params.search}`;
      }
      if (params.author) {
        query += `&author=${params.author}`;
      }
      if (params.category) {
        query += `&category=${params.category}`;
      }

      const response = await this.$axios.$get(`/blogs/blogs${query}`);
      return { blogs: response?.results.map(Blog) };
    } catch (e) {
      throw e;
    }
  },
};
export const mutations = {};
