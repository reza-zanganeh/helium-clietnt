<!-- @format -->

<template>
  <user-items
    v-if="haveUsersResult"
    store="search"
    action="fakeAction"
    getters="users"
    page="1"
    :haveMore="false"
  ></user-items>
  <p class="heading-1 text-center mt-5" v-else>
    نتیجه ای برای جستجوی شما یافت نشد
  </p>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import UserItems from "../users/UserItems.vue";
export default {
  components: { UserItems },
  setup() {
    const store = useStore();
    const haveUsersResult = computed(function() {
      return store.getters["search/haveUsersResult"];
    });
    return {
      haveUsersResult,
    };
  },
};
</script>
