<template>
  <div id="Login">
    <br>
    <br>
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center>
          <v-card class="login-card">
            <!-- Login/Signin -->
            <v-layout row align-center justify-center>
              <!-- <v-form @submit.prevent="onSignin"> -->
                <v-form>
                <v-flex xs12>
                  <h1 class="text-center">Login</h1>
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn
                      outlined
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                    >
                      Log in
                      <!-- <span slot="loader" class="custom-loader"> </span> -->
                    </v-btn>
                    </div>
                </v-flex>
                    <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn
                      outlined
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                    >
                      Dont have an account? Sign up here
                      <!-- <span slot="loader" class="custom-loader"> </span> -->
                    </v-btn>
                  </div>
                </v-flex>
              </v-form>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style>

</style>
