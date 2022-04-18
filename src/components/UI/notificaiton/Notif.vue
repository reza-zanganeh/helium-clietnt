<!-- @format -->

<template>
  <teleport to="body">
    <div class="notif" :style="notifStyle">
      <p class="message paragraph-1">
        {{ message }}
      </p>
      <progres-bar @end="closeNotif" :time="time + idx / 2"></progres-bar>
    </div>
  </teleport>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import ProgresBar from '../../utilities/ProgresBar.vue'
export default {
  props: ['message', 'time', 'idx', 'last'],
  emits: ['close'],
  components: { ProgresBar },
  setup(props, { emit }) {
    const closeNotif = function() {
      show.value = false
      if (props.idx == props.last) {
        setTimeout(() => emit('close'), 600)
      }
    }
    const show = ref(false)
    setTimeout(() => (show.value = true), 0)
    const notifStyle = computed(function() {
      if (show.value) {
        return {
          top: props.idx * 13 + 1 + 'rem',
          opacity: '1'
        }
      } else {
        return {
          top: '-12rem',
          opacity: '0'
        }
      }
    })
    return {
      notifStyle,
      closeNotif
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/_notif.scss';
</style>
