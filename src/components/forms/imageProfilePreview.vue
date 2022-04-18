<!-- @format -->

<template>
  <div class="imagePreview">
    <div
      class="imagePreviewWrapper"
      :style="{
        background: `${bgImage}`
      }"
      @click="selectImage"
    ></div>
    <label v-if="!disable" for="article-image" class="add-picture">
      <base-icon name="select-imageProfile"></base-icon>
    </label>
    <input
      accept="image/*"
      :disabled="disable"
      ref="fileInput"
      id="article-image"
      type="file"
      @input="pickFile"
    />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import useImagePreview from '../../hook/imagePreview'
export default {
  emits: ['inputImage'],
  props: ['profileImage', 'disable'],
  setup(props, context) {
    const { previewImage, fileInput, selectImage, pickFile } = useImagePreview(
      context
    )

    const bgImage = computed(function() {
      return previewImage.value
        ? `url(${previewImage.value}) no-repeat center/cover`
        : `url(${props.profileImage}) no-repeat center/cover`
    })

    return {
      previewImage,
      fileInput,
      bgImage,
      selectImage,
      pickFile
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/components/forms/imagePreview/_profile.scss';
</style>
