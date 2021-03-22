const {
  NODE_ENV = "",
  BASE_URL,
  VUE_APP_TITLE,
  VUE_APP_API_BASE_URL
} = process.env;

const environment = NODE_ENV.toLowerCase();
const appBaseUrl = BASE_URL;
const apiBaseUrl = VUE_APP_API_BASE_URL;
const appName = VUE_APP_TITLE;

export { environment, appBaseUrl, apiBaseUrl, appName };
