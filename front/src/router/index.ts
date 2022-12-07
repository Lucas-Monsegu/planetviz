import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "@/views/Home.vue";
import Quizz from "@/views/Quizz.vue";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/quizz",
      name: "Quizz",
      component: Quizz,
    },
  ],
});