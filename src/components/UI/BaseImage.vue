<!-- @format -->

<template>
  <img :alt="alt" :src="path" :class="mode" />
</template>

<script>
export default {
  props: ['path', 'alt', 'mode']
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/components/UI/_image.scss';
</style>
