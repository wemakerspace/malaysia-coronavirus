import { createRouter, createWebHistory } from "vue-router";
import { analytics } from "@/firebase/index.js";
import { logEvent } from "firebase/analytics";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("/src/pages/home/index.vue"),
    meta: {
      title: "Daily Summary",
    },
  },
  {
    path: "/summary",
    name: "summary",
    component: () => import("/src/pages/summary/index.vue"),
    meta: {
      title: "Simple Summary",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "summary",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = `${to.meta.title} | Coronavirus in Malaysia`;
  logEvent(analytics, "screen_view", {
    screen_name: document.title,
  });
});

export default router;
