export default ({ router, Vue, isServer }) => {
  Vue.mixin({
    mounted() {
      // 不加 setTimeout 会有报错，但不影响效果
      setTimeout(() => {
        try {
          docsearch({
            appId: "4W289RLFXQ",
            apiKey: "3bf7a240fa51f68995c3b580e76fcb73",
            indexName: "hut",
            container: ".search-box",
            debug: false,
          });
        } catch (e) {
          console.log(e);
        }
      }, 100);
    },
  });
};
