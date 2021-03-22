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
        <h4 class="title mb-2">Suppliers ({{ suppliers.length }})</h4>
      </v-col>
    </v-row>

    <!--    Page-->
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="suppliers" dense>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Product List</v-toolbar-title>
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
                    New Supplier
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
                            v-model="editedItem.name"
                            label="Product Name"
                          ></v-text-field>
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
  </v-container></template
>

<script>
export default {
  name: "Suppliers",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    headers: [
      { text: "Name", value: "name" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
    }
  }),
  beforeRouteEnter(to, from, next) {
    next(v => {
      v.$store.dispatch("Dashboard/getSuppliers");
    });
  },
  computed: {
    suppliers() {
      return this.$store.getters["Dashboard/suppliers"];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.suppliers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.suppliers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("Dashboard/deleteSupplier", this.editedItem.id);
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
      if (this.editedIndex > -1) {
        this.$store.dispatch("Dashboard/updateSupplier", this.editedItem);
      } else {
        this.$store.dispatch("Dashboard/saveSupplier", this.editedItem);
      }

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

<style scoped>
.compact-form {
  transform: scale(0.675);
  transform-origin: left;
}
</style>
