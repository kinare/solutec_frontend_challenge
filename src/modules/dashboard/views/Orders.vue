<template>
  <v-container>
    <!--    Heading-->
    <v-row>
      <v-col md="4" sm="12" class="primary--text">
        <h4 class="title mb-2">{{ $route.name }}</h4>
        <p style="font-size: .7rem">
          {{ new Date().toDateString() }}
        </p>
      </v-col>
    </v-row>

    <!-- Actions   -->
    <v-row>
      <v-col cols="2" class="primary--text">
        <h4 class="title mb-2">Orders ({{ orders.length }})</h4>
      </v-col>
    </v-row>

    <!--    Page-->
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="orders" dense>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Order List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Order
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.order_number"
                            label="Order Number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-data-table
                            v-model="selected"
                            :headers="productHeaders"
                            :items="products"
                            show-select
                            dense
                          >
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Orders",
  data: () => ({
    headers: [
      { text: "Order No.", align: "start", value: "order_number" },
      { text: "Order Date", value: "created_at" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    productHeaders: [
      { text: "Name", align: "start", value: "name" },
      { text: "Description", value: "description" },
      { text: "Quantity", value: "quantity" }
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    selected: [],
    editedItem: {
      order_number: ""
    },
    defaultItem: {
      order_number: ""
    }
  }),
  beforeRouteEnter(to, from, next) {
    next(v => {
      v.$store.dispatch("Dashboard/getOrders");
    });
  },
  computed: {
    orders() {
      return this.$store.getters["Dashboard/orders"];
    },
    products() {
      return this.$store.getters["Dashboard/products"];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("Dashboard/deleteOrder", this.editedItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$store.dispatch("Dashboard/saveOrder", {
        order: this.editedItem,
        items: this.selected
      });
      this.close();
      this.selected = [];
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  }
};
</script>

<style scoped></style>
