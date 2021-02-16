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
 <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
              <v-icon  v-bind="attrs"
              v-on="on" @click='addSubTodo(key)' color="orange">mdi-eye</v-icon>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline"> Add Subtask </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.dueDate"
                      label="Due Date"
                      type='date'
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="addSubTodo"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-icon @click='deleteTodo(key)' color="red">mdi-delete</v-icon>
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
      status: false,
      todovalue: Object,
      todoname: String,
      subtask: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        dueDate: '',
      },
    };
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },
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
        subtask: this.subtask,
      });
      this.inputTodo = '';
    },
    createdSubTodo(key) {
      firebase.database().ref(`/users/${this.$store.state.auth.user.uid}/${key}/subtask`).push({
        text: this.subtask[key].trim(),
        isDone: false,
      });
    },
    deleteTodo(taskid) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.data.uid}/${taskid}`)
        .set({});
    },
    editTodo(key) {
      console.log(key);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
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
