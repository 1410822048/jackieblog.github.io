const app = Vue.createApp({
  mixins: Object.values(mixins),
  data() {
    return {
      loading: true,
      hiddenMenu: false,
      showMenuItems: false,
      menuColor: false,
      scrollTop: 0,
      renderers: [],
    };
  },
  created() {
    window.addEventListener("load", this.onPageLoad);
  },
  mounted() {
    window.addEventListener(
      "scroll",
      this.throttle(this.handleScroll, 100),
      true
    );
    this.render();
    this.scrollToTop(); // 確保頁面加載後滾動到頂部
  },
  methods: {
    // 頁面加載完成後執行
    onPageLoad() {
      this.loading = false;
    },

    // 渲染邏輯
    render() {
      this.renderers.forEach((renderer) => renderer());
    },

    // 滾動事件處理
    handleScroll() {
      const newScrollTop = document.documentElement.scrollTop;
      this.updateMenuVisibility(newScrollTop);
      this.updateWrapPosition(newScrollTop);
      this.scrollTop = newScrollTop;
    },

    // 更新選單可見性
    updateMenuVisibility(newScrollTop) {
      this.hiddenMenu = this.scrollTop < newScrollTop;
      this.showMenuItems = !this.hiddenMenu;
    },

    // 更新 wrap 元素的位置
    updateWrapPosition(newScrollTop) {
      const wrap = this.$refs.homePostsWrap;
      if (wrap) {
        this.menuColor = newScrollTop <= window.innerHeight - 100;
        wrap.style.top =
          newScrollTop <= 400 ? `-${newScrollTop / 5}px` : "-80px";
      }
    },

    // 滾動到頂部
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // 節流函數
    throttle(func, delay) {
      let lastCall = 0;
      return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
          func.apply(this, args);
          lastCall = now;
        }
      };
    },
  },
});
app.mount("#layout");
