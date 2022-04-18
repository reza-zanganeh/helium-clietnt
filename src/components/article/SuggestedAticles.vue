<!-- @format -->

<template>
  <article-cart-items
    store="article"
    action="getArticleByTags"
    getters="suggestedArticles"
    page="1"
    haveMore="haveMore"
  ></article-cart-items>
</template>
<script>
import ArticleCartItems from "./ArticleCartItems.vue";
export default {
  components: { ArticleCartItems },
};
</script>
