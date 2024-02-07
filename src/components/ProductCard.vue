<template>
  <div
    class="flex flex-col items-center justify-between basis-1/6 mb-6 py-3 px-5 min-w-[250px] gap-1"
  >
    <img
      :src="product.image"
      :alt="product.title"
      class="mb-5 max-w-[100px] min-h-[200px] object-contain"
    />
    <span class="text-sm min-h-[45px] max-lines self-start">{{
      product.title
    }}</span>
    <span class="mb-2 self-start"
      ><span class="font-semibold">Price:</span> {{ product.price }}</span
    >
    <div class="flex items-center gap-5 self-start">
      <div v-if="product.quantity > 0" class="flex items-center gap-2">
        <button
          class="text-base px-2 py border border-solid border-black rounded-l-md"
          @click="decreaseQuantity"
        >
          -
        </button>
        {{ product.quantity }}
        <button
          class="text-base px-2 py border border-solid border-black rounded-r-md"
          @click="increaseQuantity"
        >
          +
        </button>
      </div>
      <button
        class="text-sm py-1 px-2 border border-solid border-black rounded-md hover:bg-red-600 hover:text-white hover:border-white"
        @click="takeProduct"
        v-if="!product.quantity > 0"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  methods: {
    takeProduct() {
      this.$emit("takeProduct", this.product);
    },
    increaseQuantity() {
      this.$emit("increase", this.product);
    },
    decreaseQuantity() {
      this.$emit("decrease", this.product);
    },
  },
  mounted() {},
};
</script>

<style>
.max-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.max-lines:hover {
  -webkit-line-clamp: unset; /* При наведении отображаем все строки */
}
</style>
