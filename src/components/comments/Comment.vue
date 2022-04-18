<!-- @format -->

<template>
  <div :class="['comment-item', { wrapper: isEnd }]" :style="paddingRight">
    <p class="paragraph-1">{{ author }}</p>
    <div class="comment-item__header">
      <div class="comment-item__header-info paragraph-3">
        <date :day="date.day" :month="date.month" :year="date.year"></date>
        <span class="dot"></span>
        <span class="study-time">۷ دقیقه مطالعه</span>
      </div>
      <div class="comment-item__header-action">
        <Like :commentId="id" :likeCount="likes" :isLike="isLiked" />
        <base-icon
          style="mr-2"
          name="replay-comment"
          @click="replay(id, author)"
        ></base-icon>
      </div>
    </div>
    <p class="comment-item__content heading-2">{{ content }}</p>
  </div>
</template>

<script>
import Like from '../UI/icons/Like.vue'
import { computed, inject } from 'vue'
export default {
  props: [
    'id',
    'article_id',
    'author',
    'email',
    'content',
    'created_at',
    'likes',
    'isLiked',
    'isEnd',
    'padding'
  ],
  components: {
    Like
  },
  setup(props) {
    const paddingRight = computed(function() {
      return { paddingRight: props.padding * 5 + '%' }
    })

    const date = computed(() => {
      const now = new Date(props.created_at)
      const optaion = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
      const formatedDate = new Intl.DateTimeFormat('fa-IR', optaion).format(now)
      const date = formatedDate.split(' ')
      return {
        day: date[0],
        month: date[1],
        year: date[2]
      }
    })

    // add comment
    const replay = inject('replay')

    return {
      paddingRight,
      date,
      replay
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/comments/_comment.scss';
</style>
