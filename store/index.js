import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: []
    },
    mutations: {
      setTodos(state, payload) {
        state.todos = payload;
      },
      addTodo(state, payload) {
        state.todos.push(payload);
      },
      deleteTodo(state, payload) {
        let todoIndex = state.todos.findIndex(t => t._id == payload._id);
        if (todoIndex > -1) {
          state.todos.splice(todoIndex, 1);
        }
      },
      updateTodo(state, payload) {
        let todoIndex = state.todos.findIndex(t => t._id == payload._id);
        state.todos.splice(todoIndex, 1, payload);
        //state.todos[todoIndex] = payload
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.$axios.get("/get-all").then(response => {
          vuexContext.commit("setTodos", response.data.docs);
        });
      },
      addTodo(vuexContext, payload) {
        this.$axios.post("/save", { todoText: payload }).then(response => {
          let todo = {
            _id: response.data.data._id,
            text: payload
          };
          vuexContext.commit("addTodo", todo);
        });
      },
      deleteTodo(vuexContext, payload) {
        this.$axios
          .delete("/delete", { data: { todo: payload } })
          .then(response => {
            vuexContext.commit("deleteTodo", payload);
          });
      },
      updateTodo(vuexContext, payload) {
        this.$axios.put("/update", { todo: payload }).then(response => {
          vuexContext.commit("updateTodo", payload);
        });
      }
    },
    getters: {
      getTodos(state) {
        return state.todos;
      }
    }
  });
};

export default createStore;
