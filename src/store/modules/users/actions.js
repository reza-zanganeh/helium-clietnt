/** @format */
import util from '../../../util/functions'
export default {
  async getPublicProfile(context, payload) {
    const { userId } = payload

    const response = await util.instanceAxios.get(`profile?id=${userId}`)
    const { data } = response
    const {
      id,
      username,
      first_name,
      last_name,
      image_url,
      bio,
      about,
      email,
      whatsapp_link,
      instagram_link,
      follower_count,
      articles,
      followers
    } = data
    context.commit('setInfo', {
      info: {
        id,
        username,
        first_name,
        last_name,
        image_url,
        bio,
        about,
        email,
        whatsapp_link,
        instagram_link,
        follower_count
      }
    })

    articles.data.forEach(article => {
      context.commit('addDate', article)
    })

    context.commit('setArticles', { articles: articles.data })
    context.commit('setArticlePage', {
      curPageArticle: articles.currentPage,
      totalPageArticle: articles.totalPage
    })
    context.commit('setFallwers', { fallowers: followers })
  },
  async getUserArticles(context, payload) {
    const curPage = context.state.curPageArticle
    const requestedPage = payload.page
    const userId = context.state.info.id

    if (curPage == requestedPage && context.state.articles.length > 0) return

    const response = await util.instanceAxios.get(
      `/articles?author_id=${userId}&page=${requestedPage}`
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
    context.commit('setArticlePage', {
      curPage: responseData.currentPage,
      totalPage: responseData.totalPage
    })
  },
  async getMarkedArticles(context) {
    const response = await util.instanceAxios.get('/bookmark')

    const { data } = response

    data.forEach(article => {
      context.commit('addDate', article)
    })
    context.commit('setMarkedArticles', {
      markedArtilces: data
    })
  },
  async getOwnFallowing(context) {
    // get my fallower with token
    if (
      !context.state.haveNewFallowing ||
      !context.rootGetters['auth/isAuthenticated']
    )
      return
    const response = await util.instanceAxios.get('/followings')
    const { data } = response
    context.state.haveNewFallowing = false
    context.commit('setOwnFallowing', {
      ownFallowing: data
    })
  },
  async getUserFallowers(context, payload) {
    const requestedPage = payload.page
    if (requestedPage == 1) return
    const user_id = context.state.info.id
    const response = await util.instanceAxios.get(`/followers?id=${user_id}`)

    const { data } = response
    context.commit('setFallwers', {
      fallowers: data
    })
  },
  async getAllInfo(context) {
    const response = await util.instanceAxios.get('/user')
    const responseData = response.data
    context.commit('addDate', responseData)
    context.commit('setAllInfo', { info: responseData })
    const allInfo = context.rootState.users.allInfo
    const requeiredInfo = {
      id: allInfo.id,
      first_name: allInfo.first_name,
      last_name: allInfo.last_name,
      username: allInfo.username,
      image_url: allInfo.image_url,
      font_color: allInfo.font_color,
      font_size: allInfo.font_size
    }
    util.setUser(requeiredInfo)
  },
  // icon actions
  // bookmark
  async markArticle(_, payload) {
    const { article_id } = payload
    await util.instanceAxios.post('/bookmark', { article_id })
  },
  async unMarkArticle(context, payload) {
    const { article_id } = payload
    await util.instanceAxios({
      method: 'DELETE',
      url: '/bookmark',
      data: { article_id }
    })
    context.commit('unMark', { id: article_id })
  },
  // fallow
  async fallow(context, payload) {
    const { user_id } = payload
    await util.instanceAxios.post('/follows', { user_id })
    context.state.haveNewFallowing = true
    context.commit('addFallowinId', {
      id: user_id
    })
  },
  async unFallow(context, payload) {
    const { user_id } = payload
    await util.instanceAxios({
      method: 'DELETE',
      url: '/follows',
      data: { user_id }
    })
    context.commit('removeFallowingId', {
      id: user_id
    })
  },
  // like article
  async likeArticle(_, payload) {
    const { article_id } = payload
    await util.instanceAxios.post('/like', { article_id })
  },
  async unLikeArticle(_, payload) {
    const { article_id } = payload
    await util.instanceAxios({
      method: 'DELETE',
      url: '/like',
      data: { article_id }
    })
  },
  async likeComment(_, payload) {
    const { comment_id } = payload
    await util.instanceAxios.post('/likecomment', { comment_id })
  },
  async unLikeComment(_, payload) {
    const { comment_id } = payload
    await util.instanceAxios({
      method: 'DELETE',
      url: '/likecomment',
      data: { comment_id }
    })
  },
  // update profile settings
  async updateAboutYou(context, payload) {
    const { first_name, last_name } = payload
    let { bio, image } = payload
    if (!bio) bio = ''
    if (!image) image = ''
    const formData = new FormData()
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    formData.append('bio', bio)
    formData.append('image', image)

    const response = await util.instanceAxios.patch('/user', formData)
    console.log(first_name, last_name, image, bio)
    console.log([...formData])
    context.rootState.users.allInfo.bio = bio
    context.rootState.users.allInfo.first_name = first_name
    context.rootState.users.allInfo.last_name = last_name
    context.rootState.users.allInfo.image_url = response.data.image_url
    util.updateUser({
      first_name,
      last_name,
      bio
    })
  },
  async updateShortStory(context, payload) {
    let { newShortStory: about } = payload
    if (!about) about = ''
    await util.instanceAxios.patch('/about', {
      about
    })
    context.rootState.users.allInfo.about = about
  },
  async updateSocialAdress(context, payload) {
    let { email, whatsapp_link, instagram_link } = payload
    if (!whatsapp_link) whatsapp_link = ''
    if (!instagram_link) instagram_link = ''
    console.log(email, whatsapp_link, instagram_link)
    await util.instanceAxios.patch('/social-links', {
      email,
      whatsapp_link,
      instagram_link
    })
    context.rootState.users.allInfo.email = email
    context.rootState.users.allInfo.whatsapp_link = whatsapp_link
    context.rootState.users.allInfo.instagram_link = instagram_link
  },
  async updateFontSize(context, payload) {
    const { newSize: font_size } = payload
    await util.instanceAxios.patch('/font-size', {
      font_size
    })
    context.rootState.users.allInfo.font_size = font_size
    context.commit('setSelectedFontSize', { selectedSize: font_size })
    util.updateUser({
      font_size
    })
  },
  async updateFontColor(context, payload) {
    const { newColor: font_color } = payload
    await util.instanceAxios.patch('/font-color', {
      font_color: font_color.slice(1)
    })
    context.rootState.users.allInfo.font_color = font_color.slice(1)
    context.commit('setSelectedFontColor', { selectedColor: font_color })
    util.updateUser({
      font_color
    })
  },
  // customize
  setSelectedFontColor(context) {
    if (!context.rootGetters['auth/isAuthenticated']) return

    const selectedColor = util.getUser()?.font_color
    if (!selectedColor) return
    context.commit('setSelectedFontColor', { selectedColor: selectedColor })
  },
  setSelectedFontSize(context) {
    if (!context.rootGetters['auth/isAuthenticated']) return

    const selectedSize = util.getUser()?.font_size

    if (!selectedSize) return
    context.commit('setSelectedFontSize', { selectedSize })
  }
}
