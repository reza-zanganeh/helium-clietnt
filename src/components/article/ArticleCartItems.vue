<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <section v-else-if="getArticles && message.values.length <= 0">
    <article-cart
      v-for="article in getArticles"
      :key="article.id"
      :id="article.id"
      :title="article.title"
      :description="article.content"
      :image_url="article.image_url"
      :tags="article.tags"
      :read_time_minutes="article.read_time_minutes"
      :author_id="article.author_id"
      :author_name="article.author_first_name + ' ' + article.author_last_name"
      :auther_profile_image="article.auther_profile_image"
      :date="article.created_at"
      :likes="article?.likes"
      :isMark="article?.isBookmarked"
      :isLike="article?.isLiked"
      :isFallow="article?.isFollowingAuthor"
      :comments_count="article?.comments_count"
      :mode="mode"
    ></article-cart>
    <div class="pagination mt-5">
      <base-button
        @click="goToNextPage"
        v-show="existsMoreArticles && !readMore"
        mode="btn-read-more btn"
        >مشاهده بیشتر
      </base-button>
      <base-spiner size="medium" v-if="readMore"></base-spiner>
    </div>
  </section>
  <p v-if="!haveArticles && !isLoading" class="heading-1 text-center">
    هیچ مقاله ای وجود ندارد
  </p>
</template>

<script>
import { computed, ref, toRef } from '@vue/reactivity'
import ArticleCart from './ArticleCart.vue'
import useDataLoader from '../../hook/dataLoader'
import { watch } from '@vue/runtime-core'
import BaseButton from '../UI/BaseButton.vue'
export default {
  components: { ArticleCart, BaseButton },
  props: ['store', 'action', 'getters', 'page', 'mode', 'haveMore'],
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
    const page = toRef(props.page)

    callAction(props.store, props.action, {
      page: props.page
    })
    const selectedSubject = store.getters['article/selectedSubject']
    watch(selectedSubject, function() {
      callAction(props.store, props.action, {
        page: props.page
      })
    })

    const searchedTags = computed(function() {
      return store.getters['search/tags']
    })
    watch(searchedTags, function() {
      callAction(props.store, props.action, {
        page: props.page
      })
    })

    const getArticles = computed(function() {
      if (!isLoading.value)
        return store.getters[`${props.store}/${props.getters}`]
      return false
    })

    const haveArticles = computed(function() {
      if (getArticles.value.length > 0) return true
      return false
    })
    // haveMore
    const existsMoreArticles = computed(function() {
      if (!props.haveMore) return false
      return store.getters[`${props.store}/${props.haveMore}`]
    })

    const readMore = ref(false)
    async function goToNextPage() {
      page._object++
      readMore.value = true
      await callAction(props.store, props.action, {
        page: page._object,
        readMore: true
      })
      readMore.value = false
    }
    return {
      getArticles,
      isLoading,
      message,
      errorMessageTime,
      confirmMessage,
      existsMoreArticles,
      goToNextPage,
      haveArticles,
      readMore
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/components/article/_article-cart-items.scss';
</style>
