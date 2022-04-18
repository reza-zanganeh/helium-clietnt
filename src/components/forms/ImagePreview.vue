<!-- @format -->

<template>
  <div class="imagePreview">
    <div
      :class="['imagePreviewWrapper', { activeMaximize: imageIsMax }]"
      :style="{
        background: `${bgImage}`
      }"
      @click="selectImage"
    ></div>
    <label for="article-image" class="add-picture">
      <img :src="require('@/assets/img/icons/add-picture.svg')" />
    </label>
    <input
      accept="image/*"
      ref="fileInput"
      id="article-image"
      type="file"
      @input="pickFile"
    />

    <div class="maximize">
      <img
        :src="require('@/assets/img/icons/maximize.svg')"
        @click="maximizePicture"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity'
import useImagePreview from '../../hook/imagePreview'
import { inject } from '@vue/runtime-core'
export default {
  emits: ['inputImage'],
  setup(ـ, context) {
    const imageIsMax = ref(false)
    const showImagePreview = inject('showImagePreview')
    const { previewImage, fileInput, selectImage, pickFile } = useImagePreview(
      context
    )

    const bgImage = computed(function() {
      return previewImage.value && showImagePreview.value
        ? `url(${previewImage.value}) no-repeat center/cover`
        : `url(${require('@/assets/img/icons/template-imge-preview.svg')}) no-repeat center,#fafcfc`
    })

    function maximizePicture() {
      if (!previewImage.value) return
      imageIsMax.value = !imageIsMax.value
    }

    return {
      previewImage,
      fileInput,
      bgImage,
      selectImage,
      pickFile,
      maximizePicture,
      imageIsMax
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/components/forms/imagePreview/_add-article.scss';
</style>
