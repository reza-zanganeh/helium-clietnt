<!-- @format -->

<template>
  <button v-if="kind === 'btn'" :class="mode" :type="type">
    <slot></slot>
  </button>
  <router-link v-else-if="kind === 'link'" :class="mode" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      require: false
    },
    kind: {
      type: String,
      require: false,
      default: 'btn'
    },
    to: {
      type: String,
      require: false,
      default: '/home'
    },
    type: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/_btns.scss';
</style>
