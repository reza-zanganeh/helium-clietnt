<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="isLoading"></base-spiner>
  <section class="signup d-flex-column__center">
    <div class="heading-box text-center">
      <h1 class="heading-bold">شما هنوز در هلیوم ثبت نام نکرده اید.</h1>
      <p class="heading">لطفا اطلاعات زیر را برای ثبت نام تکمیل کنید.</p>
    </div>
    <form @submit.prevent="submitForm" class="signup-form form-column">
      <div class="form-group">
        <label class="form-group__label heading-2" for="phoneNumber"
          >شماره همراه شما</label
        >
        <input
          required
          class="form-group__input"
          disabled="true"
          type="tel"
          maxlength="11"
          name="phoneNumber"
          id="phoneNumber"
          v-model="phoneNumber"
        />
      </div>
      <div class="form-group">
        <label class="form-group__label require heading-2" for="firstName"
          >این فیلد نمی تواند خالی باشد</label
        >
        <input
          required
          maxlength="30"
          class="form-group__input"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="نام خود را به فارسی وارد کنید"
          v-model.trim="firstName.val"
        />
        <p v-if="!firstName.isValid" class="mb-1 invalid-input-warning">
          این فیلد نمی تواند خالی باشد
        </p>
      </div>
      <div class="form-group">
        <label class="form-group__label require heading-2" for="lastName"
          >این فیلد نمی تواند خالی باشد</label
        >
        <input
          required
          maxlength="30"
          class="form-group__input"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="نام خانوادگی خودرا به فارسی وارد کنید"
          v-model.trim="lastName.val"
        />
        <p v-if="!lastName.isValid" class="mb-1 invalid-input-warning">
          این فیلد نمی تواند خالی باشد
        </p>
      </div>
      <div class="form-group">
        <label class="form-group__label require heading-2" for="email"
          >لطفا ایمیل خود را وارد کنید</label
        >
        <input
          required
          class="form-group__input"
          type="email"
          name="email"
          id="email"
          placeholder="example@helium.com"
          v-model.trim="email.val"
        />
        <p v-if="!email.isValid" class="mb-1 invalid-input-warning">
          ایمیل وارد شده صحیح نمی باشد
        </p>
      </div>
      <div class="form-group">
        <label class="form-group__label require heading-2" for="userName"
          >لطفا نام کاربری دلخواه خود را وارد کنید</label
        >
        <input
          required
          class="form-group__input"
          type="text"
          name="userName"
          id="userName"
          placeholder="نام کاربری را به انگلیسی وارد کنید"
          v-model.trim="userName.val"
        />
        <p v-if="!userName.isValid" class="mb-1 invalid-input-warning">
          نام کاربری باید حداقل دارای 5 کاراکتر باشد
        </p>
      </div>
      <base-button type="submit" mode="btn btn-big">تایید</base-button>
    </form>
  </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useValidation from '../formValidation'
import useDataLoader from '../../../hook/dataLoader'
export default {
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
    const validation = useValidation()
    // data
    const phoneNumber = store.getters['auth/PhonNumber']
    const firstName = reactive({
      val: null,
      isValid: true
    })
    const lastName = reactive({
      val: null,
      isValid: true
    })
    const email = reactive({
      val: null,
      isValid: true
    })
    const userName = reactive({
      val: null,
      isValid: true
    })

    function validate() {
      firstName.isValid = validation.notEmpty(firstName.val)
      lastName.isValid = validation.notEmpty(lastName.val)
      email.isValid = validation.isValidEmail(email.val)
      userName.isValid = validation.isUsername(userName.val)
    }

    const formDataIsValid = computed(function() {
      return (
        firstName.isValid &&
        lastName.isValid &&
        email.isValid &&
        userName.isValid
      )
    })

    async function submitForm() {
      validate()
      if (!formDataIsValid.value) return

      await callAction('auth', 'signup', {
        first_name: firstName.val,
        last_name: lastName.val,
        email: email.val,
        username: userName.val
      })
      if (message.values.length <= 0) {
        route.meta.signup = true
        router.replace('/login/done')
      }
    }
    return {
      phoneNumber,
      firstName,
      lastName,
      email,
      userName,
      submitForm,
      message,
      errorMessageTime,
      confirmMessage,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/_form.scss';
@import '@/assets/sass/components/forms/register/_signup.scss';
</style>
