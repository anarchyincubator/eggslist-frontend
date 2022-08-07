import Category from "@/utils/adapters/Category";
export const state = () => ({
  categories: [],
});
export const getters = {
  categories: (state) => state.categories?.map(Category) || [],
};
export const actions = {
  async getCategories({ commit }) {
    try {
      // const response = await this.$axios.$get("/store/categories");
      const response = [
        {
          name: "Meat",
          image:
            "https://nyc3.digitaloceanspaces.com/eggslist-dev-spaces/media/categories/Screenshot_2022-04-24_at_19.07.43_P6jeexG.jpg",
          subcategories: [
            { name: "Beef", slug: "beef" },
            { name: "Chicken", slug: "chicken" },
            { name: "Lamb", slug: "lamb" },
          ],
        },
        {
          name: "Produce",
          image:
            "https://nyc3.digitaloceanspaces.com/eggslist-dev-spaces/media/categories/Screenshot_2022-04-24_at_19.07.36_nRMaJUr.jpg",
          subcategories: [
            { name: "Vegetables", slug: "vegetables" },
            { name: "Fruits", slug: "fruits" },
          ],
        },
        {
          name: "Eggs",
          image:
            "https://nyc3.digitaloceanspaces.com/eggslist-dev-spaces/media/categories/Screenshot_2022-04-24_at_19.07.30_ATpKnKG.jpg",
          subcategories: [
            { name: "Chicken Eggs", slug: "chicken-eggs" },
            { name: "Duck Eggs", slug: "duck-eggs" },
            { name: "Goose Eggs", slug: "goose-eggs" },
          ],
        },
        {
          name: "Lifestock",
          image:
            "https://nyc3.digitaloceanspaces.com/eggslist-dev-spaces/media/categories/Screenshot_2022-04-24_at_19.07.49.jpg",
          subcategories: [
            { name: "Cattle", slug: "cattle" },
            { name: "Sheep", slug: "sheep" },
            { name: "Horse", slug: "horse" },
            { name: "Goat", slug: "goat" },
          ],
        },
      ];

      commit("setCategories", response);
      return { categories: response.map(Category) };
    } catch (e) {}
  },
};
export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
};
