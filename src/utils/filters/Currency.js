export default {
  name: "currency",
  execute: value => {
    if (!value) return "0.00";
    value = `${parseFloat(value).toFixed(2)}`;
    return value;
  }
};
