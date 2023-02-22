import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/auth",
      name: "tutorials",
      component: () => import("./components/AuthPage")
    },
    {
      path: "/bookings",
      name: "bookings",
      component: () => import("./components/Dashboard")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./components/Dashboard")
    }
  ]
});
