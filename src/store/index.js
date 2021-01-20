import Vue from "vue";
import Vuex from "vuex";
import postsModule from "./postStore/index.js";
import usersModule from "./userStore/index.js";
import authModule from "./authStore/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { posts: postsModule, users: usersModule, auth: authModule }
});
