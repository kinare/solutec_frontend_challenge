<template>
  <v-container>
    <v-row>
      <v-col class="text-center" md="8" sm="12" offset-md="2">
        <v-icon style="font-size: 150px" color="primary"
          >mdi-check-circle</v-icon
        >

        <h1 class="text-center mb-3 font-weight-light" style="font-size: 40px">
          Congratulations!
        </h1>

        <p>
          Thank you for registering <br />
          you can now enjoy all Solutech Features
        </p>

        <v-btn to="/auth" class="mt-5" x-large color="primary"
          >Login</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Finish"
};
</script>

<style scoped></style>
