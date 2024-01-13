<template>
  <div class="flex flex-col items-start">
    <div class="flex items-center justify-between w-full mb-10">
      <h1 class="text-3xl font-bold">Prodacts</h1>
      <router-link
        to="/cart"
        class="relative font-medium ml-4 py-2 px-4 bg-blue-500 text-white rounded-md"
        >Cart
        <span
          v-if="count.cart > 0"
          class="absolute -bottom-2 -left-3 bg-red-500 text-white rounded-full p-1 px-2 text-xs"
        >
          {{ count.cart }}
        </span></router-link
      >
    </div>
    <filters-products
      @filteredProducts="filteredProducts"
      @resetProducts="resetProducts"
    />
    <div v-if="products.length > 0" class="home flex flex-wrap">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        :button-text="'В корзину'"
        @takeProduct="addToBascket"
      />
    </div>
    <p v-else class="self-center pt-10">Loading...</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
import FiltersProducts from "@/components/FiltersProducts.vue";

export default {
  name: "HomeView",
  components: { ProductCard, FiltersProducts },
  data() {
    return {
      products: [],
      count: {
        cart: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["cartTotal"]),
  },
  methods: {
    ...mapActions(["addToCart"]),
    async addToBascket(product) {
      this.addToCart(product);
      this.count.cart++;
    },
    filteredProducts(products) {
      this.products = products;
    },
    resetProducts(products) {
      this.products = products;
    },
  },
  mounted() {},
  async created() {
    await this.$store.dispatch("fetchProducts");
    this.products = this.$store.state.products;
  },
};
</script>
