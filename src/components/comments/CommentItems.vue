<!-- @format -->
<template>
  <base-tabs
    mode="active disactive-color"
    :tabs="['نظرات']"
    :haveLink="false"
  ></base-tabs>
  <div class="comment-box">
    <comment
      v-for="comment in comments"
      :key="comment.id"
      :id="comment.id"
      :article_id="comment.article_id"
      :author="comment.author"
      :email="comment.email"
      :content="comment.content"
      :created_at="comment.created_at"
      :likes="comment.likes"
      :isLiked="comment.isLiked"
      :isEnd="comment.isEnd"
      :padding="comment.padding"
    ></comment>
  </div>
</template>

<script>
import Comment from './Comment.vue'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'
export default {
  components: { Comment },
  setup() {
    const store = useStore()
    const comments = computed(function() {
      return store.getters['article/comments']
    })

    return {
      comments
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/comments/_comment-items.scss';
</style>
