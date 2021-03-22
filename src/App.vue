<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
#app {
  font-family: "Nunito", sans-serif;
  font-size: 14px;

  .compact-form {
    transform: scale(0.675);
    transform-origin: left;
  }
}
</style>
