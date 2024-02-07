import { createStore } from "vuex";
import fetchData from "@/data/products";
import addToLocalStorage from "@/data/addLocalStorageItems";
import removeFromLocalStorage from "@/data/removeLocalStorageItem";

export default createStore({
  state: {
    products: [],
    cart: [],
    count: {
      cart: 0,
    },
  },
  getters: {
    cartTotal: (state) => {
      state.cart
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
    },
    cart: (state) => state.cart,
    products: (state) => state.products,
    countCart: (state) => state.count.cart,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCarts(state, cart) {
      state.cart = cart || [];
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      state.count.cart = JSON.parse(localStorage.getItem("cartCount"));
    },
    removeFromCart(state, productId) {
      const productIndex = state.cart.findIndex(
        (item) => item.id === productId
      );

      if (productIndex !== -1) {
        const product = state.cart[productIndex];

        if (product.quantity > 1) {
          product.quantity -= 1;
          state.count.cart = JSON.parse(localStorage.getItem("cartCount"));
        } else {
          state.cart.splice(productIndex, 1);
          state.count.cart = JSON.parse(localStorage.getItem("cartCount"));
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      state.count.cart = 0;
    },
    setCount(state, count) {
      state.count.cart = count;
    },
    clearCount() {
      localStorage.setItem("cartCount", 0);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const data = await fetchData();
        localStorage.setItem("productList", JSON.stringify(data));
        commit("setProducts", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    fetchCarts({ commit }) {
      try {
        const data = JSON.parse(localStorage.getItem("cartList"));
        commit("setCarts", data);
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    },
    fetchCount({ commit }) {
      try {
        const data = JSON.parse(localStorage.getItem("cartCount"));
        commit("setCount", data);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    },
    addToCart({ commit }, product) {
      addToLocalStorage("cartList", product);
      commit("addToCart", product);
    },
    removeFromCart({ commit }, productId) {
      removeFromLocalStorage("cartList", this.state.cart, productId);
      commit("removeFromCart", productId);
    },
    clearCart({ commit }) {
      localStorage.setItem("cartList", []);
      commit("clearCount");
      commit("clearCart");
    },
  },
  modules: {},
});
