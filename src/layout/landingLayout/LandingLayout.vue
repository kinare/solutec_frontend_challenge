<template>
  <v-main>
    <v-container class="fill-height">
      <v-row class="text-center">
        <v-col
          md="6"
          sm="12"
          class="d-flex flex-row justify-center align-center"
        >
          <v-img contain max-height="400" src="/img/logo.png"></v-img>
        </v-col>
        <v-col md="6" sm="12" class="text-md-left text-sm-center">
          <h1 class="my-6 yellow--text font-weight-light ">
            Welcome to the Solutech Challenge
          </h1>
          <v-row no-gutters>
            <v-col md="6" sm="12">
              <v-btn
                to="/auth/register"
                class="my-2"
                x-large
                block
                color="yellow"
                >Signup</v-btn
              >
              <v-btn to="/auth" class="my-2" x-large block color="white"
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "LandingLayout"
};
</script>

<style scoped></style>
