<template>
  <div class="cart-list"> <!-- Заменил бы div на section -->
    <div v-for="item in spisok_dlya_rendera"> <!-- отсутствует key -->
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  // Данный prop не нужен т.к. данные корзины правильнее брать из store
  props: {
    cart: Array,
  },
  computed: {
    // 1. Лишний отступ
    // 2. Неправильный стиль написания переменной (Snake Case заместо Camel Case)
    // 3. Наименование переменных должно быть на английском языке
    // Примеры для переименования переменной: CartListView, ItemsView
      spisok_dlya_rendera() {
          return this.cart.reverse();
      },
  },
};
// Если блок style пустой, то он является лишним и подлежит удалению
</script>

<style>

</style>
