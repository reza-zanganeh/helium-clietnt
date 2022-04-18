<!-- @format -->

<template>
  <header>
    <nav class="navbar" @click="changeAuth">
      <base-container>
        <div class="logo-box">
          <base-button kind="link"
            ><img src="@/assets/img/navbar/logo.svg" alt="logo"
          /></base-button>
        </div>
        <div class="navbar-feature" v-if="auth()">
          <form
            @submit.prevent="search"
            class="form-group"
            v-show="isActiveSearch"
          >
            <button type="submit">
              <base-icon name="arrow-right"></base-icon>
            </button>
            <input
              class="form-group__input"
              type="text"
              v-model.trim="searchKey"
            />
          </form>
          <base-icon name="search" @click="changeStateSeach"></base-icon>
          <base-icon name="save" to="/bookmark" kind="link"></base-icon>
          <base-icon name="notification"></base-icon>
          <profile-dorpdown></profile-dorpdown>
        </div>
        <base-button
          v-else-if="!isInsideRegisterStep"
          to="/login"
          kind="link"
          mode="btn small-btn"
          >ورود / ثبت نام</base-button
        >
      </base-container>
    </nav>
  </header>
</template>
<script>
import ProfileDorpdown from '../utilities/ProfileDorpdown.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: { ProfileDorpdown },
  setup() {
    const store = useStore()
    const router = useRouter()
    // search logic
    const isActiveSearch = ref(false)
    const searchKey = ref('')
    function changeStateSeach() {
      isActiveSearch.value = !isActiveSearch.value
    }
    function search() {
      if (!searchKey.value) return
      const temp = searchKey.value
      searchKey.value = ''
      isActiveSearch.value = false
      router.push({
        name: 'search',
        params: {
          searchKey: temp
        }
      })
    }
    //
    const route = useRouter()
    const isInsideRegisterStep = computed(function() {
      const path = route.currentRoute.value.fullPath
      return path.startsWith('/login')
    })
    //
    const auth = function() {
      return store.getters['auth/isAuthenticated']
    }

    return {
      changeStateSeach,
      isActiveSearch,
      searchKey,
      search,
      auth,
      isInsideRegisterStep
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/layout/_theHeader.scss';
</style>
