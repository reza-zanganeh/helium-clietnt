<!-- @format -->

<template>
  <base-button v-if="isLink" kind="link" :to="profileLink">
    <div class="author">
      <img v-if="imgUrl" :src="imgUrl" alt="author-img" :class="imgSize" />
      <p v-if="name" class="paragraph-2">{{ name }}</p>
    </div>
  </base-button>
  <div v-else class="author">
    <img v-if="imgUrl" :src="imgUrl" alt="author-img" :class="imgSize" />
  </div>
</template>

<script>
export default {
  props: ['imgUrl', 'name', 'id', 'imgSize', 'isLink'],
  computed: {
    profileLink() {
      return '/profile/' + this.id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/util/_author.scss';
</style>
