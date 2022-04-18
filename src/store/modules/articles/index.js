/** @format */
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const articleStore = {
  namespaced: true,
  state() {
    return {
      articles: [],
      suggestedArticles: [],
      article: {},
      curPage: 1,
      totalPage: null,
      availableTags: [],
      selectedSubject: []
    }
  },
  mutations,
  actions,
  getters
}

export default articleStore
