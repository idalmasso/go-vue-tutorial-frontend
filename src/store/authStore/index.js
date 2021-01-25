import jwt_decode from "jwt-decode";
import dbUtils from "../indexedDButils.js";
export default {
  namespaced: true,
  state: {
    user: {
      username: "",
      loggedIn: false,
      token: ""
    }
  },
  mutations: {
    LOGIN(state, { username, token }) {
      state.user.loggedIn = true;
      state.user.username = username;
      state.user.token = token;
    },
    LOGOUT(state) {
      state.user.loggedIn = false;
      state.user.username = "";
      state.user.token = "";
    }
  },
  actions: {
    async login(context, { username, password }) {
      return fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Cannot login!");
          }
          return response.json();
        })
        .then(data => {
          dbUtils.addUser({ username: username, token: data.token });
          context.commit("LOGIN", { username: username, token: data.token });
        })
        .catch(error => {
          dbUtils.removeUser({ username: username });
          context.commit("LOGOUT");
          throw error;
        });
    },
    async logout(context) {
      dbUtils.removeUser({ username: context.getters.currentUser.username });
      context.commit("LOGOUT");
    },
    async signup(context, { username, password }) {
      return fetch("http://localhost:3000/api/auth/create-user", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Cannot signup!");
          }
          return response.json();
        })
        .then(data => {
          dbUtils.addUser({ username: username, token: data.token });
          context.commit("LOGIN", { username: username, token: data.token });
        })
        .catch(error => {
          dbUtils.removeUser({
            username: context.getters.currentUser.username
          });
          context.commit("LOGOUT");
          throw error;
        });
    },
    async loadUser(context) {
      dbUtils.getUser().then(user => {
        console.log(user);
        if (user && user != {}) context.commit("LOGIN", user);
      });
    }
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      if (!state.user) return false;
      return state.user.loggedIn;
    },
    getTokenHeader(state) {
      return "Bearer " + state.user.token;
    }
  }
};
