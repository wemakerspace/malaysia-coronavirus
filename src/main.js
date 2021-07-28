import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import mixins from "@/mixins/index.js";
import "@/styles/index.scss";

const app = createApp(App);
app.use(router);
app.use(store);
app.mixin(mixins);
app.mount("#app");
