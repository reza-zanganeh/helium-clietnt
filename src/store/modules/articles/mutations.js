/** @format */
import util from '../../../util/functions.js'
export default {
  addDate: util.addDate,
  setArticles(state, payload) {
    if (payload?.readMore)
      state.articles = [...state.articles, ...payload.articles]
    else state.articles = payload.articles
  },
  setArticle(state, payload) {
    state.article = payload.article
  },
  setSuggestedArticles(state, payload) {
    if (payload?.readMore)
      state.suggestedArticles = [
        ...state.suggestedArticles,
        ...payload.suggestedArticles
      ]
    else state.suggestedArticles = payload.suggestedArticles
  },
  setTags(state, payload) {
    state.availableTags = payload.tags
  },
  addSubject(state, payload) {
    const tag = payload.tag
    if (tag && !state.selectedSubject.includes(tag)) {
      state.selectedSubject.push(tag)
    }
  },
  removeSubject(state, payload) {
    const tag = payload.tag
    if (state.selectedSubject.length <= 0) return
    else {
      const idx = state.selectedSubject.findIndex(t => t === tag)
      state.selectedSubject.splice(idx, 1)
    }
  },
  setPageInfo(state, payload) {
    state.curPage = payload.curPage
    state.totalPage = payload.totalPage
  },
  setNewArticleId(state, payload) {
    state.article.id = payload.id
  },
  addComment(state, payload) {
    const { comment } = payload
    if (!comment.reply_to) {
      state.article.comments.push(comment)
      return
    }
    function addComment(comments, newComment) {
      if (!comments || comments.length <= 0) return
      for (const comment of comments) {
        if (comment.id == newComment.reply_to) {
          comment.replys.push(newComment)
          return
        } else addComment(comment.replys, newComment)
      }
    }
    addComment(state.article.comments, comment)
  }
}
