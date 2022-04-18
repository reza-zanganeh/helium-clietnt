<template>
  <notif
    v-for="(message, idx) in messages"
    :key="message"
    :time="time"
    :idx="idx"
    :last="messages.length - 1"
    :message="message"
    @close="$emit('close')"
  ></notif>
</template>

<script>
import Notif from './Notif.vue'
export default {
  props: ['time', 'messages'],
  emits: ['close'],
  components: { Notif }
}
</script>
