<template>
  <div id="app">
    <!-- Ни один из компонентов не требует параметров т.к. все данные можно брать из store -->
    <Header :cart="cart" :currency="currency"></Header> <!-- Согласно правил должно закрывать текги в одном стиле -->
    <!-- Обернул бы компоненты List и Cart в тег main для более грамотного обозначения основного блока данных в
    приложении -->
    <List :currency="currency"/>
    <Cart :cart="cart"/>
  </div>
</template>

<script>
// Согласно правил разрешается, но не рекомендуется использовать компоненты в наименовании которых одно слово.
// Использование таких "неправильных" компонентов может привести к разрозненному стилю в написании если к прим. проект
// позволяет писать и в Kebab Case и в Camel Case одновременно. Исключение: App.
import Header from './components/Header.vue';
import List from './components/List.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  // 1. Блок data пишется после блока components
  // 2. Он здесь не нужен т.к. все его значения надо положить в store
  data() {
    return {
      cart: [],
      currency: 'VGTB',
    };
  },
  components: { // Написал бы в одну строчку согласно правил AirBnB (не более 4 значений разрешено писать в 1 строчку)
    Header,
    List,
    Cart,
  },
}
// Блок * {...} из style вынес бы в отдельный css файл в папку /public и подключил бы его к index.html. Использование
// данного блока здесь не совсем оправданно т.к. данное правило производит еффект не только на компоненты приложения, но
// и на любые данные дабавленные на страницу (к прим. в index.html), а само приложение является лишь частью index.html
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
