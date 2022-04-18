<!-- @format -->

<template>
  <div v-if="haveTagsResult" class="subjects">
    <span class="tag tag-big" v-for="(tag, idx) in tags" :key="idx">{{
      tag.name
    }}</span>
  </div>
  <article-cart-items
    v-if="haveTagsResult"
    store="search"
    action="getArticleSearchedByTags"
    getters="articlesSearchedByTag"
    page="1"
    haveMore="haveMore"
  ></article-cart-items>
  <p class="heading-1 text-center mt-5" v-if="!haveTagsResult">
    نتیجه ای برای جستجوی شما یافت نشد
  </p>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ArticleCartItems from '../article/ArticleCartItems.vue'
export default {
  components: { ArticleCartItems },
  setup() {
    const store = useStore()
    const tags = computed(function() {
      return store.getters['search/tags']
    })

    const haveTagsResult = computed(function() {
      return store.getters['search/haveTagsResult']
    })
    return { tags, haveTagsResult }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/search/_subjects.scss';
</style>
