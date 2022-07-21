<template>
  <section class="cart-list">
    <div v-for="item in cartView" :key="item.id">
      {{ item.title }}: {{ item.price }} * {{ item.amount }} = {{ getItemTotalPriceWithCur(item) }}
      <button @click="removeFromCart(item.id)">Удалить</button>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ProductCart',
  computed: {
    ...mapState(['cart', 'currency']),
    cartView() {
      return [...this.cart].reverse();
    },
  },
  methods: {
    ...mapMutations(['removeFromCart']),
    getItemTotalPriceWithCur(item) {
      const totalPrice = (item.price * item.amount).toFixed(2);
      return `${totalPrice} ${this.currency}`;
    },
  },
};
</script>
