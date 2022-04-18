<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <img
    :src="bookmarkIcon"
    @click="chageState"
    class="icon-small"
    alt="bookmark"
  />
</template>

<script>
import { computed, ref } from 'vue'
import useDataLoader from '../../../hook/dataLoader'
export default {
  props: ['articleId', 'isMark'],
  setup(props) {
    const {
      message,
      errorMessageTime,
      callAction,
      confirmMessage
    } = useDataLoader()
    const isMarket = ref(props.isMark)
    const bookmarkIcon = computed(function() {
      if (isMarket.value) return require(`@/assets/img/icons/bookmarked.svg`)
      else return require(`@/assets/img/icons/bookmark.svg`)
    })
    async function chageState() {
      if (isMarket.value) {
        await callAction('users', 'unMarkArticle', {
          article_id: props.articleId
        })
        if (message.values.length <= 0) {
          isMarket.value = false
        }
      } else {
        await callAction('users', 'markArticle', {
          article_id: props.articleId
        })
        if (message.values.length <= 0) {
          isMarket.value = true
        }
      }
    }
    return {
      bookmarkIcon,
      chageState,
      message,
      errorMessageTime,
      confirmMessage
    }
  }
}
</script>
