<!-- @format -->

<template>
  <div class="date">
    <span> {{ day }} </span>
    <span>{{ month }}</span>
    <span>{{ year }}</span>
  </div>
</template>

<script>
export default {
  props: ['day', 'month', 'year']
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/util/_date.scss';
</style>
