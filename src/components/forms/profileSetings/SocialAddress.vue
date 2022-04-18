<!-- @format -->

<template>
  <section class="social-address d-flex">
    <div class="col">
      <h3 class="heading-2-bold mb-1">نام کاربری و لینک</h3>
      <p class="paragraph-1">{{ username }}</p>
      <p class="paragraph-1">{{ link }}</p>
    </div>
    <div class="col">
      <h3 class="heading-2-bold mb-1">لینک های شما</h3>
      <ul class="social-address__items">
        <li class="social-address__item name">
          <base-icon name="email"></base-icon>
          <input
            id="email"
            type="email"
            :class="['input', { disableInput: editMode !== sectionName }]"
            :disabled="editMode !== sectionName"
            v-model.trim="inputEmail.val"
          />
        </li>
        <li
          v-if="!inputEmail.isValid"
          class="social-address__item invalid-input-warning mr-1"
        >
          لطفا یک ایمیل صحیح وارد کنید
        </li>
        <li class="social-address__item name">
          <base-icon name="whatsapp"></base-icon>
          <input
            id="whatsapp"
            type="text"
            :class="['input', { disableInput: editMode !== sectionName }]"
            :disabled="editMode !== sectionName"
            v-model.trim="inputWhatsapp.val"
          />
        </li>
        <li
          v-if="!inputWhatsapp.isValid"
          class="social-address__item invalid-input-warning mr-1"
        >
          لطفا یک ادرس واتساپ صحیح وارد کنید
        </li>
        <li class="social-address__item name">
          <base-icon name="instagram"></base-icon>
          <input
            id="instagram"
            type="text"
            :class="['input', { disableInput: editMode !== sectionName }]"
            :disabled="editMode !== sectionName"
            v-model.trim="inputInstagram.val"
          />
        </li>
        <li
          class="social-address__item invalid-input-warning mr-1"
          v-if="!inputInstagram.isValid"
        >
          لطفا یک ادرس اینستاگرام صحیح وارد کنید
        </li>
      </ul>
    </div>
    <base-button
      v-show="editMode === sectionName || editMode === null"
      mode="btn btn-circle"
      @click="action"
    >
      <base-icon v-show="editMode === null" name="edit"></base-icon>
      <base-icon v-show="editMode === sectionName" name="confirm"></base-icon>
    </base-button>
  </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { ref, computed } from 'vue'
import useValidation from '../formValidation'
export default {
  props: ['editMode', 'username', 'link', 'email', 'whatsapp', 'instagram'],
  emits: ['enableEdit', 'updateInfo'],
  setup(props, context) {
    const sectionName = ref('socialAddress')
    const validation = useValidation()
    const inputEmail = reactive({
      val: props.email,
      isValid: true
    })
    const inputWhatsapp = reactive({
      val: props.whatsapp,
      isValid: true
    })
    const inputInstagram = reactive({
      val: props.instagram,
      isValid: true
    })

    function validate() {
      inputEmail.isValid = validation.isValidEmail(inputEmail.val)
      inputWhatsapp.isValid = true
      inputInstagram.isValid = true
    }

    const inputDataIsValid = computed(function() {
      return (
        inputInstagram.isValid && inputEmail.isValid && inputWhatsapp.isValid
      )
    })

    function action() {
      if (props.editMode === null) enableEdit()
      else if (props.editMode === sectionName.value) submitData()
    }

    function submitData() {
      validate()
      if (!inputDataIsValid.value) return
      const newData = {
        instagram_link: inputInstagram.val,
        email: inputEmail.val,
        whatsapp_link: inputWhatsapp.val
      }
      context.emit('updateInfo', newData)
    }

    function enableEdit() {
      context.emit('enableEdit', sectionName.value)
    }
    return {
      sectionName,
      action,
      inputEmail,
      inputWhatsapp,
      inputInstagram
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/profileSetings/_social-address.scss';
</style>
