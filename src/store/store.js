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
  },
  mutations: {
    setLogin(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    },
    setLogout(state, data) {
      state.user.loggedIn = data;
    },
  },
  actions: {
    userRegister({ commit }, payload) {
      commit('setUser', { payload });
    },
    userLogin({ commit }, payload) {
      commit('setLogin', payload !== null);
    },
    userLogout({ commit }, payload) {
      commit('setLogout', payload);
      commit('setUser', null);
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
