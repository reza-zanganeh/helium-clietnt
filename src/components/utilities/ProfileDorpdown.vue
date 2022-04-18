<!-- @format -->

<template>
  <div class="dropdown" @mouseover="open" @click="changeState">
    <author :imgUrl="info.image_url" imgSize="size-2"></author>
    <div class="dropdown-content" v-if="isActive" @mouseleave="close">
      <div class="dropdown-content__header">
        <p class="paragraph-1">{{ info.first_name + ' ' + info.last_name }}</p>
        <p class="paragraph-2">
          <base-button kind="link" :to="'/profile/' + info.id"
            >{{ info.username }} @</base-button
          >
        </p>
      </div>
      <div class="dropdown-content__body">
        <ul class="list">
          <base-button kind="link" to="/article/write">
            <li class="list-item">
              <base-icon name="download-ducoment"></base-icon>
              <p class="paragraph-1">ایجاد مقاله</p>
            </li>
          </base-button>
          <base-button kind="link" to="/profileSteing">
            <li class="list-item">
              <base-icon name="setting"></base-icon>
              <p class="paragraph-1">تنظیمات حساب کاربری</p>
            </li>
          </base-button>
          <base-button @click="logOut" kind="link" to="/">
            <li class="list-item">
              <base-icon name="logout"></base-icon>
              <p class="paragraph-1">خروج از حساب کاربری</p>
            </li>
          </base-button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import author from './author.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  components: { author },
  setup() {
    const store = useStore()
    const router = useRouter()
    const isActive = ref(false)
    function changeState() {
      isActive.value = !isActive.value
    }

    function open() {
      isActive.value = true
    }

    function close() {
      isActive.value = false
    }

    function logOut() {
      store.dispatch('auth/logout')
      router.replace('/')
      setTimeout(() => {
        location.reload()
      }, 0)
    }

    const info = computed(function() {
      return store.getters['users/requiredInfo']
    })

    return {
      isActive,
      changeState,
      logOut,
      open,
      close,
      info
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/util/_profileDropDown.scss';
</style>
