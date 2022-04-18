<!-- @format -->
<template>
  <the-heaher></the-heaher>
  <main>
    <notif-items
      :time="errorMessageTime"
      :messages="message.values"
      @close="confirmMessage"
      v-if="message.values.length > 0"
    ></notif-items>
    <base-spiner v-if="isLoading"></base-spiner>
    <router-view></router-view>
  </main>
  <the-footer></the-footer>
  <scroll-to-top></scroll-to-top>
</template>

<script>
import TheHeaher from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import ScrollToTop from './components/UI/icons/ScrollToTop.vue'
import useDataLoader from './hook/dataLoader'
import { onMounted } from '@vue/runtime-core'
export default {
  components: {
    TheHeaher,
    TheFooter,
    ScrollToTop
  },
  setup() {
    const {
      message,
      errorMessageTime,
      isLoading,
      callAction,
      confirmMessage
    } = useDataLoader()
    // initial values
    callAction('users', 'getOwnFallowing')
    callAction('article', 'getTags')

    onMounted(function() {
      callAction('users', 'setSelectedFontColor')
      callAction('users', 'setSelectedFontSize')
    })
    return {
      message,
      errorMessageTime,
      isLoading,
      confirmMessage
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/base/_base.scss';
@import '@/assets/sass/base/_typography.scss';
@import '@/assets/sass/base/_utilities.scss';
</style>
