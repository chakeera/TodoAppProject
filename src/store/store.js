import Vue from 'vue';
import Vuex from 'vuex';

// import Todo from './todo';
import Auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: { ...Auth, namespaced: true },
    // todos: { ...Todo, namespaced: true },
  },
});

Vue.$store = store;
export default store;
