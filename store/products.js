import Product from "../utils/adapters/Product";
import BigProduct from "../utils/adapters/BigProduct";
export const state = () => ({});
export const getters = {};
export const actions = {
  async getProductsPopular({ commit }) {
    try {
      const response = await this.$axios.$get("/store/products/popular");
      return { products: response?.results.map(Product) };
    } catch (e) {}
  },
  async getProduct({}, slug) {
    try {
      const response = await this.$axios.$get(`/store/products/${slug}`);
      return { product: BigProduct(response) };
    } catch (e) {}
  },
  async getProducts({ commit }, query) {
    try {
      const response = await this.$axios.$get(
        "/store/products" + (query ? `?${query}` : "")
      );
      return {
        products: response?.results.map(Product),
        totalPage: response?.total_pages,
        count: response?.count,
      };
    } catch (e) {}
  },
};
export const mutations = {};
