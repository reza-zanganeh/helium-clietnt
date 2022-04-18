<!-- @format -->

<template>
  <div v-if="mode === 'small'" class="articleCart articleCart-small">
    <base-image :path="image_url" :alt="title"></base-image>
    <div class="articleCart-info">
      <div class="articleCart-info__body">
        <base-button kind="link" :to="detailsPageLink">
          <p class="heading-1">
            {{ getTitle }}
          </p>
        </base-button>
      </div>
      <div class="articleCart-info__footer paragraph-3">
        <date :day="date.day" :month="date.month" :year="date.year"></date>
        <span class="dot"></span>
        <span class="study-time">{{ read_time_minutes }} دقیقه مطالعه</span>
        <span class="dot"></span>
        <div class="tags">
          <span class="tag tag-small" v-for="(tag, idx) in tags" :key="idx">{{
            tag.name
          }}</span>
        </div>
        <BookMark :articleId="id" :isMark="isMark" />
      </div>
    </div>
  </div>

  <div v-else-if="mode === 'profile'" class="articleCart">
    <div class="articleCart-info">
      <div class="articleCart-info__body">
        <base-button kind="link" :to="detailsPageLink">
          <h3
            class="heading-1"
            :class="{ 'tealish-color': titleIsTealish }"
            @mouseleave="titleIsTealish = false"
            @mouseover="titleIsTealish = true"
          >
            {{ getTitle }}
          </h3>
          <p class="paragraph-1">
            {{ getDescription }}
          </p>
        </base-button>
      </div>
      <div class="articleCart-info__footer paragraph-3">
        <date :day="date.day" :month="date.month" :year="date.year"></date>
        <span class="dot"></span>
        <span class="study-time">{{ read_time_minutes }} دقیقه مطالعه</span>
        <span class="dot"></span>
        <div class="tags">
          <span class="tag tag-small" v-for="(tag, idx) in tags" :key="idx">{{
            tag.name
          }}</span>
        </div>
        <div class="articleCart-profile__action">
          <BookMark :articleId="id" :isMark="isMark" />
          <Comment :commentsCount="comments_count" />
          <Like :articleId="id" :likeCount="likes" :isLike="isLike" />
        </div>
      </div>
    </div>
    <base-image
      :path="image_url"
      :alt="title"
      @mouseleave="titleIsTealish = false"
      @mouseover="titleIsTealish = true"
    ></base-image>
  </div>

  <div v-else class="articleCart">
    <div class="articleCart-info">
      <div class="articleCart-info__header">
        <author
          :isLink="true"
          :id="author_id"
          :imgUrl="auther_profile_image"
          imgSize="size-1"
          :name="author_name"
        ></author>
        <div class="articleCart-info__action">
          <Fallow :small="true" :userId="author_id" />
          <BookMark :articleId="id" :isMark="isMark" />
        </div>
      </div>
      <div class="articleCart-info__body">
        <base-button kind="link" :to="detailsPageLink">
          <h3
            class="heading-1"
            :class="{ 'tealish-color': titleIsTealish }"
            @mouseleave="titleIsTealish = false"
            @mouseover="titleIsTealish = true"
          >
            {{ getTitle }}
          </h3>
          <p class="paragraph-1">
            {{ getDescription }}
          </p>
        </base-button>
      </div>
      <div class="articleCart-info__footer paragraph-3">
        <date :day="date.day" :month="date.month" :year="date.year"></date>
        <span class="dot"></span>
        <span class="study-time">{{ read_time_minutes }} دقیقه مطالعه</span>
        <span class="dot"></span>
        <div class="tags">
          <span class="tag tag-small" v-for="(tag, idx) in tags" :key="idx">{{
            tag.name
          }}</span>
        </div>
      </div>
    </div>
    <base-image
      :path="image_url"
      :alt="title"
      @mouseleave="titleIsTealish = false"
      @mouseover="titleIsTealish = true"
    ></base-image>
  </div>
</template>

<script>
import BookMark from '../UI/icons/Bookmark.vue'
import Fallow from '../UI/icons/Fallow.vue'
import Like from '../UI/icons/Like.vue'
import Comment from '../UI/icons/Comment.vue'
import Author from '../utilities/author.vue'
export default {
  components: { Author, BookMark, Like, Fallow, Comment },
  props: [
    'mode',
    'id',
    'title',
    'description',
    'image_url',
    'tags',
    'read_time_minutes',
    'author_id',
    'author_name',
    'auther_profile_image',
    'date',
    'likes',
    'isFallow',
    'isMark',
    'isLike',
    'comments_count'
  ],
  data() {
    return {
      titleIsTealish: false
    }
  },
  methods: {
    formatStr(str, maxLength = 100) {
      if (!str) return
      let idx = str.indexOf('\n')
      if (idx === -1) idx = str.indexOf('.')
      if (idx === -1) idx = str.indexOf(',')
      const formtedStr = str.substr(0, idx)
      if (formtedStr.length < maxLength && idx !== -1) return formtedStr
      else return str.slice(0, maxLength)
    }
  },
  computed: {
    detailsPageLink() {
      return '/article/' + this.id
    },
    getTitle() {
      const title = this.title
      const maxLength = 130
      return this.formatStr(title, maxLength)
    },
    getDescription() {
      const content = this.description
      const maxLength = 240 - this.title.length
      return this.formatStr(content, maxLength)
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/assets/sass/components/article/_articleCart.scss';
</style>
