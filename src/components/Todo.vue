<template>
  <div id="todo">
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center align-center>
          <v-text-field label="What needs to be done?" @keydown.enter="createTodo" v-model="inputTodo">
            <v-icon slot="append" color="blue" > mdi-plus </v-icon>
          </v-text-field>
         <v-card v-for="(items,key) in todos" v-bind:key="key" :todoname="key" :todovalue="items" v-model="inputTodo" class="mx-auto">
            <v-card-title>
     <v-checkbox color="success">
       <v-icon>mdi-check-circle</v-icon>
     </v-checkbox>
     {{ items.text }}
    <v-spacer></v-spacer>
    <v-icon color="orange">mdi-plus</v-icon>
    <v-btn>
    <v-icon color="red">mdi-delete</v-icon>
    </v-btn>
    </v-card-title>
          </v-card>
          <v-divider></v-divider>
          <br>
          <div class="text-center">
          <v-btn class='absolute' @click.prevent="signOut"> Sign Out </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/database';

export default {
  name: 'Todos',
  data() {
    return {
      todoRef: null,
      todos: Object,
      inputTodo: '',
      todovalue: Object,
      todoname: String,
    };
  },
  created() {
    this.todoRef = firebase.database().ref(`/users/${this.$store.state.auth.user.data.uid}`);
    this.$store.dispatch('todos/setTodoRef', this.todoRef);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      this.todos = snapshot.val();
      this.$store.dispatch('todos/setTodo', this.todos);
    });
  },
  methods: {
    createTodo() {
      this.todoRef.push({
        text: this.inputTodo.trim(),
        isDone: false,
      });
      this.inputTodo = '';
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/userLogout', null);
          this.$router.replace({
            name: 'Login',
          });
        });
    },
  },
};
</script>
<style scoped>
</style>
