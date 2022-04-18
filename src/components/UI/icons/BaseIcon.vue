<!-- @format -->

<template>
  <img
    v-if="kind === 'link'"
    :src="getIcon"
    class="icon-small"
    :alt="name"
    @click="iconLink"
  />
  <img v-else :src="getIcon" class="icon-small" :alt="name" />
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: ["name", "kind", "to"],
  computed: {
    getIcon() {
      return require(`@/assets/img/icons/${this.name}.svg`);
    },
  },
  setup(props) {
    const router = useRouter();
    function iconLink() {
      router.push({
        path: props.to,
      });
    }

    return {
      iconLink,
    };
  },
};
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
</style>
