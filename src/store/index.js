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
      const cartPrice = state.cart
        .reduce((acc, item) => acc + item.amount * item.price, 0);
      return `${cartPrice.toFixed(2)} ${state.currency}`;
    },
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, newItem) {
      const exisingItemIndex = state.cart.findIndex((item) => item.id === newItem.id);

      if (exisingItemIndex >= 0) {
        const [updatedItem] = state.cart.splice(exisingItemIndex, 1);

        state.cart.push({
          ...updatedItem,
          amount: updatedItem.amount + newItem.amount,
        });
      } else {
        state.cart.push({ ...newItem });
      }
    },
    removeFromCart(state, itemId) {
      state.cart = state.cart.filter((item) => item.id !== itemId);
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
