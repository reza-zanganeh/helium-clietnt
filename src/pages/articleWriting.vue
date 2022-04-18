<!-- @format -->
<template>
  <notif-items
    :time="errorMessageTime"
    :messages="message.values"
    @close="confirmMessage"
    v-if="message.values.length > 0"
  ></notif-items>
  <base-popup @close="confirmMessage" :show="articleAddedSuccessfull">
    <template #body>
      <div class="message-box">
        <img
          :src="require('@/assets/img/icons/register-done.svg')"
          alt="register-done"
          class="success-full"
        />
        <p class="paragraph-1 text-center">
          مقاله شما با موفقیت افزوده شد
        </p>
      </div>
    </template>
    <template #action>
      <base-button @click="goToNewArticlePage" class="btn btn-big"
        >نمایش مقاله افزوده شده</base-button
      >
      <base-button @click="addAnotherArticle" class="btn btn-big"
        >افزودن مقاله جدید</base-button
      >
    </template>
  </base-popup>
  <base-spiner v-if="isLoading"></base-spiner>
  <base-popup
    @close="closePopup"
    title="لطفا دسته بندی موضوعی خودرا انتخاب کنید"
    :show="!!showPopup"
  >
    <template #body>
      <div class="addNewTag-box" v-if="addNewTag">
        <input id="newTag" type="text" v-model="selectedTagByUser" />
      </div>
      <div class="selectTag-box" v-else>
        <select id="selectedTags" v-model="selectedTagByUser">
          <option v-for="(tag, idx) in availableTags" :key="idx" :value="tag">{{
            tag.name
          }}</option>
        </select>
        <base-icon name="arrow-down"></base-icon>
      </div>
    </template>
    <template #action>
      <base-button @click="changeAddTagMode" class="btn btn-big">{{
        !addNewTag ? 'افزودن دسته بندی جدید' : 'انتخاب ازدسته بندی های موجود'
      }}</base-button>
      <base-button @click="addTag" class="btn btn-big">{{
        addNewTag ? 'افزودن' : 'تایید'
      }}</base-button>
    </template>
  </base-popup>
  <section class="article-writing">
    <base-container isSmall>
      <div class="page-heading mb-4">
        <base-icon name="writing"></base-icon>
        <h1 class="heading-bold">ایجاد مقاله جدید</h1>
      </div>
      <form @submit.prevent="submitForm">
        <image-preview mode="article" @inputImage="addImage"></image-preview>
        <textarea
          v-model="titleArticle"
          class="heading-bold"
          id="title"
          placeholder="عنوان مطلب خود را وارد کنید"
        ></textarea>
        <div @click="removeTag" class="tags paragraph-1">
          <span class="tag tag-medium" v-for="(tag, idx) in tags" :key="idx">{{
            tag.name
          }}</span>
          <base-button @click="togglePopup" mode="btn btn-circle">
            <base-icon name="add-tag"></base-icon>
          </base-button>
        </div>
        <textarea
          v-model="contentArticle"
          class="heading"
          id="content"
          placeholder="متن اصلی خود را وارد کنید"
        ></textarea>
        <base-button :mode="btnClass" type="submit">
          انتشار مطلب
        </base-button>
      </form>
    </base-container>
  </section>
</template>

<script>
import { ref, computed, reactive } from '@vue/reactivity'
import ImagePreview from '../components/forms/ImagePreview.vue'
import useDataLoader from '../components/../hook/dataLoader'
import useValidation from '../components/forms/formValidation.js'
import { provide, watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
  components: { ImagePreview },
  setup() {
    const router = useRouter()
    const inputValidation = useValidation()
    const {
      isLoading,
      message,
      errorMessageTime,
      callAction,
      confirmMessage,
      store
    } = useDataLoader()
    // form data
    const selectedTagByUser = ref()
    const imageArticle = ref(null)
    const titleArticle = ref('')
    const contentArticle = ref('')
    const tags = reactive([])
    const articleAddedSuccessfull = ref(false)
    const newArticleId = ref(null)

    const formDataIsValid = ref(false)

    function addImage(image) {
      showImagePreview.value = true
      imageArticle.value = image
    }
    const showImagePreview = ref(true)
    provide('showImagePreview', showImagePreview)

    watch([tags, titleArticle, contentArticle, imageArticle], function(
      newValue
    ) {
      formDataIsValid.value = true
      if (
        newValue[0].length <= 0 ||
        !inputValidation.isArtileTitle(newValue[1]) ||
        !inputValidation.isArticleContent(newValue[2]) ||
        !newValue[3]
      ) {
        formDataIsValid.value = false
      }
    })

    async function submitForm() {
      if (!formDataIsValid.value) {
        return
      }
      await callAction('article', 'addArticle', {
        title: titleArticle.value,
        content: contentArticle.value,
        image: imageArticle.value,
        tags
      })
      if (message.values.length <= 0) {
        articleAddedSuccessfull.value = true
        newArticleId.value = store.getters['article/newArticleId']
      }
    }
    const addAnotherArticle = function() {
      articleAddedSuccessfull.value = false
      titleArticle.value = ''
      contentArticle.value = ''
      showImagePreview.value = false
      tags.values = tags.splice(0, tags.length)
    }
    const goToNewArticlePage = function() {
      if (!newArticleId.value) return
      router.replace(`/article/${newArticleId.value}`)
    }

    // tags
    const addNewTag = ref(false)
    const changeAddTagMode = function() {
      selectedTagByUser.value = ''
      addNewTag.value = !addNewTag.value
    }
    const availableTags = computed(function() {
      return store.getters['article/availableTags']
    })

    function addTag() {
      if (
        selectedTagByUser.value &&
        !tags.find(
          tag =>
            tag.name === selectedTagByUser.value?.name ||
            tag.name === selectedTagByUser.value
        )
      ) {
        if (addNewTag.value)
          tags.push({
            name: selectedTagByUser.value,
            id: null
          })
        else
          tags.push({
            name: selectedTagByUser.value.name,
            id: selectedTagByUser.value.id
          })
      }
      selectedTagByUser.value = ''
    }

    function removeTag(el) {
      const target = el.target
      if (target.tagName !== 'SPAN' || tags.length <= 0) return

      const tag = target.textContent
      const idx = tags.findIndex(t => t === tag)
      tags.values = tags.splice(idx, 1)
    }
    // popup
    const showPopup = ref(false)
    function togglePopup() {
      showPopup.value = !showPopup.value
    }
    function closePopup() {
      showPopup.value = false
    }

    //

    const btnClass = computed(function() {
      if (formDataIsValid.value) {
        return 'btn btn-big mx-auto d-block'
      } else return 'btn btn-big btn-disactive mx-auto d-block'
    })
    return {
      tags,
      showPopup,
      togglePopup,
      closePopup,
      availableTags,
      addTag,
      removeTag,
      selectedTagByUser,
      titleArticle,
      contentArticle,
      imageArticle,
      addNewTag,
      changeAddTagMode,
      addImage,
      submitForm,
      btnClass,
      isLoading,
      message,
      errorMessageTime,
      confirmMessage,
      goToNewArticlePage,
      addAnotherArticle,
      articleAddedSuccessfull
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/pages/_article-writing.scss';
</style>
