/** @format */
import util from '../../../util/functions'
export default {
  isOwnProfile(state) {
    const id = util.getUser()?.id
    if (!id) return false
    return state.info.id == id
  },
  articles(state) {
    return state.articles
  },
  marketArticles(state) {
    return state.bookmarkedArticles
  },
  info(state) {
    return state.info
  },
  allInfo(state) {
    return state.allInfo
  },
  requiredInfo(state) {
    if (state.allInfo) return state.allInfo
    return util.getUser()
  },
  loggedUserId() {
    const id = util.getUser()?.id
    return id ? id : false
  },
  loggedUserSelectedFontColor() {
    const font_color = util.getUser()?.font_color
    return font_color ? font_color : false
  },
  loggedUserSelectedFontSize() {
    const font_size = util.getUser()?.font_size
    return font_size ? font_size : false
  },
  haveMoreUserArticle(state) {
    const curPage = state.curPageArticle
    const total = state.totalPageArticle

    if ((curPage === 1 && 1 < total) || (curPage > 1 && curPage < total))
      return true
    else return false
  },
  // fallow
  fallwers(state) {
    return state.fallowers
  },
  ownFallowing(state) {
    return state.ownFallowing
  },
  haveMarkedArticles(state) {
    return state.bookmarkedArticles.length > 0
  },
  ownFallowingIds(state) {
    return state.ownFallowingIds
  }
}
