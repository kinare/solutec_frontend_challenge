<template>
  <div>
    <v-app-bar app color="primary" height="100" dark>
      <v-img class="mx-2" src="/img/logo-inverted.png" max-width="60"></v-img>

      <v-spacer />

      <v-btn text x-small> About Us </v-btn>
      <v-btn text x-small> Contact us </v-btn>

      <v-spacer />
      <v-btn
        :to="$route.name === 'Login' ? `/auth/register` : '/auth'"
        class="mx-2 black--text"
        small
        color="secondary"
      >
        {{ $route.name === "Login" ? "Register" : "Login" }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view class="mb-16" />
    </v-main>

    <v-overlay opacity="0.5" :value="loading">
      <v-progress-circular indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>

    <v-footer light color="white" absolute>
      <v-row>
        <v-col cols="12">
          <p>© 2021 solutech. All Rights Reserved</p>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { AuthService } from "../index";

export default {
  name: "Auth",
  data: function() {
    return {
      loading: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(v => {
      if (AuthService.check()) v.$router.push({ name: "Dashboard" });
    });
  },
  mounted() {
    Event.$on("loading", value => {
      this.loading = value;
    });
  }
};
</script>

<style scoped></style>
