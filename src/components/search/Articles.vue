<!-- @format -->
<template>
  <article-cart-items
    v-if="haveArticlesResult"
    store="search"
    action="fakeAction"
    getters="articles"
    :haveMore="null"
    page="1"
  ></article-cart-items>
  <p class="heading-1 text-center mt-5" v-else>
    نتیجه ای برای جستجوی شما یافت نشد
  </p>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import ArticleCartItems from "../article/ArticleCartItems.vue";
export default {
  components: { ArticleCartItems },
  setup() {
    const store = useStore();
    const haveArticlesResult = computed(function() {
      return store.getters["search/haveArticlesResult"];
    });
    return {
      haveArticlesResult,
    };
  },
};
</script>
