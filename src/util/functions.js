/** @format */
import Cookies from 'js-cookie'
import axios from 'axios'
const TOKEN_KEY = 'vwGHUNWO52lmXkeqXxtuJ/jCjdUp9WUBpghv1w5TA=='

const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}

const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  return token ? token : null
}

const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

const setUser = user => {
  Cookies.set('user', JSON.stringify(user), { expires: 1 })
}

const getUser = () => {
  const user = Cookies.get('user')
  return user ? JSON.parse(user) : null
}

const updateUser = newValues => {
  const user = getUser()
  if (!user) return
  for (const [key, value] of Object.entries(newValues)) {
    user[key] = value
  }
  setUser(user)
}

const removeUser = () => {
  Cookies.remove('user')
}

const getDate = function(time) {
  const now = new Date(time)
  const optaion = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  return new Intl.DateTimeFormat('fa-IR', optaion).format(now)
}
const addDate = (_, article) => {
  const date = getDate(article.created_at).split(' ')
  article.created_at = {
    day: date[0],
    month: date[1],
    year: date[2]
  }
}

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3000'
})

instanceAxios.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default {
  setToken,
  removeToken,
  instanceAxios,
  getToken,
  setUser,
  updateUser,
  removeUser,
  getUser,
  addDate
}
