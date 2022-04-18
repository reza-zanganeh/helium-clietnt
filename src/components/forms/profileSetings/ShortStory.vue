<!-- @format -->

<template>
  <section class="short-story horizontal-line">
    <div class="short-story__header">
      <label for="shortStory" class="heading-2-bold">شرح کوتاه</label>
      <p v-if="editMode === null" class="paragraph-1">حداکثر ۱۶۰ کاراکتر</p>
      <p v-if="editMode === sectionName" class="paragraph-1">
        ۱۶۰ / {{ characterCounter }}
      </p>
      <base-button
        v-show="editMode === sectionName || editMode === null"
        mode="btn btn-circle"
        @click="action"
      >
        <base-icon v-show="editMode === null" name="edit"></base-icon>
        <base-icon v-show="editMode === sectionName" name="confirm"></base-icon>
      </base-button>
    </div>
    <div class="short-story__body">
      <textarea
        name="shortStory"
        id="shortStory"
        :class="['input', { disableInput: editMode !== sectionName }]"
        :disabled="editMode !== sectionName"
        v-model.trim="inputShortStory.val"
      ></textarea>
      <p v-if="!inputShortStory.isValid" class="invalid-input-warning">
        شرح باید حداکثر ۱۶۰ کاراکتر باشد
      </p>
    </div>
  </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { ref, computed } from 'vue'
import useValidation from '../formValidation'
export default {
  props: ['editMode', 'shortStory'],
  emits: ['enableEdit', 'updateInfo'],
  setup(props, context) {
    const sectionName = ref('shortStory')
    const validation = useValidation()
    const inputShortStory = reactive({
      val: props.shortStory,
      isValid: true
    })

    function validate() {
      inputShortStory.isValid = validation.isShortStory(inputShortStory.val)
    }

    const inputDataIsValid = computed(function() {
      return inputShortStory.isValid
    })

    function action() {
      if (props.editMode === null) enableEdit()
      else if (props.editMode === sectionName.value) submitData()
    }

    function submitData() {
      validate()
      if (!inputDataIsValid.value) return
      const newData = {
        newShortStory: inputShortStory.val
      }
      context.emit('updateInfo', newData)
    }

    function enableEdit() {
      context.emit('enableEdit', sectionName.value)
    }

    const characterCounter = computed(function() {
      const count = inputShortStory.val ? inputShortStory.val.length : 0
      return new Intl.NumberFormat('fa-IR').format(count)
    })
    return {
      sectionName,
      action,
      inputShortStory,
      characterCounter
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/profileSetings/_short-story.scss';
</style>
