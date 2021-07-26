import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('/src/pages/home/index.vue'),
  // },
  {
    path: "/summary",
    name: "summary",
    component: () => import("/src/pages/summary/index.vue"),
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
export default router;
