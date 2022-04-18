<!-- @format -->

<template>
  <div v-if="!isLoading" class="profile-about">
    <p class="paragraph-1">
      {{ getInfo.first_name + ' ' + getInfo.last_name }}
    </p>
    <p class="paragraph-1 mb-4">
      {{ getInfo.about }}
    </p>
    <ul class="social-etworks" v-if="getInfo.email">
      <li class="social-network">
        <base-icon name="email"></base-icon>
        <a class="paragraph-1" href="#">
          {{ getInfo.email }}
        </a>
      </li>
      <li class="social-network" v-if="getInfo.whatsapp_link">
        <base-icon name="whatsapp"></base-icon>
        <a class="paragraph-1" href="#">
          {{ getInfo.whatsapp_link }}
        </a>
      </li>
      <li class="social-network" v-if="getInfo.whatsapp_link">
        <base-icon name="instagram"></base-icon>
        <a class="paragraph-1" href="#">
          {{ getInfo.instagram_link }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const isLoading = inject('isLoading')
    const getInfo = computed(function() {
      if (!isLoading.value) return store.getters['users/info']
      return false
    })

    return {
      getInfo,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/profile/_about.scss';
</style>
