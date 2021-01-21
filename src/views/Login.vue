<template>
  <div class="login">
    <button @click="loginButtonClicked">LOGIN</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({ login: "auth/login" }),
    loginButtonClicked() {
      this.login().then(() => {
        this.$router.push({ name: "Posts" });
      });
    }
  }
};
</script>

<style scoped>
button {
  margin-top: 1rem;
  width: 20rem;
  height: 5rem;
  border-radius: 8px;
  background-color: darksalmon;
  padding: 8px;
}
</style>
