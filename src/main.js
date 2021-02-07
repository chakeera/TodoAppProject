import Vue from 'vue';
import router from '@/router';
import '@/plugins/vuelidate';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store/store';
import '@/plugins/firebase';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  store,
}).$mount('#app');
