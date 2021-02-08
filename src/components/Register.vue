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
                    @input="$v.fullname.$touch()"
                    @blur="$v.fullname.$touch()"
                    :error-messages="fullnameErrors"
                  >
                  </v-text-field>
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
                  >
                  </v-text-field>
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
                  <v-text-field
                    name="repeatedPassword"
                    label="Password"
                    id="repeatedPassword"
                    v-model="repeatedPassword"
                    type="password"
                    required
                    @input="$v.repeatedPassword.$touch()"
                    @blur="$v.repeatedPassword.$touch()"
                    :error-messages="repeatedPasswordErrors"
                  ></v-text-field>

                  <div class="text-center">
                    <v-btn
                      outlined
                      type="submit"
                    >
                      Register
                    </v-btn>
                    <br>
                    <br>
                    <v-alert
                      v-if="RegisterSuccess"
                      dense
                      outlined
                      text
                      type="success"
                    >{{RegisterSuccess}}
                    </v-alert>
                    <v-alert
                    v-if="RegisterError"
                      dense
                      outlined
                      text
                      type="error"
                    >{{RegisterError}}
                    </v-alert>
                    </div>
                </v-flex>
                    <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn
                    to="/login"
                      outlined
                    >
                      Already have an account? Login here
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
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: 'Register',
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      repeatedPassword: '',
      RegisterSuccess: null,
      RegisterError: null,
    };
  },
  mixins: [validationMixin],
  validations: {
    fullname: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    repeatedPassword: { required, sameAsPassword: sameAs('password') },

  },
  computed: {
    fullnameErrors() {
      const errors = [];
      if (!this.$v.fullname.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.fullname.required && errors.push('Full name is required');
      return errors;
    },
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
      // eslint-disable-next-line no-unused-expressions
      !this.$v.password.minLength && errors.push('Password must have atleast 6 character');
      return errors;
    },
    repeatedPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatedPassword.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.repeatedPassword.required && errors.push('Confirm your password');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.repeatedPassword.sameAsPassword && errors.push('Password does not match');
      return errors;
    },
  },
  methods: {
    submitRegister() {
      this.$v.$touch();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.fullname,
            })
            .then(() => {
              this.RegisterSuccess = 'Register Successful! Proceed to Login';
              this.RegisterError = null;
            });
        })
        .catch((err) => {
          console.log(err.message);
          this.RegisterError = 'Invalid Format or This email has already been registered';
        });
    },
  },
};
</script>

<style scoped>
</style>
