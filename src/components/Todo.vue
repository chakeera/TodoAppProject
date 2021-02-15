<template>
  <div id="todo">
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center align-center>
      <template>
  <v-data-table
    :headers="headers"
    :items="todoList"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>TODO</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              ADD TASK
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
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
                      label="Task name"
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
                      type="date"
                    ></v-text-field>
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
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
        small
        class="mr-2"
        color="orange"
        v-bind="attrs"
              v-on="on"
      >
        mdi-plus
      </v-icon>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
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
                      label="Task name"
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
                      type="date"
                    ></v-text-field>
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
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
        color="blue"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
        color="red"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
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

export default {
  name: 'Todos',
  data() {
    return {
      todoList: [],
      subtask: [],
      editing: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Task',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedSubtaskIndex: -1,
      editedItem: {
        name: '',
        dueDate: '',
      },
      defaultItem: {
        name: '',
        dueDate: '',
      },
      editedSubtaskItem: {
        name: '',
        dueDate: '',
      },
      defaultSubtaskItem: {
        name: '',
        dueDate: '',
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Task' : 'Edit Task';
    },
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
    this.initialize();
  },
  methods: {
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
    initialize() {
      this.todoList = [];
      this.subtask = [];
    },

    editItem(item) {
      this.editedIndex = this.todoList.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    editSubtaskItem(item) {
      this.editedSubtaskIndex = this.subtask.indexOf(item);
      this.editedSubtaskItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.todoList.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },
    deleteSubtaskItem(item) {
      this.editedSubtaskIndex = this.subtask.indexOf(item);
      this.editedSubtaskItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.todoList.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    deleteSubtaskItemConfirm() {
      this.subtask.splice(this.editedSubtaskIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    closeSubtask() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedSubtaskItem = { ...this.defaultItem };
        this.editedSubtaskIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    closeSubtaskDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedSubtaskItem = { ...this.defaultItem };
        this.editedSubtaskIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.todoList[this.editedIndex], this.editedItem);
      } else {
        this.todoList.push(this.editedItem);
      }
      this.close();
    },
    // subtask stuff
    saveSubtask() {
      if (this.editedSubtaskIndex > -1) {
        Object.assign(this.subtask[this.editedSubtaskIndex], this.editedSubtaskItem);
      } else {
        this.subtask.push(this.editedSubtaskItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped>
</style>
