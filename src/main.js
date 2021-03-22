import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { filters } from "@/utils";
import Toaster from "@/plugins/toaster";
import { vuetify } from "./plugins";
import { EventListener } from "./mixins";

// Configs
Vue.config.productionTip = false;
Vue.prototype.$log = console.log.bind(console);

//Register Plugins
Vue.use(Toaster);

// Register filters
filters.forEach(f => {
  Vue.filter(f.name, f.execute);
});

/* Register Event Bus */
// eslint-disable-next-line no-global-assign
Event = new Vue();

new Vue({
  router,
  store,
  vuetify,
  mixins: [EventListener],
  render: h => h(App)
}).$mount("#app");
