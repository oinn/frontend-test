<template>
  <header>
    <h3>Товаров в корзине на: {{ cartPriceWithCur }}</h3>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppHeader', // Переименовал бы в AppHeader
  computed: {
    ...mapGetters(['cartPriceWithCur']),
  },
};
</script>

<style lang="scss">
header {
  padding: 10px;
  background: #e5e5e5;
}
</style>
