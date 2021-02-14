import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Todo from '@/components/Todo.vue';
// import firebase from '@/plugins/firebase';
import store from '@/store/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    alias: '/',
    component: Login,
    meta: {
      requiresLogin: false,
      loggedIn: false,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      requiresLogin: false,
      loggedIn: false,
    },
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todo,
    meta: {
      requiresLogin: true,
      loggedIn: true,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
//   const loggedIn = to.matched.some((record) => record.meta.loggedIn);
//   if (requiresLogin && !await firebase.getCurrentUser()) {
//     next('Login');
//   } else if (loggedIn && await firebase.getCurrentUser()) {
//     next('Todos');
//   }
//   next();
// });
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin) && !store.getters.user.loggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

Vue.$router = router;

export default router;
