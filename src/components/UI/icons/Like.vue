<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <div class="like">
    <p class="like-count paragraph-3">{{ count }}</p>
    <img :src="LikeIcon" @click="chageState" class="icon-small" alt="Like" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import useDataLoader from '../../../hook/dataLoader'
export default {
  props: ['commentId', 'articleId', 'likeCount', 'isLike'],
  setup(props) {
    const {
      message,
      errorMessageTime,
      callAction,
      confirmMessage
    } = useDataLoader()
    const isLiked = ref(props.isLike)
    const count = ref(props.likeCount)
    const LikeIcon = computed(function() {
      if (isLiked.value) return require(`@/assets/img/icons/liked.svg`)
      else return require(`@/assets/img/icons/like.svg`)
    })
    async function chageState() {
      if (isLiked.value) {
        if (props.commentId) {
          await callAction('users', 'unLikeComment', {
            comment_id: props.commentId
          })
        } else if (props.articleId) {
          await callAction('users', 'unLikeArticle', {
            article_id: props.articleId
          })
        }
        if (message.values.length <= 0) {
          isLiked.value = false
          count.value--
        }
      } else {
        if (props.commentId) {
          await callAction('users', 'likeComment', {
            comment_id: props.commentId
          })
        } else if (props.articleId) {
          await callAction('users', 'likeArticle', {
            article_id: props.articleId
          })
        }
        if (message.values.length <= 0) {
          isLiked.value = true
          count.value++
        }
      }
    }
    return {
      LikeIcon,
      chageState,
      count,
      message,
      errorMessageTime,
      confirmMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/Icons/_like.scss';
</style>
