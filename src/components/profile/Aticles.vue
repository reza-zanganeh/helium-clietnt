<!-- @format -->

<template>
  <article-cart-items
    store="users"
    action="getUserArticles"
    getters="articles"
    page="1"
    haveMore="haveMoreUserArticle"
    mode="profile"
  ></article-cart-items>
</template>

<script>
import ArticleCartItems from "../article/ArticleCartItems.vue";
export default {
  components: { ArticleCartItems },
};
</script>
