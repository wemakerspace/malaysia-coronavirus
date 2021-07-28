import { createStore } from "vuex";

import summary from "./modules/summary";

const store = createStore({
  modules: {
    summary,
  },
});

export default store;
