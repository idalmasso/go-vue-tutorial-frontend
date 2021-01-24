<template>
  <div class="content">
    <base-card>
      <form @submit.prevent>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" />
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
        <button @click="loginButtonClicked">{{ buttonString }}</button>
        <p v-if="error">{{ error }}</p>
        <a href="#" @click.prevent="toggleLogin">{{ textLoginString }}</a>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseCard from "../components/UI/BaseCard.vue";
export default {
  components: { BaseCard },
  data() {
    return {
      loginSelected: true,
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    ...mapActions({ login: "auth/login", signup: "auth/signup" }),
    loginButtonClicked() {
      if (this.loginSelected) {
        this.login({ username: this.username, password: this.password })
          .then(() => {
            this.$router.push({ name: "Posts" });
          })
          .catch(error => {
            this.error = error;
          });
      } else {
        this.signup({ username: this.username, password: this.password })
          .then(() => {
            this.$router.push({ name: "Posts" });
          })
          .catch(error => {
            this.error = error;
          });
      }
    },
    toggleLogin() {
      this.loginSelected = !this.loginSelected;
    }
  },
  computed: {
    buttonString() {
      if (this.loginSelected) {
        return "LOGIN";
      } else {
        return "SIGNUP";
      }
    },
    textLoginString() {
      if (this.loginSelected) {
        return "Signup instead";
      } else {
        return "Login instead";
      }
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
  display: block;
  margin-left: auto;
  margin-right: auto;
}
label {
  display: block;
  text-align: center;
}
input {
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  padding: 8px 20px;
}
input:focus {
  outline: 0;
  background-color: wheat;
}
</style>
