<script>
// Блоки поменены местами. Сначала должно писать шаблон, потом код, потом стили
export default {
  name: 'Header', // Переименовал бы в AppHeader
  // Данный блок не нужет т.к. данные необходимо брать из store
  props: {
    // Неправильное написание свойств параметра cart. Необходимо писать так:
    //    cart: { type: Array, required: true, default: () => [] }
    cart: Array,
    required: true,
    default: {},

    currency: String,
  },
  // data + watch в данном компоненте заменяются просто на computed: { cartPrice() {...} }. И даже пошел бы дальше -
  // сделал бы getter cartPrice в store и подключил бы этот компонент через computed
  data() {
    return {
      cartPrice: 0,
    };
  },
  watch: {
    cart(cart) {
      let val = 0;
      cart.forEach((item) => { // В данном случае можно использовать reduce
        val += item.price * item.amount;
        // При работе с ценами всегда необходимо использовать округление. Это связано с особенностями хранения чисел в
        // двоичном виде
      });
      this.cartPrice = val;
    },
  },
}
// При использовании тега header написание стилей через scoped становится ненужным
</script>

<style scoped>
  .header {
    padding: 10px;
    background: #e5e5e5;
  }
</style>

<template>
  <div class="header"> <!-- Лучше заменить div.header просто на тег header -->
    <h3>Товаров в корзине на: {{ cartPrice }} {{ currency }}</h3>
  </div>
</template>
