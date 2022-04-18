/** @format */

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
const searchStore = {
  namespaced: true,
  state() {
    return {
      articles: [],
      tags: [],
      articlesSearchedByTag: [],
      curPage: 1,
      totalPage: null,
      users: []
    }
  },
  getters,
  mutations,
  actions
}

export default searchStore
