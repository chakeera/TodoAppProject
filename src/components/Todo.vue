<template>
 <div id="todo">
     <v-card
    class="mx-auto"
    max-width="344"
  >

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Subtasks
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
         I'm a thing. But, like most politicians, he promised more than he could deliver.
         You won't have time for sleeping, soldier, not with all the bed making you'll be doing.
         Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk!
          You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
    <v-btn @click.prevent="signOut"> Sign Out </v-btn>
 </div>
</template>

<script>

import firebase from 'firebase';

export default {
  name: 'Todos',
  computed: {
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('userLogout', null);
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
