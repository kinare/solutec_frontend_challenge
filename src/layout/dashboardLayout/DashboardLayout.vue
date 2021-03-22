<template>
  <div>
    <v-navigation-drawer class="elevation-1 border-0" v-model="drawer" app>
      <v-navigation-drawer v-model="drawer" app>
        <div class="text-center pa-5">
          <v-img src="/img/logo.png" contain height="100"></v-img>
        </div>

        <v-list
          dense
          style="font-family: 'Montserrat', sans-serif; font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.19;"
        >
          <v-subheader><v-icon>mdi-dots-horizontal</v-icon></v-subheader>
          <v-list-item-group color="white" active-class="primary">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              exact
              light
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-navigation-drawer>

    <v-app-bar height="100" app light color="white">
      <v-btn
        color="white"
        light
        fab
        elevation="1"
        dark
        x-small
        icon
        @click="drawer = !drawer"
      >
        <v-icon color="primary">
          {{ `mdi-arrow-${drawer ? "left" : "right"}` }}
        </v-icon>
      </v-btn>

      <v-toolbar-title class="primary--text">{{ $route.name }}</v-toolbar-title>

      <v-spacer />

      <v-menu
        class="mx-2"
        transition="slide-y-transition"
        bottom
        offset-y
        offset-x
        rounded="0"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar class="mx-2" size="40" v-bind="attrs" v-on="on">
            <v-btn fab>
              <v-icon>mdi-account-tie</v-icon>
            </v-btn>
          </v-avatar>
        </template>
        <v-list dense>
          <v-subheader>Account</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-export</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <!-- Content-->
      <router-view class="pa-4 mb-16" style="min-height: 80vh" />
      <v-footer absolute style="bottom: 0" light color="white">
        <v-row>
          <v-col cols="12">
            <p>© 2021 Solutech. All Rights Reserved</p>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>

    <v-overlay opacity="0.5" :value="loading">
      <v-progress-circular indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { AuthService } from "../../modules/auth";

export default {
  name: "dashboard",
  data: () => ({
    drawer: null,
    loading: false,
    items: [
      {
        to: "/dashboard",
        title: "Dashboard",
        icon: "mdi-gauge-low"
      },
      {
        to: "/dashboard/products",
        title: "Products",
        icon: "mdi-shopping"
      },
      {
        to: "/dashboard/suppliers",
        title: "Suppliers",
        icon: "mdi-account-group"
      },
      {
        to: "/dashboard/orders",
        title: "Orders",
        icon: "mdi-cash-multiple"
      }
    ]
  }),
  beforeRouteEnter(to, from, next) {
    next(v => {
      v.$store.dispatch("Auth/getUser");
      v.$store.dispatch("Dashboard/getOrders");
      v.$store.dispatch("Dashboard/getProduct");
      v.$store.dispatch("Dashboard/getSuppliers");
    });
  },
  computed: {
    user() {
      return this.$store.getters["Auth/user"];
    }
  },
  methods: {
    logout: function() {
      AuthService.logout();
    }
  },
  mounted() {
    Event.$on("loading", value => {
      this.loading = value;
    });
  }
};
</script>

<style scoped></style>
