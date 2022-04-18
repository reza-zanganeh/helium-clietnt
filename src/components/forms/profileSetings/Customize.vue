<!-- @format -->

<template>
  <base-tabs
    :tabs="['شخصی سازی']"
    mode="active disactive-color disactive-minWidth"
  ></base-tabs>
  <section class="customize d-flex">
    <div class="customize-fonts box-center">
      <p class="heading-2-bold">فونت</p>
      <div class="fonts" ref="fontParent">
        <button class="btn">IRAnSans</button>
        <button class="btn font-active">Bahij Helvetica</button>
        <button class="btn">Kalameh</button>
      </div>
    </div>
    <div class="customize-color__fonts box-center">
      <p class="heading-2-bold">رنگ فونت</p>
      <div class="colors" ref="colors" @click="changeFontColor">
        <button
          data-color="#28394f"
          class="color dark-blue-grey"
          :class="{ 'color-active': selectedColor == '#28394f' }"
        ></button>
        <button
          data-color="#000"
          class="color black"
          :class="{ 'color-active': selectedColor == '#000' }"
        ></button>
        <button
          data-color="#808080"
          class="color warm-grey"
          :class="{ 'color-active': selectedColor == '#808080' }"
        ></button>
        <button
          data-color="#56838a"
          class="color blue-grey"
          :class="{ 'color-active': selectedColor == '#56838a' }"
        ></button>
      </div>
    </div>
    <div class="customize-size__fonts">
      <p class="heading-2-bold">سایز فونت</p>
      <div class="sizes" @click="changeFontSize" ref="sizes">
        <button
          data-size="sm"
          :class="[
            'size',
            'small',
            'btn',
            { 'size-active': selectedSize === 'sm' }
          ]"
        >
          Sm
        </button>
        <button
          data-size="md"
          :class="[
            'size',
            'medium',
            'btn',
            { 'size-active': selectedSize === 'md' }
          ]"
        >
          Md
        </button>
        <button
          data-size="lg"
          :class="[
            'size',
            'large',
            'btn',
            { 'size-active': selectedSize === 'lg' }
          ]"
        >
          Lg
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  props: ['fontColor', 'fontSize', 'fontFamily'],
  emits: ['updateInfo'],
  setup(props, { emit }) {
    // customize color
    const colors = ref(null)
    const selectedColor = ref(null)
    function changeFontColor(el) {
      const target = el.target
      if (!target.classList.contains('color')) return
      selectedColor.value = target.dataset.color
      emit('updateInfo', { newColor: selectedColor.value })
    }

    // customize fontsize
    const sizes = ref(null)
    const selectedSize = ref(null)
    function changeFontSize(el) {
      const target = el.target
      if (!target.classList.contains('size')) return
      selectedSize.value = target.dataset.size
      emit('updateInfo', { newSize: selectedSize.value })
    }

    onMounted(function() {
      selectedColor.value = props.fontColor
      selectedSize.value = props.fontSize
    })
    return {
      changeFontColor,
      colors,
      selectedColor,
      sizes,
      changeFontSize,
      selectedSize
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/profileSetings/_customize.scss';
</style>
