Component({
  methods: {
    onAdLoad() {
      console.log("广告加载成功");
    },

    onAdError(e) {
      console.error("广告加载失败", e.detail);
    }
  }
});