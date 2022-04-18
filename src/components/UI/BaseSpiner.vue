<!-- @format -->

<template>
  <div :class="['spinner', size]">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['size']
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/components/UI/_spinner.scss';
</style>
