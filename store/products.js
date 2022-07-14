import Product from "@/utils/adapters/Product";
export const state = () => ({});
export const getters = {};
export const actions = {
  async getProducts({ commit }) {
    try {
      const response = await this.$axios.$get("/store/products");
      return { products: response?.results.map(Product) };
    } catch (e) {}
  },
};
export const mutations = {};
