import { createStore } from "vuex";
import fetchData from "@/data/products";

export default createStore({
  state: { products: [], cart: [] },
  getters: {
    cartTotal: (state) =>
      state.cart.reduce((total, product) => total + product.price, 0),
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const data = await fetchData();
        commit("setProducts", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    removeFromCart({ commit }, productId) {
      commit("removeFromCart", productId);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
  },
  modules: {},
});
