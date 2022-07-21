<template>
  <div class="product-list"> <!-- заменил бы div на section -->
    <!-- не хватает :key. Стили здесь не нужны т.к. это можно сделать через css -->
    <div class="card" v-for="product in products" :style="{width: cardsWidth + '%'}">
      <p class="card-title">{{ product.title }}</p>
      <img class="card-image" :src="product.image" alt=""> <!-- alt можно взять из id -->
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>

      <div>
        <input type="number" ref="amount" :id="product.id">
        <span>кг</span>
      </div>

      <button @click="addToCart(product)"> В корзину </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currency: String,
  },
  // Данный блок data не нужен т.к. все данные можно взять из store
  data() {
    return {
      products: [],
    };
  },
  computed: {
    // Ширину карточки лучше не вычислять, а прописать нужные стили через @media
    cardsWidth() {
      let width = window.innerWidth; // Должен быть const а не let
      // Данный блок лучше расписать через switch...case (или двойной тернарный оператор (кому как удобнее))
      let count = 1;
      if (width > '840px') { // Сравнение числа со строкой неправильно. Правильное сравнение: width > 840
        count = 3;
      } else if ((width > '420px' && width < '840px')) { // см. строку 34
        count = 2;
      }

      return 100 / count;
    },
  },
  methods: {
    startPricesMonitoring() {
      setInterval(this.getList, 1000); // Неправильный timeout. Согласно ТЗ он должен быть 2 сек.
    },
    async getList() {
      // 1. Правильно использовать const а не let
      // 2. Лишняя переменная data. Результат функции может быть сразу записан в this.products
      let data = await this.$store.dispatch('getProductsList');

      this.products = data;
    },
    // Данную функцию необходимо переместить в store (mutations)
    addToCart(product) {
      // 1. Правильно использовать const а не let
      // 2. Спорное решение использовать такое "взятие" количества продуктов из карточки. Я бы сделал бы отдельное
      // представление продуктов с количеством этих продуктов и использовал бы в шаблоне работу уже с этим
      // представлением. Это бы дало более простое понимание того как работает код, проще шаблон и дополнительные
      // функции (к примеру очистка количества продуктов после добавления)
      let amount = this.$refs.amount.find((input) => input.id === product.id).value;

      let data = { // Правильно использовать const а не let
        amount, // Можно было записать блок вычисления amount сюда т.к. он занимает 1 короткую строчку
        price: product.price,
        title: product.title,
        // Добавил бы на всякий случай еще и сохранение product.id. Т.о. сохранение бы выглядело как:
        //  ...product,
        // amount: this.$refs.amount.find((input) => input.id === product.id).value
      };
      this.$parent.cart.push(data); // Обращение к родителю напрямую не есть лучшая практика.
      // Для передачи данных лучше использовать $emit
    },
  },
  // Располагаю блок created до блока methods
  created() {
    this.startPricesMonitoring();
    // Есть функция старта мониторинга, но нет функции остановки мониторинга которую необходимо прописать в хук
    // beforeDestroy для предотвращения утечки памяти.
  },
};
// А тут в блоке style необходим либо scoped, либо module чтобы данные стили имели влияние только на данный компонент
</script>

<style>
  .product-list {
    padding: 10px;
  }

  .card {
    display: inline-block;
    width: 100%;
    border: 1px solid #908888;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
  }
  .card-image {
    width: 100%;
  }
  button {
    padding: 5px;
    margin: 5px;
  }

</style>
