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

// const beforeRouteEnter = async (to, from, next) => {
//   if (to.meta.requiresLogin) {
//     if (Vue.$store.state.user.loggedIn) {
//       next({ name: 'Todos' });
//     } else {
//       next({ name: 'Login' });
//     }
//   } else {
//     next();
//   }
// };

// router.beforeEach(beforeRouteEnter);
// router.beforeEach(async (to, from, next) => {
//   const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
//   const user = await firebase.auth().currentUser;
//   if (requiresLogin && user.loggedIn === false) {
//     next({ name: 'Login' });
//   } else if (!requiresLogin && user.loggedIn === true) {
//     next({ name: 'Todos' });
//   } else {
//     next();
//   }
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
