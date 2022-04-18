<!-- @format -->

<template>
  <div class="user-cart" v-if="!small">
    <div class="user-cart-image">
      <author
        :isLink="true"
        :id="id"
        :imgUrl="image_url"
        imgSize="size-3"
      ></author>
    </div>
    <div class="user-cart-body" :class="{ 'horizontal-line': !isEnd }">
      <div class="user-cart-body__info">
        <base-button mode="heading-2-bold" kind="link" :to="'/profile/' + id">{{
          first_name + ' ' + last_name
        }}</base-button>
        <p class="paragraph-1">
          {{ bio }}
        </p>
      </div>
      <div class="user-cart-body__action">
        <Fallow :small="true" :userId="id" />
      </div>
    </div>
  </div>
  <div class="user-cart-small" v-else>
    <div class="user-cart-small__image">
      <author
        :isLink="true"
        :id="id"
        :imgUrl="image_url"
        imgSize="size-3"
      ></author>
    </div>
    <div class="user-cart-small__body">
      <div class="user-cart-small__info">
        <base-button mode="heading-2-bold" kind="link" :to="'/profile/' + id">{{
          first_name + ' ' + last_name
        }}</base-button>

        <p class="paragraph-1">
          {{ bio }}
        </p>
      </div>
      <div class="user-cart-small__body-action">
        <Fallow :small="true" :userId="id" />
      </div>
    </div>
  </div>
</template>

<script>
import Author from '../utilities/author.vue'
import Fallow from '../UI/icons/Fallow.vue'
export default {
  props: [
    'isEnd',
    'small',
    'bio',
    'first_name',
    'last_name',
    'id',
    'image_url',
    'isFallow'
  ],
  components: { Author, Fallow }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/users/_card.scss';
</style>
