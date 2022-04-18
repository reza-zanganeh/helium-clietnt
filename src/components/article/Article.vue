<!-- @format -->

<template>
  <article class="article">
    <div class="articel-header">
      <div class="article-header__author">
        <author
          :isLink="true"
          :id="author_id"
          :imgUrl="auther_profile_image"
          imgSize="size-1"
          :name="author_name"
        ></author>
        <Fallow :userId="author_id" />
      </div>
      <h1 class="heading">{{ title }}</h1>
      <div class="article-header__info paragraph-2">
        <date
          :day="created_at.day"
          :month="created_at.month"
          :year="created_at.year"
        ></date>
        <span class="dot"></span>
        <span class="study-time">{{ read_time_minutes }} دقیقه مطالعه</span>
        <span class="dot"></span>
        <div class="tags">
          <span class="tag tag-small" v-for="(tag, idx) in tags" :key="idx">{{
            tag.name
          }}</span>
        </div>
        <Bookmark :articleId="id" :isMark="isMark" />
      </div>
    </div>

    <div class="article-body">
      <base-image
        :path="image_url"
        :alt="image_url"
        mode="article-image"
      ></base-image>
      <p class="heading-2 mb-4">{{ content }}</p>
    </div>
  </article>
</template>

<script>
import Author from '../utilities/author.vue'
import Fallow from '../UI/icons/Fallow.vue'
import Bookmark from '../UI/icons/Bookmark.vue'
export default {
  props: [
    'id',
    'title',
    'content',
    'image_url',
    'tags',
    'read_time_minutes',
    'created_at',
    'author_id',
    'author_name',
    'auther_profile_image',
    'isFallow',
    'isMark'
  ],
  components: { Author, Fallow, Bookmark }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/article/_article.scss';
</style>
