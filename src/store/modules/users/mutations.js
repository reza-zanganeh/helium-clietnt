/** @format */
import util from '../../../util/functions'
export default {
  addDate: util.addDate,
  setInfo(state, payload) {
    state.info = payload.info
  },
  setAllInfo(state, payload) {
    state.allInfo = payload.info
  },
  setArticles(state, payload) {
    if (payload?.readMore)
      state.articles = [...state.articles, ...payload.articles]
    else state.articles = payload.articles
  },
  setMarkedArticles(state, payload) {
    state.bookmarkedArticles = payload.markedArtilces
  },
  setArticlePage(state, payload) {
    state.curPageArticle = payload.curPageArticle
    state.totalPageArticle = payload.totalPageArticle
  },
  // fallow
  setFallowersPage(state, payload) {
    state.curPageFallowers = payload.curPageFallowers
    state.totalPageFallowers = payload.totalPageFallowers
  },
  setFallwers(state, payload) {
    state.fallowers = payload.fallowers
  },
  setOwnFallowingPage(state, payload) {
    state.curPageOwnFallowing = payload.curPageOwnFallowing
    state.totalPageOwnFallowing = payload.totalPageOwnFallowing
  },
  setOwnFallowing(state, payload) {
    state.ownFallowingIds = []
    payload.ownFallowing.forEach(user => {
      state.ownFallowingIds.push(user.id)
    })
    state.ownFallowing = payload.ownFallowing
  },
  addFallowinId(state, payload) {
    if (state.ownFallowingIds.includes(payload.id)) return
    state.ownFallowingIds.push(+payload.id)
  },
  removeFallowingId(state, payload) {
    if (state.ownFallowingIds.length <= 0) return
    const idx = state.ownFallowingIds.findIndex(id => id == payload.id)
    state.ownFallowingIds.splice(idx, 1)
    state.ownFallowing.splice(idx, 1)
  },
  unMark(state, payload) {
    if (state.bookmarkedArticles.length <= 0) return
    const idx = state.bookmarkedArticles.findIndex(
      article => article.id == payload.id
    )
    state.bookmarkedArticles.splice(idx, 1)
  },
  // customize
  setSelectedFontSize(state, payload) {
    const { selectedSize } = payload
    switch (selectedSize) {
      case 'sm': {
        this.commit('users/setFontSize', {
          phone: '33.75%',
          tabPort: '40%',
          tabLand: '46.25%',
          normal: '52.5%'
        })
        break
      }
      case 'md': {
        this.commit('users/setFontSize', {
          phone: '43.75%',
          tabPort: '50%',
          tabLand: '56.25%',
          normal: '62.5%'
        })
        break
      }
      case 'lg': {
        this.commit('users/setFontSize', {
          phone: '53.75%',
          tabPort: '60%',
          tabLand: '66.25%',
          normal: '72.5%'
        })
        break
      }
    }
  },
  setFontSize(_, payload) {
    const { phone, tabPort, tabLand, normal } = payload
    document.documentElement.style.setProperty(' --phone-size', phone)
    document.documentElement.style.setProperty('--tab-port-size', tabPort)
    document.documentElement.style.setProperty('--tab-land-size', tabLand)
    document.documentElement.style.setProperty('--normal-size', normal)
  },
  setSelectedFontColor(_, payload) {
    const selectedColor = payload.selectedColor.startsWith('#')
      ? payload.selectedColor
      : '#' + payload.selectedColor
    document.documentElement.style.setProperty(
      '--main-font-color',
      selectedColor
    )
  }
}
