<template>
  <div
    class="flex flex-col gap-7 items-start top-0 left-0 px-7 pt-20 fixed bg-gray-300 h-[100vh] max-md:pt-10 max-md:px-3"
  >
    <div class="flex flex-col items-start gap-1 text-sm">
      <label for="" class="text-sm opacity-80">Цена</label>
      <div class="flex items-center max-md:flex-col">
        <input
          type="number"
          class="px-3 py-1 border rounded border-gray-500 outline-none max-w-24"
          v-model="price.start"
          @input="validatePrice"
          placeholder="от"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z"
          />
        </svg>
        <input
          id="limit"
          type="number"
          class="px-3 py-1 border rounded border-gray-500 outline-none max-w-24"
          v-model="price.limit"
          @input="validatePrice"
          placeholder="до"
        />
      </div>
    </div>
    <div class="flex flex-col items-start gap-1 ]">
      <label class="text-sm opacity-80">Категории</label>
      <select
        v-model="selectedCategory"
        class="px-1 py-1 border rounded-md border-gray-500 focus:outline-none focus:opacity-80 font-medium capitalize text-sm transition-all duration-150 max-w-[120px]"
      >
        <option
          v-for="category in categories"
          :key="category"
          class="font-medium text-center capitalize"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <div class="flex items-center gap-4 max-md:flex-col">
      <button
        class="border border-black rounded px-3 py-2 text-sm hover:bg-white transition-all duration-150"
        @click="filterOk"
      >
        Филтровать
      </button>
      <button
        class="border border-black rounded px-3 py-2 text-sm hover:bg-white transition-all duration-150"
        @click="resetFilters"
      >
        Сбросить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "filtersProducts",
  components: {},
  data() {
    return {
      products: [],
      price: {
        start: 0,
        limit: 0,
      },
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
      if (this.price.start < 0) {
        this.price.start = 0;
      }
      if (this.price.limit < 0) {
        this.price.limit = 0;
      }
    },
    resetFilters() {
      this.filterProducts = this.products;
      this.price.limit = 0;
      this.price.start = 0;
      this.selectedCategory = [];
      this.$emit("resetProducts", this.products);
    },
    filterOk() {
      if (
        this.price.start === 0 &&
        this.price.limit === 0 &&
        this.selectedCategory.length === 0
      ) {
        return;
      }
      this.filterProducts = this.products.filter((product) => {
        if (
          this.price.start >= 0 &&
          this.price.limit >= 0 &&
          this.selectedCategory.length === 0
        ) {
          if (product.price < this.price.limit) {
            return true;
          } else if (product.price > this.price.start) {
            return true;
          } else if (
            product.price <= this.price.limit &&
            product.price >= this.price.start
          ) {
            return true;
          } else {
            return false;
          }
        } else if (
          this.selectedCategory.length !== 0 &&
          this.price.start === 0 &&
          this.price.limit === 0
        ) {
          if (this.selectedCategory.includes(product.category)) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            product.price <= this.price.limit &&
            product.price >= this.price.start &&
            this.selectedCategory.includes(product.category)
          ) {
            return true;
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
