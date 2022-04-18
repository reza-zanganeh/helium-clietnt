/** @format */
import util from '../../../util/functions'
export default {
  async getArticleById(context, payload) {
    const id = payload.id

    const response = await util.instanceAxios.get(`/articles?id=${id}`)

    const responseData = response.data
    context.commit('addDate', responseData.data)
    responseData.data.fromThisUser.forEach(article =>
      context.commit('addDate', article)
    )
    // setter to set article
    context.commit('setArticle', {
      article: responseData.data
    })
  },
  async getArticles(context, payload) {
    const requestedPage = payload.page

    const response = await util.instanceAxios.get(
      `/articles?page=${requestedPage}`
    )
    const responseData = response.data
    responseData.data.forEach(article => context.commit('addDate', article))

    if (payload?.readMore)
      context.commit('setArticles', {
        articles: responseData.data,
        readMore: true
      })
    else
      context.commit('setArticles', {
        articles: responseData.data,
        readMore: false
      })
    context.commit('setPageInfo', {
      curPage: responseData.currentPage,
      totalPage: responseData.totalPage
    })
  },
  async getArticleByTags(context, payload) {
    const requestedPage = payload.page
    const tagsId = context.getters.SelectedTagId

    let url = `/articles?page=${requestedPage}`

    if (tagsId && tagsId.length > 0) {
      url = `/articles?tags=${tagsId.join(',')}&page=${requestedPage}`
    }
    const response = await util.instanceAxios.get(url)
    const responseData = response.data

    responseData.data.forEach(article => context.commit('addDate', article))
    if (payload?.readMore)
      context.commit('setSuggestedArticles', {
        suggestedArticles: responseData.data,
        readMore: true
      })
    else
      context.commit('setSuggestedArticles', {
        suggestedArticles: responseData.data,
        readMore: false
      })

    context.commit('setPageInfo', {
      curPage: responseData.currentPage,
      totalPage: responseData.totalPage
    })
  },
  // tags
  async getTags(context) {
    const response = await util.instanceAxios.get(`/tags`)
    const responseData = response.data

    context.commit('setTags', {
      tags: responseData.data
    })
  },
  // comment
  async addComment(context, payload) {
    const article_id = context.state.article.id
    const { first_name, last_name, content, email, reply_to } = payload
    let comment = {
      article_id,
      first_name,
      last_name,
      email,
      content,
      reply_to
    }
    const response = await util.instanceAxios.post('/comments', comment)
    comment = response.data
    comment.replys = []
    comment.likes = 0
    context.commit('addComment', {
      comment
    })
  },
  async addArticle(context, payload) {
    // find tag id
    const selectedSubject = payload.tags
    const tagsId = []
    for (const sub of selectedSubject) {
      if (sub.id) {
        tagsId.push(sub.id)
      } else {
        const response = await util.instanceAxios.post('/tags', {
          tag_name: sub.name
        })
        const data = response.data.data
        const newId = data.id
        context.state.availableTags.push(data.name)
        tagsId.push(newId)
      }
    }
    const { title, content, image } = payload
    const formdata = new FormData()
    formdata.append('image', image)
    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('tags', tagsId.join(','))

    const response = await util.instanceAxios.post('/articles', formdata)
    const data = response.data
    const id = data.article_id
    context.commit('setNewArticleId', {
      id
    })
  }
}
