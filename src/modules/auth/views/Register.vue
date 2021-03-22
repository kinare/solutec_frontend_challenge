<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="12" offset-md="3">
        <h1 class="title text-center">Signup</h1>
        <p class="subtitle-2 text-center">
          Signup to see the action
        </p>

        <v-form class="ma-5">
          <v-alert
            v-if="$store.getters['Auth/error']"
            class="mb-2"
            text
            outlined
            color="warning"
            icon="mdi-alert"
          >
            {{ $store.getters["Auth/error"] }}
          </v-alert>

          <span class="text-uppercase">Email</span>

          <v-text-field
            solo
            type="text"
            label="Names"
            placeholder="Enter Name"
            v-model="formData.name"
            :rules="rules.name"
            ref="name"
            dense
            class="mt-2"
          ></v-text-field>

          <v-text-field
            solo
            type="email"
            label="Email Address"
            placeholder="Enter email"
            v-model="formData.email"
            :rules="rules.email"
            ref="email"
            dense
            class="mt-2"
          ></v-text-field>

          <span class="text-uppercase">Password</span>
          <v-text-field
            solo
            type="password"
            label="Password"
            placeholder="*********"
            v-model="formData.password"
            :rules="rules.password"
            ref="password"
            dense
            class="mt-2"
          ></v-text-field>

          <v-btn @click="signup" color="primary" large block>Signup</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    e1: 1,
    formData: {
      email: "",
      name: "",
      password: ""
    }
  }),
  computed: {
    rules() {
      return {
        email: [
          value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          }
        ],
        name: [value => !!value || "Required."],
        password: [value => !!value || "Required."]
      };
    }
  },
  methods: {
    signup: function() {
      let isValid = true;

      for (let key in this.rules) {
        isValid = isValid ? this.$refs[key].validate(true) : false;
      }

      if (isValid) this.$store.dispatch("Auth/register", this.formData);
    }
  }
};
</script>
