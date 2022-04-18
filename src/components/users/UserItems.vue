<!-- @format -->
<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <section v-else-if="getUsers && message.values.length <= 0">
    <div :class="ClassName">
      <user
        v-for="(user, idx) in getUsers"
        :key="user.id"
        :isEnd="idx === getUsers.length"
        :small="mode === 'small'"
        :bio="user.bio"
        :first_name="user.first_name"
        :last_name="user.last_name"
        :id="user.id"
        :image_url="user.image_url"
        :isFallow="user.isFollowingAuthor"
      ></user>
    </div>
    <div class="pagination mt-5">
      <base-button
        @click="goToNextPage"
        v-show="existsMoreArticles"
        mode="btn-read-more btn"
        >مشاهده بیشتر
      </base-button>
    </div>
  </section>
  <p class="heading-1 text-center" v-if="!haveUsers && !isLoading">
    هیچ کاربری وجود ندارد
  </p>
</template>

<script>
import User from './User.vue'
import useDataLoader from '../../hook/dataLoader'
import { computed, toRef } from 'vue'
export default {
  props: ['store', 'action', 'getters', 'page', 'mode', 'haveMore'],
  components: { User },
  setup(props) {
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store
    } = useDataLoader()
    const page = toRef(props.page)
    callAction(props.store, props.action, {
      page: props.page
    })

    const getUsers = computed(function() {
      if (!isLoading.value)
        return store.getters[`${props.store}/${props.getters}`]
      return false
    })

    const haveUsers = computed(function() {
      if (getUsers.value.length > 0) return true
      return false
    })

    const existsMoreArticles = computed(function() {
      if (!props.haveMore) return false
      return store.getters[`${props.store}/${props.haveMore}`]
    })

    function goToNextPage() {
      page.value++
      callAction(props.store, props.action, {
        page: page.value,
        readMore: true
      })
    }

    const ClassName = computed(function() {
      if (props.mode === 'small') return 'user-carts-small'
      else return 'user-carts'
    })

    return {
      ClassName,
      getUsers,
      isLoading,
      message,
      errorMessageTime,
      confirmMessage,
      existsMoreArticles,
      goToNextPage,
      haveUsers
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/users/_items.scss';
</style>
