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
              <v-form @submit.prevent="login">
                <v-flex xs12>
                  <h1 class="text-center">Login</h1>
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="emailErrors"
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
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="passwordErrors"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn
                      outlined
                      type="submit"
                    >
                      Log in
                      <!-- <span slot="loader" class="custom-loader"> </span> -->
                    </v-btn>
                    <br>
                    <br>
                    <v-alert
                    v-if="loginError"
                      dense
                      outlined
                      text
                      type="error"
                    >{{loginError}}
                    </v-alert>
                    </div>
                </v-flex>
                    <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn
                    to="/register"
                      outlined
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
import firebase from 'firebase';
import { required, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loginError: null,
    };
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.email && errors.push('Must be valid e-mail');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.password.required && errors.push('Password is required');
      return errors;
    },
  },

  methods: {
    login() {
      this.$v.$touch();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          this.$router.replace({ name: 'Todos' });
        })
        .catch((err) => {
          console.log(err.message);
          this.loginError = 'Invalid Email or Password';
        });
    },
  },
};
</script>
<style>
</style>
