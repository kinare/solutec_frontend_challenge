export default {
  install(Vue) {
    Vue.prototype.$toaster = {
      toast(params) {
        /* todo  make toast */
        Event.$emit("toasting", params);
      }
    };
  }
};
