/** @format */
import util from '../../../util/functions'
/** @format */
export default {
  async fakeAction() {
    return
  },
  async search(context, payload) {
    const { search_text } = payload
    const response = await util.instanceAxios.post('/search', {
      search_text
    })

    const { articles, users, tags } = response.data

    for (const article of articles) {
      context.commit('addDate', article)
    }

    context.commit('setArticles', {
      articles
    })

    context.commit('setUsers', {
      users
    })

    context.commit('setTags', {
      tags
    })
  },
  async getArticleSearchedByTags(context, payload) {
    const requestedPage = payload.page
    if (context.state.tags.length <= 0) {
      return
    }

    const tagsId = context.state.tags.map(tag => tag.id)

    const response = await util.instanceAxios.get(
      `/articles?tags=${tagsId.join(',')}&page=${requestedPage}`
    )
    const responseData = response.data

    responseData.data.forEach(article => context.commit('addDate', article))
    if (payload?.readMore)
      context.commit('setArticlesSearchedByTag', {
        articlesSearchedByTag: responseData.data,
        readMore: true
      })
    else
      context.commit('setArticlesSearchedByTag', {
        articlesSearchedByTag: responseData.data,
        readMore: false
      })

    context.commit('setPageInfo', {
      curPage: responseData.currentPage,
      totalPage: responseData.totalPage
    })
  }
}
