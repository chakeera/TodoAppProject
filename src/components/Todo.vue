<template>
  <div id="todo">
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center align-center>
          <v-text-field label="What needs to be done?" >
            <v-icon slot="append" color="blue" > mdi-plus </v-icon>
          </v-text-field>
         <v-card class="mx-auto">
            <v-card-title>
     <v-checkbox color="success"></v-checkbox>
     abc
    <v-spacer></v-spacer>
     <v-btn icon>
    <v-icon color="orange">mdi-plus</v-icon>
    </v-btn>
    <v-btn icon>
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
// import firebase from 'firebase';

export default {
  name: 'Todos',
  data() {
    return {
    };
  },
};
</script>
<style scoped>
</style>
