export default ({
  state: {
    todo: null,
    todoref: null,
    todoname: null,
  },
  mutations: {
    setTodo(state, data) { state.todo = data; },
    setTodoRef(state, data) { state.todoref = data; },
    setTodoName(state, data) { state.todoname = data; },
  },
  actions: {
    setTodo({ commit }, payload) {
      commit('setTodo', payload);
    },
    setTodoRef({ commit }, payload) {
      commit('setTodoRef', payload);
    },
    setTodoName({ commit }, payload) {
      commit('setTodoName', payload);
    },
  },
});
