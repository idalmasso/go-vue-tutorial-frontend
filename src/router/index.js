import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import Login from "../views/Login.vue";
import User from "../views/User.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts
  },
  {
    path: "/user/:userid",
    name: "User",
    component: User,
    props: true,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/isLoggedIn"]) {
        next({ name: "Login" });
      } else {
        next();
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    //This is not needed right by now, because the store is  refreshed on page refresh... Will be needed!
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isLoggedIn"]) {
        next({ name: "Posts" });
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
