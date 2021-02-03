import jwt_decode from "jwt-decode";
import dbUtils from "../indexedDButils.js";
import router from "../../router/index.js";
export default {
  namespaced: true,
  state: {
    user: {
      username: "",
      loggedIn: false,
      authenticationToken: "",
      authorizationToken: ""
    }
  },
  mutations: {
    LOGIN(state, { username, token }) {
      state.user.loggedIn = true;
      state.user.username = username;
      state.user.authenticationToken = token;
    },
    LOGOUT(state) {
      state.user.loggedIn = false;
      state.user.username = "";
      state.user.authenticationToken = "";
      state.user.authorizationToken = "";
    },
    SET_AUTHORIZATION(state, token) {
      state.user.authorizationToken = token;
    }
  },
  actions: {
    async login(context, { username, password }) {
      return fetch(process.env.VUE_APP_SERVER_ADDRESS + "/api/auth/login", {
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
          dbUtils.addUser({
            username: username,
            token: data.authentication_token
          });
          context.commit("LOGIN", {
            username: username,
            token: data.authentication_token
          });
          context.commit("SET_AUTHORIZATION", data.authorization_token);
        })
        .catch(error => {
          context.dispatch("logout");
          throw error;
        });
    },
    async logout(context) {
      return dbUtils
        .removeUser({
          username: context.getters.currentUser.username
        })
        .then(() => {
          return fetch(
            process.env.VUE_APP_SERVER_ADDRESS + "/api/auth/logout",
            {
              method: "POST",
              headers: {
                Authorization:
                  "Bearer " + context.getters.getTokenAuthentication
              }
            }
          ).then(() => {
            context.commit("LOGOUT");
            router.push({ name: "Login" });
          });
        });
    },
    async signup(context, { username, password }) {
      return fetch(
        process.env.VUE_APP_SERVER_ADDRESS + "/api/auth/create-user",
        {
          method: "POST",
          body: JSON.stringify({ username: username, password: password })
        }
      )
        .then(response => {
          if (!response.ok) {
            throw new Error("Cannot signup!");
          }
          return response.json();
        })
        .then(data => {
          dbUtils.addUser({
            username: username,
            token: data.authentication_token
          });
          context.commit("LOGIN", {
            username: username,
            token: data.authentication_token
          });
          context.commit("SET_AUTHORIZATION", data.authorization_token);
        })
        .catch(error => {
          context.dispatch("logout");
          throw error;
        });
    },
    async loadUser(context) {
      dbUtils.getUser().then(user => {
        if (user && user != {}) context.commit("LOGIN", user);
      });
    },
    async updateAuthorizationIfNeeded(context) {
      var exp = 0;
      if (context.getters.getTokenAuthorization !== "") {
        var data = jwt_decode(context.getters.getTokenAuthorization);
        //data.exp expiration in seconds. Date.now is in milliseconds... So just *1000
        exp = data.exp * 1000;
      }
      if (context.getters.getTokenAuthorization === "" || Date.now() > exp) {
        return fetch(process.env.VUE_APP_SERVER_ADDRESS + "/api/auth/token", {
          headers: {
            Authorization: "Bearer " + context.getters.getTokenAuthentication
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Cannot get token!");
            }
            return response.json();
          })
          .then(data => {
            context.commit("SET_AUTHORIZATION", data.authorization_token);
          })
          .catch(error => {
            context.dispatch("logout");
            throw error;
          });
      } else {
        return new Promise(success => {
          success([]);
        });
      }
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
    getTokenAuthorization(state) {
      return state.user.authorizationToken;
    },
    getTokenHeader(state) {
      return "Bearer " + state.user.authorizationToken;
    },
    getTokenAuthentication(state) {
      return state.user.authenticationToken;
    }
  }
};
