/** @format */

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const auth = {
  namespaced: true,
  state() {
    return {
      phone_number: null,
      expiresInMinutes: null
    }
  },
  getters,
  actions,
  mutations
}

export default auth
