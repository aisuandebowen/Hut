/*
 * @Author: cbw
 * @Date: 2023-08-10 21:25:06
 * @LastEditors: cbw
 * @LastEditTime: 2023-10-23 19:16:18
 * @Description:
 */
module.exports = {
  title: "Hola，最近还好吗？",
  base: "/Hut/",
  description: "Just playing around",
  markdown: {
    lineNumbers: true,
  },
  lastUpdated: true,
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  plugins: [
    [
      "vuepress-plugin-code-copy",
      {
        color: "#c9c2c2",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    logo: "/assets/img/logo.jpg",
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "https://github.com/aisuandebowen/Hut",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "Github",
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "编辑",
    subSidebar: "auto",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "常用网站",
        ariaLabel: "Common Website",
        items: [
          { text: "GitHub", link: "https://github.com" },
          { text: "翻译", link: "https://fanyi.youdao.com/indexLLM.html#/" },
          {
            text: "MDN",
            link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference",
          },
          { text: "现代JavaScript教程", link: "https://zh.javascript.info/" },
          { text: "简法主页", link: "https://www.jianfast.com/" },
        ],
      },
      // {
      //   text: "CSDN",
      //   link: "https://blog.csdn.net/weixin_44173943?spm=1000.2115.3001.5343",
      // },
    ],
    sidebar: [
      {
        title: "导语",
        collapsable: false,
        path: "/",
      },
      {
        title: "代码片段",
        collapsable: false,
        path: "/code-snippet/",
      },
      {
        title: "前端",
        collapsable: false,
        children: [
          { title: "JavaScript", path: "/note/JavaScript/JavaScript.md" },
          { title: "TS", path: "/note/TS/TS.md" },
          { title: "Vue2", path: "/note/Vue2/Vue2.md" },
          { title: "Vue3", path: "/note/Vue3/Vue3.md" },
          {
            title: "Babel-Plugin",
            path: "/note/Webpack/Babel/Babel-Plugin.md",
          },
          { title: "HTML CSS", path: "/note/HTML-CSS/HTML-CSS.md" },
        ],
      },
      {
        title: "Git",
        collapsable: true,
        children: [
          { title: "常见问题", path: "/note/git/QA.md" },
          { title: "基础知识", path: "/note/git/git.md" },
        ],
      },
      {
        title: "Other",
        collapsable: true,
        children: [
          { title: "其他", path: "/note/other/other.md" },
          { title: "正则", path: "/note/regular/regular.md" },
          { title: "需求开发思考", path: "/note/ponder/ponder.md" },
        ],
      },
    ],
  },
  head: [
    [
      "link",
      {
        href: "https://cdn.jsdelivr.net/npm/@docsearch/css@alpha",
        rel: "stylesheet",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@docsearch/js@alpha" }],
  ],
};
