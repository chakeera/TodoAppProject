import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import Todos from './todos';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: { ...Auth, namespaced: true },
    todos: { ...Todos, namespaced: true },
  },
});

Vue.$store = store;
export default store;
