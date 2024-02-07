<template>
  <div class="flex flex-col items-start">
    <div class="flex items-center justify-between mb-10 w-full">
      <h1 class="text-start text-3xl font-bold">Cart</h1>
      <router-link
        to="/"
        class="relative font-medium ml-4 p-2 bg-yellow-500 text-white rounded-md"
        >Products
      </router-link>
    </div>
    <div v-if="products.length > 0" class="flex flex-wrap gap-3 mb-6">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        :buttonText="'Удалить'"
        @takeProduct="deleteProduct"
        @increase="increaseQuantity"
        @decrease="deleteProduct"
      />
    </div>
    <p v-else-if="products.length > 0 && loading" class="self-center pt-10">
      Loading...
    </p>
    <p v-else class="self-center pt-10">Not yet</p>
    <button
      v-if="products.length > 0"
      @click="clearCart"
      class="text-white px-5 py-2 border border-solid border-white rounded-md self-center bg-red-500"
    >
      Оплатить
    </button>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { mapActions } from "vuex";

export default {
  name: "cart-product",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  async created() {
    this.$store.dispatch("fetchCarts");
    this.products = this.$store.getters.cart || [];
    this.loading = true;
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    ...mapActions(["addToCart"]),
    deleteProduct(product) {
      this.removeFromCart(product.id);
    },
    increaseQuantity(product) {
      this.addToCart(product);
    },
    clearCart() {
      this.$store.dispatch("clearCart");
      this.products = [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
