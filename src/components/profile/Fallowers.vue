<!-- @format -->

<template>
  <user-items
    store="users"
    action="getUserFallowers"
    getters="fallwers"
    page="1"
    :haveMore="false"
  ></user-items>
</template>

<script>
import UserItems from "../users/UserItems.vue";
export default {
  components: { UserItems },
};
</script>
