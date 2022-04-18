<!-- @format -->

<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click="tryClose"></div>
    <transition name="popup">
      <div v-if="show" class="popUp">
        <base-icon @click="tryClose" name="times"></base-icon>
        <p class="popUp-title heading-2-bold">{{ title }}</p>
        <div class="popUp-body">
          <slot name="body"></slot>
        </div>
        <div class="popUp-action">
          <slot name="action"> </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ['title', 'show', 'time'],
  emits: ['close'],
  setup(_, context) {
    function tryClose() {
      context.emit('close')
    }
    return {
      tryClose
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/_popup.scss';
</style>
