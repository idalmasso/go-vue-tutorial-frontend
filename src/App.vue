<template>
  <div id="app">
    <the-application-bar></the-application-bar>
    <router-view class="content" />
  </div>
</template>

<script>
import TheApplicationBar from "./components/UI/TheApplicationBar.vue";
export default {
  components: {
    TheApplicationBar
  },
  mounted() {
    this.$store.dispatch("auth/loadUser");
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.content {
  padding-top: 6vh;
  padding-left: 10%;
}
</style>
