<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <section class="otp-verify d-flex-column__center">
    <div class="heading-box">
      <h1 class="heading-bold">ارسال کد تایید</h1>
    </div>
    <p class="heading-2">
      کد تایید به شماره {{ '  ' + phoneNumber + '  ' }} ارسال شد.
    </p>
    <p
      @click="correctionPhoneNumber"
      class="paragraph-2 tealish-color cursor_pointer"
    >
      اصلاح شماره تلفن همراه
    </p>
    <form
      ref="codeForm"
      @submit.prevent="submitForm"
      class="register-form form-column"
    >
      <p class="heading-2">لطفا کد 5 رقمی ارسال شده را وارد نمایید</p>
      <div class="input-code" @keyup="goToNextInput">
        <input
          class="input-code__item"
          type="text"
          name="figure-1"
          size="1"
          maxlength="1"
        />
        <input
          class="input-code__item"
          type="text"
          name="figure-1"
          size="1"
          maxlength="1"
        />
        <input
          class="input-code__item"
          type="text"
          name="figure-1"
          size="1"
          maxlength="1"
        />
        <input
          class="input-code__item"
          type="text"
          name="figure-1"
          size="1"
          maxlength="1"
        />
        <input
          class="input-code__item"
          type="text"
          name="figure-1"
          maxlength="1"
          size="1"
        />
      </div>
      <p v-if="!codeIsvalid" class="mb-1 invalid-input-warning">
        لطفا کد را بصورت کامل وارد کنید
      </p>
      <base-button type="submit" mode="btn btn-big">تایید</base-button>
    </form>
    <p class="paragraph-2 timer">
      زمان باقی مانده
      <timer :time="expiresInMinutes">
        <template #default="timer">
          <span>
            {{ timer.time }}
          </span>
        </template>
      </timer>
    </p>
    <p class="paragraph-2 sned-again mb-4">
      کد دریافت نکردید؟
      <span class="tealish-color  cursor_pointer" @click="sendAgain"
        >ارسال مجدد</span
      >
    </p>
  </section>
</template>

<script>
import Timer from '../../utilities/Timer.vue'
import { computed, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import useDataLoader from '../../../hook/dataLoader'
export default {
  components: { Timer },
  setup() {
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store
    } = useDataLoader()
    const route = useRoute()
    const router = useRouter()
    const codeForm = ref(null)
    const codeIsvalid = ref(true)
    function getCode() {
      const formData = [...new FormData(codeForm.value)]
      const code = formData.map(field => field[1]).join('')
      if (code.length === 5) return +code
      else {
        codeIsvalid.value = false
        return false
      }
    }
    async function submitForm() {
      const code = getCode()
      if (!code) return
      await callAction('auth', 'otpVerify', {
        otp_code: code
      })
      if (message.values.length <= 0) {
        if (store.getters['auth/isAuthenticated']) {
          router.replace('/')
        } else {
          route.meta.otpVerify = true
          router.replace('/login/signup')
        }
      }
    }

    async function sendAgain() {
      await callAction('auth', 'otpRequest', {
        phone_number: phoneNumber.value
      })
    }

    function goToNextInput(e) {
      const target = e.target
      if (e.code === 'Backspace') {
        const previousInput = e.target.previousSibling
        if (previousInput) {
          target.blur()
          previousInput.focus()
        }
        return
      }
      if (target.value.trim() === '' || !Number.isFinite(+target.value)) return
      const nextInput = e.target.nextSibling
      if (nextInput) {
        target.blur()
        nextInput.focus()
      }
    }

    const phoneNumber = computed(function() {
      return store.getters['auth/PhonNumber']
    })

    const expiresInMinutes = computed(function() {
      return store.getters['auth/expiresInMinutes']
    })

    function correctionPhoneNumber() {
      router.replace(`/login?correction=${true}`)
    }

    return {
      submitForm,
      codeForm,
      codeIsvalid,
      message,
      isLoading,
      goToNextInput,
      errorMessageTime,
      confirmMessage,
      phoneNumber,
      expiresInMinutes,
      correctionPhoneNumber,
      sendAgain
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/_form.scss';
@import '@/assets/sass/components/forms/register/_otp-verify.scss';
</style>
