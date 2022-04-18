/** @format */
import util from '../../../util/functions'
export default {
  async login(context, payload) {
    const token = payload.token
    util.setToken(token)
    await context.dispatch('users/getAllInfo', null, { root: true })
    await context.dispatch('users/setSelectedFontColor', null, { root: true })
    await context.dispatch('users/setSelectedFontSize', null, { root: true })
  },
  logout() {
    util.removeToken()
    util.removeUser()
  },
  async otpRequest(context, payload) {
    const { phone_number } = payload
    const response = await util.instanceAxios.post(`/otp-request`, {
      phone_number
    })
    context.state.expiresInMinutes = response.data.expiresInMinutes
    context.commit('setPhonNumber', { phone_number })
  },
  async otpVerify(context, payload) {
    //if user exists this function becime login
    const { otp_code } = payload
    const phone_number = context.getters.PhonNumber

    const response = await util.instanceAxios.post('/otp-verify', {
      phone_number,
      otp_code: String(otp_code)
    })

    const data = response.data

    if (data?.accessToken) {
      await context.dispatch('login', { token: data.accessToken })
    }
  },
  async signup(context, payload) {
    //if user exists this function becime login
    const { username, first_name, last_name, email } = payload
    const Phone_number = context.getters.PhonNumber

    const response = await util.instanceAxios.post('/signup', {
      phone_number: String(Phone_number),
      username,
      first_name,
      last_name,
      email
    })

    const data = response.data

    await context.dispatch('login', { token: data.accessToken })
  }
}
