<!-- @format -->

<template>
  <base-tabs
    :haveLink="false"
    mode="active disactive-color"
    :tabs="['از همین نویسنده']"
  ></base-tabs>
  <section class="similar-article" v-if="similarArticles.length > 0">
    <article-cart
      mode="small"
      v-for="article in similarArticles"
      :key="article.id"
      :id="article.id"
      :title="article.title"
      :image_url="article.image_url"
      :tags="article.tags"
      :read_time_minutes="article.read_time_minutes"
      :author_id="article.author_id"
      :date="article.created_at"
    ></article-cart>
  </section>
</template>
<script>
import ArticleCart from "./ArticleCart.vue";
export default {
  components: { ArticleCart },
  props: ["similarArticles"],
};
</script>

<style scoped>
.similar-article {
  padding: 3.5rem 0 7rem 0;
}
</style>
