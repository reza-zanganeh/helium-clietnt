<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <base-container v-else-if="getData && !isLoading" :isSmall="true">
    <Article
      :id="getData.id"
      :title="getData.title"
      :content="getData.content"
      :image_url="getData.image_url"
      :tags="getData.tags"
      :read_time_minutes="getData.read_time_minutes"
      :created_at="getData.created_at"
      :author_id="getData.author_id"
      :author_name="getData.author_first_name + ' ' + getData.author_last_name"
      :auther_profile_image="getData.auther_profile_image"
      :isMark="getData.isBookmarked"
      :isFallow="getData.isFollowingAuthor"
    />
    <similar-articles
      v-if="getData.fromThisUser.length >= 1"
      :similarArticles="getData.fromThisUser"
    ></similar-articles>
    <comment-items v-if="getData.comments.length > 0"></comment-items>
    <comment-form
      @comment-sended="cleanReplyTo"
      :ToId="replayToId"
      :ToAuthor="replayToAuthor"
    ></comment-form>
  </base-container>
</template>

<script>
import Article from '../components/article/Article.vue'
import SimilarArticles from '../components/article/SimilarArticles.vue'
import CommentItems from '../components/comments/CommentItems.vue'
import CommentForm from '../components/forms/CommentForm.vue'
import { computed } from '@vue/reactivity'
import { provide, ref } from 'vue'
import useDataLoader from '../components/../hook/dataLoader'
import { watch } from '@vue/runtime-core'
export default {
  props: ['id'],
  components: { Article, SimilarArticles, CommentItems, CommentForm },
  setup(props) {
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store
    } = useDataLoader()
    // intial load data
    callAction('article', 'getArticleById', { id: props.id })
    watch(props, function(newId) {
      callAction('article', 'getArticleById', { id: newId.id })
    })
    const getData = computed(function() {
      if (!isLoading.value) {
        const article = store.getters['article/article']
        if (article) return article
      } else return null
    })

    // comment
    const replayToId = ref(null)
    const replayToAuthor = ref(null)
    function replay(ToId, ToAuthor) {
      replayToId.value = ToId
      replayToAuthor.value = ToAuthor
    }
    provide('replay', replay)

    function cleanReplyTo() {
      replayToId.value = null
      replayToAuthor.value = null
    }
    return {
      getData,
      isLoading,
      message,
      errorMessageTime,
      confirmMessage,
      replayToId,
      replayToAuthor,
      cleanReplyTo
    }
  }
}
</script>
