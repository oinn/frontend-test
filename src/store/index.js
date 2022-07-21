import Vue from 'vue';
import Vuex from 'vuex';
import api from '../../api/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currency: 'VGTB',
    products: [],
    cart: [],
  },
  getters: {
    cartPriceWithCur(state) {
      const price = state.cart
        .reduce((acc, item) => acc + Math.round(item.amount * item.price * 100) / 100, 0);
      return `${price} ${state.currency}`;
    },
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, newItem) {
      const exisingItemIndex = state.cart.find((item) => item.id === newItem.id);

      if (exisingItemIndex >= 0) {
        const existingItem = state.cart[exisingItemIndex];
        state.cart.splice(exisingItemIndex, 1, {
          ...existingItem,
          amount: existingItem.amount + newItem.amount,
        });
      } else {
        state.cart.push(newItem);
      }
    },
    removeFromCart(state, itemId) {
      const exisingItemIndex = state.cart.find((item) => item.id === itemId);

      if (exisingItemIndex >= 0) {
        state.cart.splice(exisingItemIndex, 1);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    async fetchProducts(context) {
      const products = await api.getProductsList();
      context.commit('setProducts', products);
    },
  },
  modules: {},
});
