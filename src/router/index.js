import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Todo from '@/components/Todo.vue';
// import firebase from '@/plugins/firebase';

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

// router.beforeEach(async (to, from, next) => {
//   const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
//   const user = firebase.auth().currentUser;
//   if (!requiresLogin && !user) {
//     next('/login');
//   } else if (!requiresLogin && await firebase.auth.currentUser()) {
//     next('Todos');
//   } else {
//     next();
//   }
// });

Vue.$router = router;

export default router;
