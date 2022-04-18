<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <base-container>
    <div class="searchKeyword">
      <p class="heading-2">نتایج برای</p>
      <form class="searchKeyword-form" @submit.prevent="newSaerch">
        <input
          class="searchKeyword-input heading-bold"
          type="text"
          v-model.trim="searchKey"
        />
      </form>
    </div>
    <base-tabs
      mode="disactive-minWidth"
      :tabs="getTabs"
      :haveLink="true"
    ></base-tabs>
    <router-view></router-view>
  </base-container>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDataLoader from '../components/../hook/dataLoader'
export default {
  setup() {
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage
    } = useDataLoader()
    const route = useRoute()
    const router = useRouter()
    const searchKey = ref()
    searchKey.value = route.params.searchKey

    callAction('search', 'search', { search_text: searchKey.value })
    router.push('/search')

    function newSaerch() {
      if (!searchKey.value) return
      callAction('search', 'search', { search_text: searchKey.value })
    }

    const getTabs = computed(function() {
      return [
        { name: 'مقالات', link: '/search' },
        { name: 'افراد', link: '/search/users' },
        { name: 'موضوعات', link: '/search/subjects' }
      ]
    })
    return {
      getTabs,
      searchKey,
      newSaerch,
      confirmMessage,
      message,
      errorMessageTime,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/pages/_search-results.scss';
</style>
