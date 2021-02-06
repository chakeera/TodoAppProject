import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Todo from '@/components/Todo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todo,
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

Vue.$router = router;

export default router;
