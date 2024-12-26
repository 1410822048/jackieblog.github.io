document.addEventListener("DOMContentLoaded", function () {
  const pageLinks = document.querySelectorAll(".page-link");
  const basePath = window.location.pathname.replace(/\/$/, ""); // 获取当前页面的基础路径，去掉末尾的斜杠

  // 获取当前页数，直接读取 URL 中的 page 参数
  let currentPage =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  // 初始化分页链接
  pageLinks.forEach((link) => {
    const page = parseInt(link.getAttribute("data-page"));

    let pageLink = basePath.replace(/\/Vision.*$/, ""); // 确保删除 "/VisionP{n}" 之类的部分

    if (page === 1) {
      pageLink = `${pageLink}/Vision`; // 第一页链接
    } else {
      pageLink = `${pageLink}/VisionP${page}`; // 其他页的链接
    }

    // 设置分页链接
    link.href = pageLink;

    // 设置当前页的样式
    if (page === currentPage) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });

  // 监听点击事件，更新当前页数
  pageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止默认的跳转行为

      // 获取点击的页码
      currentPage = parseInt(this.getAttribute("data-page"));

      // 更新所有分页链接的样式
      pageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute("data-page"));
        if (page === currentPage) {
          link.classList.add("current");
        } else {
          link.classList.remove("current");
        }
      });

      // 更新页面 URL
      let currentUrl = new URL(window.location);
      let pageLink = currentUrl.pathname.replace(/\/Vision.*$/, ""); // 删除可能存在的 "/VisionP{n}" 部分
      if (currentPage === 1) {
        pageLink = `${pageLink}/Vision`; // 第一页链接
      } else {
        pageLink = `${pageLink}/VisionP${currentPage}`; // 其他页的链接
      }

      // 更新路径并去掉查询参数
      currentUrl.pathname = pageLink; // 更新路径
      currentUrl.search = ""; // 删除查询参数
      history.pushState({}, "", currentUrl.href); // 更新浏览器历史记录

      // 无需强制刷新页面，保持 SPA 行为
      // 如果需要刷新页面，可以解除下面的注释：
      window.location.reload(); // 刷新页面，加载新的 URL
    });
  });

  // 页面加载时，确保根据 URL 设置当前页样式
  function updatePageState() {
    const currentPageFromURL =
      parseInt(window.location.pathname.match(/VisionP(\d+)/)?.[1]) || 1;

    pageLinks.forEach((link) => {
      const page = parseInt(link.getAttribute("data-page"));
      if (page === currentPageFromURL) {
        link.classList.add("current");
      } else {
        link.classList.remove("current");
      }
    });
  }

  // 页面加载时更新当前页状态
  updatePageState();
});
