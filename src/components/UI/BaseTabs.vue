<!-- @format -->
<template>
  <div v-if="haveLink" class="tabBar">
    <div
      :class="['tab', mode, { active: path === tab.link }]"
      v-for="(tab, idx) in tabs"
      :key="idx"
    >
      <base-button kind="link" mode="heading-2" :to="tab.link">
        {{ tab.name }}
      </base-button>
    </div>
  </div>
  <div v-else class="tabBar">
    <div
      :class="['tab', 'heading-2', mode, { active: idx == active - 1 }]"
      v-for="(tab, idx) in tabs"
      :key="idx"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  components: { BaseButton },
  props: ['tabs', 'mode', 'active', 'haveLink'],
  setup() {
    const router = useRouter()
    const path = computed(function() {
      return router.currentRoute.value.fullPath
    })

    return {
      path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/_tabBar.scss';
</style>
