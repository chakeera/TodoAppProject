<template>
  <v-app>
    <!-- the blue nav bar -->
    <!-- <v-app-bar
      app
      color="#FF80AB"
    >
      <div class="d-flex align-center">
      </div>
    </v-app-bar> -->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
