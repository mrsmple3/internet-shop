<template>
  <div
    class="flex flex-col items-center justify-between basis-1/6 mb-6 py-3 px-5 min-w-[250px] gap-1"
  >
    <img
      :src="product.image"
      :alt="product.title"
      class="mb-5 max-w-[100px] min-h-[200px] object-contain"
    />
    <span class="text-start text-sm min-h-[45px]">{{ product.title }}</span>
    <span class="text-center"
      ><span class="font-semibold">Price:</span> {{ product.price }}</span
    >
    <button
      class="text-base px-5 py-2 border border-solid border-black rounded-md"
      @click="takeProduct"
    >
      {{ buttonText }}
    </button>
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
  data() {},
  methods: {
    takeProduct() {
      this.$emit("takeProduct", this.product);
    },
  },
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
