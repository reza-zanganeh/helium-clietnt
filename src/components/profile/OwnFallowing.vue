<!-- @format -->

<template>
  <user-items
    store="users"
    action="getOwnFallowing"
    getters="ownFallowing"
    page="1"
    :haveMore="false"
    mode="small"
  ></user-items>
</template>

<script>
import UserItems from "../users/UserItems.vue";
export default {
  components: { UserItems },
};
</script>
