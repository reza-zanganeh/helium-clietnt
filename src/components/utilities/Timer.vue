<!-- @format -->

<template>
  <slot :time="styledTime"></slot>
</template>

<script>
export default {
  props: ["time"],
  emits: ["endTime"],
  data() {
    return {
      styledTime: "۰۰ :‌ ۰۰",
    };
  },
  methods: {
    getPersianNumber(number) {
      return new Intl.NumberFormat("fa-IR").format(number).padStart(2, "۰");
    },
    timer() {
      let amountOfTimer = this.time * 60;
      let pasedTime = 0;
      const intervalTimer = setInterval(() => {
        const minute = Math.floor(amountOfTimer / 60);
        const secend = amountOfTimer % 60;
        this.styledTime = `${this.getPersianNumber(
          secend
        )} : ${this.getPersianNumber(minute)}`;
        if (pasedTime >= amountOfTimer) {
          clearInterval(intervalTimer);
          this.$emit("endTime");
        }
        amountOfTimer--;
      }, 1000);
    },
  },
  mounted() {
    this.timer();
  },
};
</script>
