<template>
  <div class="row">
    <Todo
      @updateTodoEvent="$emit('updateTodoEvent', $event)"
      @deleteTodoEvent="$emit('deleteTodoEvent', $event)"
      v-for="todo in todos"
      :key="todo._id"
      :todo="todo"
    />
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: false
    }
  }
};
</script>
