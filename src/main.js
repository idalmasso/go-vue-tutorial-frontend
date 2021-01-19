import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import BaseCard from "./components/UI/BaseCard.vue";

Vue.config.productionTip = false;

new Vue({
  components: {
    BaseCard
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
