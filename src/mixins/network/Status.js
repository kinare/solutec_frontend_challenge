const networkStatus = {
  data: function() {
    return {
      status: true
    };
  },

  mounted() {
    setInterval(function() {
      Event.$emit("no-internet", navigator.onLine);
    }, 5000);

    Event.$on("no-internet", status => {
      if (status) {
        //todo clear toast
      } else {
        //todo Show toast
      }
    });
  }
};

export default networkStatus;
