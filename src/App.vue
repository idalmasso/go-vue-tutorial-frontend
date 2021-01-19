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
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.content {
  padding-top: 5.5vh;
  padding-left: 10%;
}
</style>
