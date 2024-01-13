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
    <div v-if="products.length > 0" class="flex flex-wrap gap-3">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        :buttonText="'Удалить'"
        @takeProduct="deleteProduct"
      />
    </div>
    <p v-else class="self-center pt-10">Loading...</p>
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
    };
  },
  async created() {
    await this.$store.dispatch("fetchProducts");
    this.updateProductsInCart();
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    deleteProduct(product) {
      const productIndex = this.products.findIndex(
        (item) => item.id === product.id
      );
      if (productIndex !== -1) {
        if (product.count > 1) {
          this.products[productIndex].count -= 1;
        } else {
          this.removeFromCart(product.id);
          this.updateProductsInCart();
        }
      }
    },
    updateProductsInCart() {
      const cartItems = this.$store.state.cart;
      this.products = Object.values(
        cartItems.reduce((acc, product) => {
          const productId = product.id;
          if (acc[productId]) {
            acc[productId].count += 1;
          } else {
            acc[productId] = { ...product, count: 1 };
          }
          return acc;
        }, {})
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
