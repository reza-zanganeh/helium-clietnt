<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message"
    @close="confirmMessage"
    v-if="message.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <section class="otp-request d-flex-column__center">
    <div class="heading-box text-center">
      <h1 class="heading-bold">ورود / ثبت نام</h1>
    </div>
    <form
      @submit.prevent="submitFormData"
      class="register-form__stepOne form-column"
    >
      <div class="form-group">
        <label class="form-group__label heading-2" for="tel"
          >لطفا شماره تلفن همراه خودرا وارد کنید</label
        >
        <input
          maxlength="11"
          v-model="phoneNumber.val"
          class="form-group__input"
          type="tel"
          name="tel"
          id="tel"
          placeholder="مثال  :  ۰۹۱۵۱۲۳۴۵۶۷"
        />
        <p v-if="!phoneNumber.isValid" class="mb-1 invalid-input-warning">
          لطفا یک شماره همراه صحیح وارد کنید
        </p>
      </div>
      <base-button type="submit" mode="btn btn-big">ادامه</base-button>
    </form>
  </section>
</template>

<script>
import useValidation from '../formValidation'
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDataLoader from '../../../hook/dataLoader'
export default {
  setup() {
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage
    } = useDataLoader()
    const validation = useValidation()
    const phoneNumber = reactive({
      val: null,
      isValid: true
    })
    const router = useRouter()
    const route = useRoute()

    function validate() {
      phoneNumber.isValid = validation.isPhoneNumber(phoneNumber.val)
    }

    const inputDataIsValid = computed(function() {
      return phoneNumber.isValid
    })

    async function submitFormData() {
      validate()
      if (!inputDataIsValid.value) return
      await callAction('auth', 'otpRequest', { phone_number: phoneNumber.val })
      if (message.length <= 0) {
        route.meta.outRequest = true
        router.replace('/login/otpVerify')
      }
    }

    if (route.query.correction) {
      route.meta.outRequest = false
    }

    return {
      phoneNumber,
      submitFormData,
      isLoading,
      message,
      errorMessageTime,
      confirmMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/_form.scss';
@import '@/assets/sass/components/forms/register/_otp-request.scss';
</style>
