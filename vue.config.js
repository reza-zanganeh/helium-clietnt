/** @format */

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: ` 
          @import "@/assets/sass/abstract/_variables.scss";
          @import "@/assets/sass/abstract/_mixin.scss";
        `,
      },
    },
  },
};
