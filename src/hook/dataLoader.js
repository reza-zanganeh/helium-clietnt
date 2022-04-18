/** @format */

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
export default function() {
  const store = useStore()
  const router = useRouter()
  const isLoading = ref(false)
  const message = reactive([])
  const errorMessageTime = 4
  async function callAction(namespace, actionName, payload = null) {
    if (!payload?.readMore) isLoading.value = true
    try {
      if (payload) await store.dispatch(`${namespace}/${actionName}`, payload)
      else await store.dispatch(`${namespace}/${actionName}`)
    } catch (err) {
      if (err.response) {
        if (err.response.status == 404) {
          router.replace('/404')
          return
        }
        if (err.response.status === 401) {
          if (store.getters['auth/isAuthenticated']) {
            setTimeout(() => {
              message.value = null
            }, 2500)
            setTimeout(() => {
              router.replace('/')
              store.dispatch('auth/logout')
              router.replace('/')
              setTimeout(() => {
                location.reload()
              }, 0)
            }, 3000)
          }
        }
        message.values = Array.isArray(err.response.data.message)
          ? [...err.response.data.message]
          : [err.response.data.message]
      }
    }
    if (!payload?.readMore) isLoading.value = false
  }

  function confirmMessage() {
    message.values = []
  }
  return {
    isLoading,
    message,
    errorMessageTime,
    callAction,
    confirmMessage,
    store
  }
}
