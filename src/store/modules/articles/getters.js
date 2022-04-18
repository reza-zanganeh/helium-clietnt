/** @format */

export default {
  allArticles(state) {
    return state.articles
  },
  article(state) {
    return state.article
  },
  comments(state) {
    const styledComments = []
    function sortComments(comments, padding = 0) {
      if (!comments || comments.length <= 0) return
      for (const [idx, comment] of comments.entries()) {
        const temp = {
          id: comment.id,
          article_id: comment.article_id,
          author: comment.first_name + ' ' + comment.last_name,
          email: comment.email,
          content: comment.content,
          created_at: comment.created_at,
          likes: comment.likes,
          isLiked: comment.isLiked,
          padding
        }
        if (!comment.reply_to && idx !== 0) temp.isEnd = true
        else temp.isEnd = false
        styledComments.push(temp)
        sortComments(comment.replys, padding + 1)
      }
    }
    sortComments(state.article.comments)
    return styledComments
  },
  availableTags(state) {
    return state.availableTags
  },
  pageInfo(state) {
    return {
      curPage: state.curPage,
      totalPage: state.totalPage
    }
  },
  selectedSubject(state) {
    return state.selectedSubject
  },
  SelectedTagId(state) {
    const selectedSubject = state.selectedSubject
    const availableTags = state.availableTags
    const tagsId = []
    for (const sub of selectedSubject) {
      const tag = availableTags.find(tag => {
        if (sub === tag.name) {
          return tag
        }
      })
      tagsId.push(tag.id)
    }
    return tagsId
  },
  suggestedArticles(state) {
    return state.suggestedArticles
  },
  haveMore(state) {
    const curPage = state.curPage
    const total = state.totalPage

    if ((curPage === 1 && 1 < total) || (curPage > 1 && curPage < total))
      return true
    else return false
  },
  currentPage(state) {
    return state.curPage
  },
  newArticleId(state) {
    return state.article.id
  }
}
