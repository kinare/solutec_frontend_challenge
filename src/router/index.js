import Vue from "vue";
import VueRouter from "vue-router";
import nextFactory from "@/router/middleware/MiddlewareFactory";
import { AuthRoutes } from "@/modules/auth";
import Landing from "@/layout/landingLayout/LandingLayout";
import { DashboardRoutes } from "@/modules/dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Landing
  },
  ...AuthRoutes,
  ...DashboardRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return next();
});

export default router;
