// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import App from "./App.vue";
import VueParticles from "vue-particles";

Vue.use(Vuetify, {
  iconfont: "mdi"
});

Vue.use(VueParticles);

new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: { App }
});
