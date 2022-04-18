<!-- @format -->

<template>
  <transition name="scroll">
    <a href="#" v-show="show" class="circle">
      <base-icon name="arrow_top"></base-icon>
    </a>
  </transition>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    window.onscroll = function() {
      if (
        window.innerHeight / 2 < window.scrollY &&
        window.scrollY < document.body.clientHeight - window.innerHeight
      )
        show.value = true
      else show.value = false
    }
    const show = ref(false)

    return {
      show
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/_scroll-to-top.scss';
</style>
