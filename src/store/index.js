/** @format */

import { createStore } from "vuex";
import articleModule from "./modules/articles/index.js";
import userModule from "./modules/users/index";
import authModule from "./modules/auth/index";
import searchModule from "./modules/search/index";
const store = createStore({
  modules: {
    article: articleModule,
    users: userModule,
    auth: authModule,
    search: searchModule,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
