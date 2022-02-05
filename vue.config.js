module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/scss/main.scss";
          `,
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
