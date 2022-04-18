/** @format */

export default {
  articles(state) {
    return state.articles
  },
  haveArticlesResult(state) {
    return state.articles.length > 0
  },
  users(state) {
    return state.users
  },
  haveUsersResult(state) {
    return state.users.length > 0
  },
  tags(state) {
    return state.tags
  },
  haveTagsResult(state) {
    return state.tags.length > 0
  },
  articlesSearchedByTag(state) {
    return state.articlesSearchedByTag
  }
}
