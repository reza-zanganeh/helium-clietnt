<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <section>
    <p v-if="ToId && ToAuthor" class="heading-2 mt-4">پاسخ به {{ ToAuthor }}</p>
    <form class="comment-form" @submit.prevent="submitForm">
      <div class="inline-form" v-if="!auth">
        <div class="form-group">
          <label
            for="firstname"
            class="form-group__label require-after heading-2"
            >نام</label
          >
          <input
            v-model.trim="firstname.val"
            type="text"
            id="firstname"
            class="form-group__input form-group__input-small"
          />
          <p v-if="!firstname.isValid" class="invalid-input-warning">
            لطفا یک نام صحیح وارد کنید
          </p>
        </div>
        <div class="form-group">
          <label
            for="lasttname"
            class="form-group__label require-after heading-2"
            >نام خانوادگی</label
          >
          <input
            v-model.trim="lastname.val"
            type="text"
            id="lastname"
            class="form-group__input form-group__input-small"
          />
          <p v-if="!lastname.isValid" class="invalid-input-warning">
            لطفا یک نام خانوادگی صحیح وارد کنید
          </p>
        </div>
        <div class="form-group">
          <label for="email" class="form-group__label require-after heading-2"
            >ایمیل</label
          >
          <input
            v-model.trim="email.val"
            type="text"
            id="email"
            class="form-group__input"
          />
          <p v-if="!email.isValid" class="invalid-input-warning">
            لطفا یک ایمیل صحیح وارد کنید
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="content" class="form-group__label require-after heading-2"
          >نظر دادن</label
        >
        <textarea
          v-model.trim="commetnContent.val"
          id="content"
          cols="30"
          rows="10"
          class="form-group__input form-group__input-textarea"
        ></textarea>
        <p v-if="!commetnContent.isValid" class="invalid-input-warning">
          متن کامنت باید حداقل درای ۴ کاراکتر باشد
        </p>
      </div>
      <base-button v-if="!isLoading" mode="btn btn-medium" type="submit"
        >ثبت نظر</base-button
      >
      <base-spiner size="medium" v-else></base-spiner>
    </form>
  </section>
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import useFormValidation from './formValidation'
import useDataLoader from '../../hook/dataLoader'
export default {
  props: ['ToId', 'ToAuthor'],
  emits: ['comment-sended'],
  setup(props, { emit }) {
    const {
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store,
      isLoading
    } = useDataLoader()
    const validation = useFormValidation()
    // form validation
    const firstname = reactive({
      val: '',
      isValid: true
    })
    const lastname = reactive({
      val: '',
      isValid: true
    })
    const email = reactive({
      val: '',
      isValid: true
    })
    const commetnContent = reactive({
      val: '',
      isValid: true
    })

    const formDataIsValid = computed(function() {
      return (
        firstname.isValid &&
        lastname.isValid &&
        email.isValid &&
        commetnContent.isValid
      )
    })
    const formDataValidation = function() {
      if (auth.value) {
        firstname.isValid = true
        lastname.isValid = true
        email.isValid = true
      } else {
        firstname.isValid = validation.isName(firstname.val)
        lastname.isValid = validation.isName(lastname.val)
        email.isValid = validation.isValidEmail(email.val)
      }
      commetnContent.isValid = validation.isCommentContent(commetnContent.val)
    }

    const submitForm = async function() {
      formDataValidation()
      if (!formDataIsValid.value) return
      if (auth.value) {
        firstname.val = null
        lastname.val = null
        email.val = null
      }
      const comment = {
        first_name: firstname.val,
        last_name: lastname.val,
        email: email.val,
        content: commetnContent.val,
        reply_to: props.ToId ? props.ToId : null
      }
      await callAction('article', 'addComment', comment)
      if (message.values.length <= 0) {
        firstname.val = ''
        lastname.val = ''
        email.val = ''
        commetnContent.val = ''
        message.value = 'کامنت شما با موفقیت افزوده گردید'
        setTimeout(function() {
          confirmMessage()
          emit('comment-sended')
        }, 2000)
      }
    }
    //
    const auth = computed(function() {
      return store.getters['auth/isAuthenticated']
    })
    return {
      firstname,
      lastname,
      email,
      commetnContent,
      submitForm,
      message,
      errorMessageTime,
      confirmMessage,
      auth,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/_form.scss';
@import '@/assets/sass/components/forms/_comment-form.scss';
</style>
