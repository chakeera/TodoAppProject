import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    loggedIn(state) {
      return state.user.loggedIn;
    },
  },
  mutations: {
    setLogin(state, data) {
      state.user.loggedIn = data;
    },
    setUser(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    userRegister({ commit }, payload) {
      if (payload) {
        commit('setUser', payload);
      } else {
        commit('setUser', null);
      }
    },
    userLogin({ commit }, payload) {
      commit('setLogin', payload !== null);
    },
    userLogout({ commit }, payload) {
      commit('setLogin', payload !== null);
      commit('setUser', payload);
    },
    // fetchUser({ commit }, user) {
    //   commit('SET_LOGGED_IN', user !== null);
    //   if (user) {
    //     commit('SET_USER', {
    //       displayName: user.displayName,
    //       email: user.email,
    //     });
    //   } else {
    //     commit('SET_USER', null);
    //   }
    // },
  },
});
