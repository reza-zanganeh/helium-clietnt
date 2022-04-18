<!-- @format -->
<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <section v-else-if="getInfo && message.values.length <= 0" class="profile">
    <base-container>
      <img
        class="showcase"
        alt="showcase-picture"
        src="@/assets/img/navbar/profileHeaderImage.jpg"
      />
      <div class="author-info">
        <img
          class="author-info__image"
          :src="getInfo.image_url"
          alt="profile-image"
        />
        <div class="author-info__name">
          <div class="d-flex">
            <p class="paragraph-1">
              {{ getInfo.first_name + ' ' + getInfo.last_name }}
            </p>
            <span class="dot"></span>
            <p class="paragraph-1">{{ getInfo.follower_count }} دنبال کننده</p>
          </div>
          <p class="paragraph-1">{{ getInfo.bio }}</p>
        </div>
        <div class="author-info__action">
          <base-button mode="btn btn-small btn-outline" kind="btn">
            مشاهده وبسایت
            <base-icon name="green-export"></base-icon>
          </base-button>
          <fallow v-if="!isOwnProfile" :big="true" :userId="userId"></fallow>
        </div>
      </div>
      <base-tabs
        :haveLink="true"
        mode="disactive-minWidth"
        :tabs="getTabs"
      ></base-tabs>
      <router-view></router-view>
    </base-container>
  </section>
</template>

<script>
import Fallow from '../components/UI/icons/Fallow.vue'
import { computed, watch, provide } from 'vue'
import useDataLoader from '../components/../hook/dataLoader'
export default {
  components: { Fallow },
  props: ['userId'],
  setup(props) {
    const getTabs = computed(function() {
      return [
        { name: 'درباره', link: `/profile/${props.userId}` },
        { name: 'مقالات', link: `/profile/${props.userId}/articles` },
        { name: 'دنبال کننده ها', link: `/profile/${props.userId}/fallowers` }
      ]
    })
    // load data
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store
    } = useDataLoader()
    provide('isLoading', isLoading)
    callAction('users', 'getPublicProfile', {
      userId: props.userId
    })
    watch(props, function(newProps) {
      callAction('users', 'getPublicProfile', {
        userId: newProps.userId
      })
    })

    const getInfo = computed(function() {
      if (!isLoading.value) return store.getters['users/info']
      return false
    })

    const isOwnProfile = computed(function() {
      return store.getters['users/isOwnProfile']
    })
    return {
      getTabs,
      getInfo,
      isLoading,
      message,
      errorMessageTime,
      confirmMessage,
      isOwnProfile
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/pages/_profile.scss';
</style>
