<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="12" class="primary--text">
        <h3>{{ $route.name }}</h3>
        <p style="font-size: .7rem">11/09/2020</p>
      </v-col>

      <v-col md="4" sm="12" class="d-flex flex-row justify-center">
        <v-sheet
          rounded
          class="pa-3 mx-1 text-center primary--text d-flex flex-column align-center"
          dark
          color="secondary"
        >
          <h3 class="title ">1000</h3>
          <p style="font-size: 10px">Active Drivers</p>
        </v-sheet>

        <v-sheet
          rounded
          class="pa-3 mx-2 text-center d-flex flex-column align-center"
          dark
          color="grey"
        >
          <h3 class="title ">1000</h3>
          <p style="font-size: 10px">Active Drivers</p>
        </v-sheet>
      </v-col>

      <v-col md="4" sm="12"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageHeader"
};
</script>

<style scoped></style>
