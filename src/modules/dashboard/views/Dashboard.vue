<template>
  <v-container>
    <!--    Heading-->
    <v-row>
      <v-col cols="2" class="primary--text">
        <h4 class="title mb-2">{{ $route.name }}</h4>
        <p style="font-size: .7rem">
          {{ new Date().toDateString() }}
        </p>
      </v-col>
    </v-row>

    <!--    Page-->
    <v-row>
      <v-col class="">
        <v-row>
          <v-col>
            <v-sheet
              class="text-center primary--text d-flex flex-column justify-center align-center"
              elevation="1"
              dark
              color="secondary"
              height="200"
            >
              <v-icon color="primary" style="font-size: 60px">
                mdi-shopping
              </v-icon>
              <h5 class="mb-2">Total Products</h5>
              <h3>{{ products.length }}</h3>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              class="text-center primary--text d-flex flex-column justify-center align-center"
              elevation="1"
              light
              height="200"
            >
              <v-icon color="primary" style="font-size: 60px">
                mdi-account-group
              </v-icon>
              <h5 class="mb-2">Suppliers</h5>
              <h3>{{ suppliers.length }}</h3>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              class="text-center white--text d-flex flex-column justify-center align-center"
              elevation="1"
              light
              height="200"
              color="primary"
            >
              <v-icon color="white" style="font-size: 60px">
                mdi-cash-multiple
              </v-icon>
              <h5 class="mb-2">Total Orders</h5>
              <h3>{{  orders.length }}</h3>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-9">
      <v-col>
        <v-sheet outlined light rounded min-height="300px">
          <v-toolbar dense elevation="1">
            <v-toolbar-title class="subtitle-2"
              >Order Statistics</v-toolbar-title
            >
            <v-spacer />
            <v-btn x-small icon class="mx-1">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>

          <v-sheet>
            <v-sparkline
              :labels="months"
              :fill="true"
              :value="value"
              line-width="1px"
              height="100"
              color="primary"
              padding="16"
              stroke-linecap="round"
              smooth
            >
            </v-sparkline>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    value: [20, 675, 610, 410, 390, 610, 310, 460, 250, 40, 250, 240],
    months: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  }),
  computed: {
    products() {
      return this.$store.getters["Dashboard/products"];
    },
    orders() {
      return this.$store.getters["Dashboard/orders"];
    },
    suppliers() {
      return this.$store.getters["Dashboard/suppliers"];
    }
  }
};
</script>

<style scoped>
.compact-form {
  transform: scale(0.675);
  transform-origin: left;
}
</style>
