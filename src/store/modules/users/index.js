/** @format */

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const userStore = {
  namespaced: true,
  state() {
    return {
      info: null,
      allInfo: null,
      articles: null,
      bookmarkedArticles: [],
      curPageArticle: 1,
      totalPageArticle: null,
      fallowers: null,
      curPageFallowers: 1,
      totalPageFallowers: null,
      ownFallowing: [],
      ownFallowingIds: [],
      haveNewFallowing: true,
      curPageOwnFallowing: 1,
      totalPageOwnFallowing: null
    }
  },
  actions,
  getters,
  mutations
}

export default userStore
