<!-- @format -->

<template>
  <div class="like">
    <p class="like-count paragraph-3">{{ count }}</p>
    <img :src="LikeIcon" class="icon-small" alt="Like" />
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  props: ['userId', 'articleId', 'commentsCount'],
  setup(props) {
    const count = ref(props.commentsCount)
    const LikeIcon = computed(function() {
      return require(`@/assets/img/icons/comment.svg`)
    })
    return {
      LikeIcon,
      count
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/Icons/_comment.scss';
</style>
