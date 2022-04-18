<!-- @format -->

<template>
  <div class="progres">
    <div :style="{ width: `${progresWidth}%` }" class="progresBar"></div>
  </div>
</template>

<script>
export default {
  props: ['time'],
  emits: ['end'],
  data() {
    return { progresWidth: 0 }
  },
  methods: {
    timer() {
      const amountOfIncrease = 100 / this.time
      const interval = setInterval(() => {
        if (this.progresWidth >= 100) {
          this.$emit('end')
          clearInterval(interval)
        }
        if (this.progresWidth + amountOfIncrease >= 100) this.progresWidth = 100
        else this.progresWidth += amountOfIncrease
      }, 1000)
    }
  },
  mounted() {
    this.timer()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/util/_progress-bar.scss';
</style>
