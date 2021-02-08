import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Todo from '@/components/Todo.vue';
import firebase from '@/plugins/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    alias: '/',
    component: Login,
    meta: {
      requiresLogin: false,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      requiresLogin: false,
    },
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todo,
    meta: { requiresLogin: true },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresLogin = to.matched.some((x) => x.meta.requiresLogin);
//   // eslint-disable-next-line prefer-destructuring
//   const userStatus = firebase.auth.user;
//   if (requiresLogin && !userStatus) next({ path: '/login' });
//   else if (!requiresLogin && userStatus) next('/todos');
//   else if (!requiresLogin && !userStatus) next();
//   else next();
// });

router.beforeEach(async (to, from, next) => {
  const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
  if (requiresLogin && !await firebase.getCurrentUser()) {
    next('Login');
  } else if (!requiresLogin && await firebase.getCurrentUser()) {
    next('Todos');
  } else {
    next();
  }
});

Vue.$router = router;

export default router;
