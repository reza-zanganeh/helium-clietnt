/** @format */
import util from '../../../util/functions'
export default {
  PhonNumber(state) {
    return state.phone_number
  },
  expiresInMinutes(state) {
    return state.expiresInMinutes
  },
  isAuthenticated() {
    const token = util.getToken()
    if (token) {
      return true
    } else return false
  }
}
