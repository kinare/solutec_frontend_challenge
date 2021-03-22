const Listener = {
  mounted: function() {
    // Global Event Listeners
    Event.$on("auth-success", () => {
      this.$router.push({ name: "Finish" });
    });

    Event.$on("login", () => {
      window.location = "/dashboard";
    });

    Event.$on("logout", () => {
      window.location = "/";
    });
  }
};

export default Listener;
