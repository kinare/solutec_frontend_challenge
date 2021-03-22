import call from "../../http";
import { DashboardConstants } from "./index";

export default {
  namespaced: true,
  state: {
    orders: [],
    products: [],
    suppliers: []
  },
  mutations: {
    SET_ORDERS: (state, payload) => {
      state.orders = payload;
    },
    SET_PRODUCTS: (state, payload) => {
      state.products = payload;
    },
    SET_SUPPLIERS: (state, payload) => {
      state.suppliers = payload;
    }
  },
  actions: {
    getOrders: context => {
      Event.$emit("loading", true);
      call("get", DashboardConstants.orders)
        .then(res => {
          context.commit("SET_ORDERS", res.data.data);
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    saveOrder: ({ dispatch }, payload) => {
      Event.$emit("loading", true);
      call("post", DashboardConstants.orders, payload)
        .then(() => {
          dispatch("getOrders");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    deleteOrder: ({ dispatch }, id) => {
      Event.$emit("loading", true);
      call("delete", DashboardConstants.order(id))
        .then(() => {
          dispatch("getOrders");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    getProduct: context => {
      Event.$emit("loading", true);
      call("get", DashboardConstants.products)
        .then(res => {
          context.commit("SET_PRODUCTS", res.data.data);
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    saveProduct: ({ dispatch }, payload) => {
      Event.$emit("loading", true);
      call("post", DashboardConstants.products, payload)
        .then(() => {
          dispatch("getProduct");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    updateProduct: ({ dispatch }, payload) => {
      Event.$emit("loading", true);
      call("post", DashboardConstants.product(payload.id), payload)
        .then(() => {
          dispatch("getProduct");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    deleteProduct: ({ dispatch }, id) => {
      Event.$emit("loading", true);
      call("delete", DashboardConstants.order(id))
        .then(() => {
          dispatch("getProduct");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    getSuppliers: context => {
      Event.$emit("loading", true);
      call("get", DashboardConstants.suppliers)
        .then(res => {
          context.commit("SET_SUPPLIERS", res.data.data);
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    saveSupplier: ({ dispatch }, payload) => {
      Event.$emit("loading", true);
      call("post", DashboardConstants.suppliers, payload)
        .then(() => {
          dispatch("getSuppliers");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    updateSupplier: ({ dispatch }, payload) => {
      Event.$emit("loading", true);
      call("post", DashboardConstants.supplier(payload.id), payload)
        .then(() => {
          dispatch("getSuppliers");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    },

    deleteSupplier: ({ dispatch }, id) => {
      Event.$emit("loading", true);
      call("delete", DashboardConstants.supplier(id))
        .then(() => {
          dispatch("getSuppliers");
          Event.$emit("loading", false);
        })
        .catch(() => {
          Event.$emit("loading", false);
        });
    }
  },
  getters: {
    orders: state => state.orders,
    suppliers: state => state.suppliers,
    products: state => state.products
  }
};
