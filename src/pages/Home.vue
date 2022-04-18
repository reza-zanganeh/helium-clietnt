<!-- @format -->
<template>
  <base-container v-if="auth">
    <base-popup
      @close="togglePopup"
      title="لطفا دسته بندی موضوعی خودرا انتخاب کنید"
      :show="!!showPopup"
    >
      <template #body>
        <div class="selectTag-box">
          <select id="selectedTags" v-model="selectedTagByUser">
            <option
              v-for="(tag, idx) in availableTags"
              :key="idx"
              :value="tag.name"
              >{{ tag.name }}</option
            >
          </select>
          <base-icon name="arrow-down"></base-icon>
        </div>
      </template>
      <template #action>
        <base-button @click="addTag" class="btn btn-big">تایید</base-button>
      </template>
    </base-popup>
    <div class="tags" @click="removeTag">
      <p class="heading-2">موضوعات انتخابی</p>
      <span
        v-for="(tag, idx) in selectedTags"
        :key="idx"
        class="tag tag-medium my-1"
      >
        {{ tag }}
        <base-icon name="times"></base-icon>
      </span>
      <base-button mode="btn btn-circle" @click="togglePopup">
        <base-icon name="pluse"></base-icon>
      </base-button>
    </div>
    <base-tabs
      mode="disactive-minWidth"
      :active="activeTab"
      @click="selectComponent"
      :tabs="getTabs"
    ></base-tabs>
    <component :is="activeComponent"></component>
  </base-container>
  <base-container v-else>
    <article-cart-items
      store="article"
      action="getArticles"
      getters="allArticles"
      haveMore="haveMore"
      page="1"
    ></article-cart-items>
  </base-container>
</template>

<script>
import OwnFallowing from '../components/profile/OwnFallowing.vue'
import SuggestedArticles from '../components/article/SuggestedAticles.vue'
import { ref, computed } from 'vue'
import ArticleCartItems from '../components/article/ArticleCartItems.vue'
import { useStore } from 'vuex'
export default {
  components: { ArticleCartItems, OwnFallowing, SuggestedArticles },
  props: ['page'],
  data() {
    return {
      activeComponent: 'SuggestedArticles',
      activeTab: 2
    }
  },
  methods: {
    selectComponent(e) {
      const target = e.target.closest('.tab')
      if (!target) return
      const select = target.textContent
      if (select === 'دنبال شوندگان') {
        this.activeComponent = 'OwnFallowing'
        this.activeTab = 1
      } else {
        this.activeComponent = 'SuggestedArticles'
        this.activeTab = 2
      }
    }
  },
  setup() {
    const store = useStore()

    // selected tags
    const selectedTagByUser = ref('')
    const selectedTags = computed(function() {
      return store.getters['article/selectedSubject']
    })

    function addTag() {
      showPopup.value = false
      store.commit('article/addSubject', { tag: selectedTagByUser.value })
    }

    function removeTag(el) {
      const target = el.target
      const tag = target.closest('.tag')
      if (target.tagName !== 'IMG' || !tag) return
      store.commit('article/removeSubject', { tag: tag.textContent })
    }

    // popup
    const showPopup = ref(false)
    function togglePopup() {
      showPopup.value = !showPopup.value
    }

    const availableTags = computed(function() {
      return store.getters['article/availableTags']
    })

    // tab
    const getTabs = computed(function() {
      return ['دنبال شوندگان', 'پشنهادی برای شما']
    })
    //
    const auth = computed(function() {
      return store.getters['auth/isAuthenticated']
    })
    return {
      auth,
      addTag,
      removeTag,
      availableTags,
      selectedTags,
      selectedTagByUser,
      togglePopup,
      showPopup,
      getTabs
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/pages/_home.scss';
</style>
