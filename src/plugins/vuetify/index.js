import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#01288d",
        secondary: "ffd400"
      }
    }
  }
};

export default new Vuetify(opts);
