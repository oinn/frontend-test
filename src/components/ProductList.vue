<template>
  <section class="product-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductCard from './ProductCard.vue';

const MONITOR_TIMEOUT = 2 * 1000;

export default {
  name: 'ProductList',
  components: { ProductCard },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState(['products']),
  },
  created() {
    this.startPricesMonitoring();
  },
  beforeDestroy() {
    this.stopPricesMonitoring();
  },
  methods: {
    ...mapActions(['fetchProducts']),
    startPricesMonitoring() {
      this.timer = setInterval(this.fetchProducts, MONITOR_TIMEOUT);
    },
    stopPricesMonitoring() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-list {
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  .card {
    width: calc(33.3% - 20px);
  }
}

@media screen and (max-width: 840px) {
  .product-list .card {
    width: calc(50% - 10px);
  }
}

@media screen and (max-width: 420px) {
  .product-list .card {
    width: 100%;
  }
}
</style>
