<template>
  <div id="Register">
    <br>
    <br>
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 justify-center>
          <v-card class="login-card">
            <!-- Login/Signin -->
            <v-layout row align-center justify-center>
              <v-form @submit.prevent="submitRegister">
                <v-flex xs12 class="py-3">
                  <h1 class="text-center">Register</h1>
                  <v-text-field
                    name="fullname"
                    label="Full Name"
                    id="fullname"
                    v-model="fullname"
                    type="text"
                    required
                  >
                  </v-text-field>
                     <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required
                  >
                  </v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>

                  <div class="text-center">
                    <v-btn
                      outlined
                      type="submit"
                    >
                      Register
                      <!-- <span slot="loader" class="custom-loader"> </span> -->
                    </v-btn>
                    </div>
                </v-flex>
                    <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn
                    to="/login"
                      outlined
                    >
                      Already have an account? Login here
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
import firebase from 'firebase';

export default {
  name: 'Register',
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    submitRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.fullname,
            })
            .then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style scoped>
</style>
