const HasValidation = {
  data: function() {
    return {
      formDataKey: "",
      formDataError: {}
    };
  },
  beforeMount() {
    if (this.formDataKey && this.formDataKey !== "") {
      this.formDataError = { ...this[this.formDataKey] };
    } else {
      this.formDataError = { ...this.formData };
    }

    for (let key in this.formDataError) {
      this.formDataError[key] = { valid: null, message: "" };
    }
  }
};

export default HasValidation;
