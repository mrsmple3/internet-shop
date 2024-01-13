<template>
  <div class="flex gap-5 items-center">
    <input
      type="number"
      class="px-5 py-3 border rounded border-gray-500 outline-none"
      v-model="price"
      @input="validatePrice"
      placeholder="Price"
    />
    <select
      v-model="selectedCategory"
      class="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:opacity-80 text-base font-medium"
    >
      <option
        v-for="category in categories"
        :key="category"
        class="text-base font-medium text-center"
      >
        {{ category }}
      </option>
    </select>
    <button class="border border-gray-500 rounded px-5 py-2" @click="filterOk">
      Филтровать
    </button>
    <button
      class="border border-gray-500 rounded px-5 py-2"
      @click="resetFilters"
    >
      Сбросить
    </button>
  </div>
</template>

<script>
export default {
  name: "filtersProducts",
  data() {
    return {
      products: [],
      price: 0,
      selectedCategory: [],
      categories: [],
      filterProducts: [],
    };
  },
  async created() {
    await this.$store.dispatch("fetchProducts");
    this.products = this.$store.state.products;
    this.categories = [
      ...new Set(this.products.map((product) => product.category)),
    ];
  },
  methods: {
    validatePrice() {
      if (this.price < 0) {
        this.price = 0;
      }
    },
    resetFilters() {
      this.filteredProducts = this.products;
      this.price = 0;
      this.selectedCategory = [];
      this.$emit("resetProducts", this.products);
    },
    filterOk() {
      if (this.price <= 0 && this.selectedCategory.length === 0) {
        return;
      }
      this.filterProducts = this.products.filter((product) => {
        if (this.price > 0 && this.selectedCategory.length > 0) {
          if (
            product.price <= this.price &&
            this.selectedCategory.includes(product.category)
          ) {
            return true;
          }
        } else if (this.price > 0) {
          if (product.price <= this.price) {
            return true;
          } else {
            return false;
          }
        } else if (this.selectedCategory.length > 0) {
          if (this.selectedCategory.includes(product.category)) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      });
      this.$emit("filteredProducts", this.filterProducts);
    },
  },
};
</script>

<style lang="scss" scoped></style>
