<template>
  <div class="flex flex-col items-start relative">
    <div class="flex items-center justify-between w-full mb-10">
      <h1 class="text-3xl font-bold">Prodacts</h1>
      <router-link
        to="/cart"
        class="relative font-medium ml-4 py-2 px-4 bg-blue-500 text-white rounded-md"
        >Корзина: <span class="font-normal">{{ cartTotal }}</span>
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
      :class="{ hide: isHide }"
    />
    <button
      class="fixed bottom-10 right-10 px-5 py-5 rounded-full bg-yellow-500 max-md:bottom-10 max-md:right-10"
      @click="isHide = !isHide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path
          d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"
        />
      </svg>
    </button>
    <transition-group
      v-if="products.length > 0"
      class="home flex flex-wrap"
      name="list"
      tag="div"
    >
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        :button-text="'В корзину'"
        @takeProduct="addToBascket"
      />
    </transition-group>
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
      isHide: true,
    };
  },
  computed: {
    ...mapGetters(["cartTotal"]),
    count() {
      return {
        cart: this.$store.getters.countCart,
      };
    },
  },
  watch: {},
  methods: {
    ...mapActions(["addToCart"]),
    async addToBascket(product) {
      this.addToCart(product);
    },
    filteredProducts(filteredProducts) {
      this.products = filteredProducts;
    },
    resetProducts(products) {
      this.products = products;
    },
  },
  mounted() {},
  async created() {
    await this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchCount");
    this.products = this.$store.getters.products;
    this.count.cart = this.$store.getters.countCart;
  },
};
</script>

<style lang="scss">
.hide {
  opacity: 0;
  visibility: hidden;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
