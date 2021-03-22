import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { AuthStore } from "../modules/auth";
import { DashboardStore } from "../modules/dashboard";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  modules: ["Auth"]
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth: AuthStore,
    Dashboard: DashboardStore
  },
  plugins: [vuexLocalStorage.plugin]
});
