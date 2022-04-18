<!-- @format -->

<template>
  <div v-if="!isLoggedUser">
    <notif-items
      :time="errorMessageTime"
      :messages="message.values"
      @close="confirmMessage"
      v-if="message.values.length > 0"
    ></notif-items>
    <button
      v-if="!big"
      :class="['fallow', { isFallow: isFallowed, 'fallow-small': small }]"
      @click="chageState"
    >
      {{ btnText }}
    </button>
    <base-button v-else mode="btn btn-small" kind="btn" @click="chageState">
      {{ btnText }}
      <base-icon v-if="!isFallowed" name="pluse"></base-icon>
    </base-button>
  </div>
</template>

<script>
import { computed } from 'vue'
import useDataLoader from '../../../hook/dataLoader'
export default {
  props: ['big', 'small', 'userId'],
  setup(props) {
    const {
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store
    } = useDataLoader()
    const isFallowed = computed(function() {
      return store.getters['users/ownFallowingIds'].includes(+props.userId)
    })
    const isLoggedUser = computed(function() {
      const loggedUserId = store.getters['users/loggedUserId']
      return loggedUserId && loggedUserId == props.userId
    })
    async function chageState() {
      if (isFallowed.value) {
        await callAction('users', 'unFallow', {
          user_id: props.userId
        })
      } else {
        await callAction('users', 'fallow', {
          user_id: props.userId
        })
      }
    }

    const btnText = computed(function() {
      if (isFallowed.value) return 'دنبال شده'
      else return 'دنبال کردن'
    })

    return {
      isFallowed,
      chageState,
      message,
      errorMessageTime,
      confirmMessage,
      btnText,
      isLoggedUser
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/UI/Icons/_fallow.scss';
</style>
