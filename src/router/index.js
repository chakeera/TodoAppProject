import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Todo from '@/components/Todo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/todos',
    component: Todo,
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

Vue.$router = router;

export default router;
