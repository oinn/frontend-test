<template>
  <header>
    <h3>Товаров в корзине на: {{ cartPriceWithCur }}</h3>
    <button :disabled="isCartEmpty" @click="clearCart">Очистить</button>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AppHeader', // Переименовал бы в AppHeader
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartPriceWithCur']),
    isCartEmpty() {
      return this.cart.length === 0;
    },
  },
  methods: {
    ...mapMutations(['clearCart']),
  },
};
</script>

<style lang="scss">
header {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  background: #e5e5e5;
}
</style>
