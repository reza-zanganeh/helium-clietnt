<!-- @format -->

<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-spiner v-if="!onUpdate && isLoading"></base-spiner>
  <base-container v-if="info">
    <div class="page-heading">
      <base-icon name="setting-bold"></base-icon>
      <h1 class="heading-bold">تنظیمات حساب کاربری</h1>
    </div>
    <about-you
      @enableEdit="changeEditableSection"
      @updateInfo="updateInfo"
      :editMode="editModeSection"
      :name="info.first_name"
      :family="info.last_name"
      :bio="info.bio"
      :profileImage="info.image_url"
    ></about-you>
    <short-story
      @enableEdit="changeEditableSection"
      @updateInfo="updateInfo"
      :editMode="editModeSection"
      :shortStory="info.about"
    ></short-story>
    <social-address
      @enableEdit="changeEditableSection"
      @updateInfo="updateInfo"
      :editMode="editModeSection"
      :username="info.username"
      :link="'http://helium.ir/' + info.username"
      :email="info.email"
      :whatsapp="info.instagram_link"
      :instagram="info.whatsapp_link"
    ></social-address>
    <base-tabs
      :tabs="['دنبال کنندگان']"
      mode="active disactive-color disactive-minWidth"
    ></base-tabs>
    <section class="fallowers d-flex">
      <div class="col">
        <h3 class="heading-2-bold mb-1">حریم شخصی</h3>
        <div class="customize-checkbox">
          <p class="paragraph-1">
            افراد برای دنبال کردن شما نیاز به تایید شما رادارند
          </p>
          <input type="checkbox" name="isShow" id="isShow" />
          <label for="isShow"></label>
        </div>
      </div>
      <div class="col">
        <h3 class="heading-2-bold mb-1">استخزاج دنبال کنندگان</h3>
        <div class="fallowers-export">
          <p class="paragraph-1">
            از افراد دنبال کننده خود یک لیست تهیه کنید
          </p>
          <base-icon name="export"></base-icon>
        </div>
      </div>
    </section>
    <customize
      :fontColor="'#' + info.font_color"
      :fontSize="info.font_size"
      @updateInfo="updateInfo"
    ></customize>
  </base-container>
</template>
<script>
import { computed, ref } from '@vue/reactivity'
import AboutYou from '../components/forms/profileSetings/AboutYou.vue'
import ShortStory from '../components/forms/profileSetings/ShortStory.vue'
import SocialAddress from '../components/forms/profileSetings/SocialAddress.vue'
import Customize from '../components/forms/profileSetings/Customize.vue'
import useDataLoader from '../components/../hook/dataLoader'
export default {
  components: { AboutYou, ShortStory, SocialAddress, Customize },
  setup() {
    const {
      store,
      message,
      errorMessageTime,
      confirmMessage,
      callAction,
      isLoading
    } = useDataLoader()
    callAction('users', 'getAllInfo')
    const onUpdate = ref(false)
    // handle editable section
    const editModeSection = ref(null)

    function changeEditableSection(section) {
      editModeSection.value = section
    }

    async function updateInfo(newData) {
      onUpdate.value = true
      if (editModeSection.value === 'about')
        await callAction('users', 'updateAboutYou', newData)
      if (editModeSection.value === 'shortStory')
        await callAction('users', 'updateShortStory', newData)
      if (editModeSection.value === 'socialAddress')
        await callAction('users', 'updateSocialAdress', newData)
      if (newData?.newSize) await callAction('users', 'updateFontSize', newData)
      if (newData?.newColor)
        await callAction('users', 'updateFontColor', newData)

      if (message.values && message.values.length <= 0) {
        editModeSection.value = null
      }
      onUpdate.value = false
    }

    const info = computed(function() {
      return store.getters['users/allInfo']
    })

    return {
      editModeSection,
      changeEditableSection,
      updateInfo,
      message,
      onUpdate,
      isLoading,
      errorMessageTime,
      confirmMessage,
      info
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/pages/_profile-setings.scss';
</style>
