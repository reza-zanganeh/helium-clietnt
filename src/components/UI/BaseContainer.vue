<!-- @format -->
<template>
  <div :class="['container', { small: isSmall, 'min-height': minHeight }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isSmall: {
      type: Boolean,
      require: false,
      default: false
    },
    minHeight: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/_container.scss';
</style>
