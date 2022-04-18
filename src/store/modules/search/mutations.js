/** @format */
import util from '../../../util/functions.js'
export default {
  addDate: util.addDate,
  setArticles(state, payload) {
    state.articles = payload.articles
  },
  setUsers(state, payload) {
    state.users = payload.users
  },
  setTags(state, payload) {
    state.tags = payload.tags
  },
  setArticlesSearchedByTag(state, payload) {
    if (payload?.readMore)
      state.articlesSearchedByTag = [
        ...state.articlesSearchedByTag,
        ...payload.articlesSearchedByTag
      ]
    else state.articlesSearchedByTag = payload.articlesSearchedByTag
  },
  setPageInfo(state, payload) {
    state.curPage = payload.curPage
    state.totalPage = payload.totalPage
  }
}
