<!-- @format -->
<template>
  <base-container>
    <div class="page-heading">
      <base-icon name="save-bold"></base-icon>
      <h1 class="heading-bold">مقالات ذخیره شده</h1>
    </div>
    <article-cart-items
      store="users"
      action="getMarkedArticles"
      getters="marketArticles"
      :haveMore="null"
      page="1"
    ></article-cart-items>
  </base-container>
</template>

<script>
import ArticleCartItems from '../components/article/ArticleCartItems.vue'
export default {
  components: { ArticleCartItems }
}
</script>
