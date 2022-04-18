<!-- @format -->

<template>
  <base-tabs
    mode="disactive-color disactive-minWidth"
    :tabs="['درباره شما']"
    :haveLik="false"
  ></base-tabs>
  <section class="about-you horizontal-line">
    <image-profile-preview
      @inputImage="changeProfileImage"
      :profileImage="profileImage"
      :disable="editMode !== sectionName"
    ></image-profile-preview>
    <div class="about-you__body">
      <div class="d-flex">
        <div class="input-group name">
          <label for="name" class="heading-2">نام</label>
          <input
            id="name"
            type="text"
            :class="['input', { disableInput: editMode !== sectionName }]"
            :disabled="editMode !== sectionName"
            v-model.trim="inputName.val"
          />
          <p v-if="!inputName.isValid" class="invalid-input-warning">
            نام باید حداقل ۳ کاراکتر داشته باشد
          </p>
        </div>
        <div class="input-group  family">
          <label for="family" class="heading-2">نام خانوادگی</label>
          <input
            id="family"
            type="text"
            :class="['input', { disableInput: editMode !== sectionName }]"
            :disabled="editMode !== sectionName"
            v-model="inputFamily.val"
          />
          <p v-if="!inputFamily.isValid" class="invalid-input-warning">
            نام خانوادگی باید حداقل ۳ کاراکتر داشته باشد
          </p>
        </div>
      </div>
      <div class="input-group  bio">
        <label for="bio" class="heading-2">شرح کوتاه</label>
        <input
          id="bio"
          type="text"
          :class="['input', { disableInput: editMode !== sectionName }]"
          :disabled="editMode !== sectionName"
          v-model="inputBio.val"
        />
        <p v-if="!inputBio.isValid" class="invalid-input-warning">
          شرح کوتاه حداکثر دارای ۱۰۰ کاراکتر می باشد
        </p>
      </div>
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
import { reactive, ref } from '@vue/reactivity'
import { computed } from 'vue'
import imageProfilePreview from '../imageProfilePreview.vue'
import useValidation from '../formValidation'
export default {
  props: ['editMode', 'name', 'family', 'bio', 'profileImage'],
  emits: ['enableEdit', 'updateInfo'],
  components: { imageProfilePreview },
  setup(props, context) {
    const sectionName = ref('about')
    const validation = useValidation()
    const inputName = reactive({
      val: props.name,
      isValid: true
    })
    const inputFamily = reactive({
      val: props.family,
      isValid: true
    })
    const inputBio = reactive({
      val: props.bio,
      isValid: true
    })
    const inputImage = ref(null)

    function validate() {
      inputName.isValid = validation.isName(inputName.val)
      inputFamily.isValid = validation.isName(inputFamily.val)
      inputBio.isValid = validation.isBio(inputBio.val)
    }

    const inputDataIsValid = computed(function() {
      return inputName.isValid && inputFamily.isValid && inputBio.isValid
    })

    function action() {
      if (props.editMode === null) enableEdit()
      else if (props.editMode === sectionName.value) submitData()
    }

    function submitData() {
      validate()
      if (!inputDataIsValid.value) return
      // submit data
      const newData = {
        first_name: inputName.val,
        last_name: inputFamily.val,
        bio: inputBio.val,
        image: inputImage.value ? inputImage.value : null
      }
      context.emit('updateInfo', newData)
    }

    function enableEdit() {
      context.emit('enableEdit', sectionName.value)
    }

    function changeProfileImage(image) {
      inputImage.value = image
    }

    return {
      changeProfileImage,
      inputName,
      inputFamily,
      inputBio,
      action,
      sectionName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/profileSetings/_about-you.scss';
</style>
