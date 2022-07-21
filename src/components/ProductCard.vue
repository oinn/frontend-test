<template>
  <div class="card">
    <p class="card-title">{{ product.title }}</p>
    <img class="card-image" :src="product.image" :alt="product.title">
    <p class="card-price">
      Цена: {{ product.price }} {{ currency }}
    </p>

    <div>
      <input v-model.number="amount" type="number" min="0">
      <span>кг</span>
    </div>

    <button :disabled="amount <= 0" @click="addToCartAndClear">
      В корзину
    </button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      amount: 0,
    };
  },
  computed: {
    ...mapState(['currency']),
  },
  methods: {
    ...mapMutations(['addToCart']),
    addToCartAndClear() {
      this.addToCart({
        ...this.product,
        amount: this.amount || 0,
      });
      this.amount = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  border: 1px solid #908888;
  border-radius: 5px;
  text-align: center;
  padding: 10px;

  .card-image {
    width: 100%;
  }
}
</style>
