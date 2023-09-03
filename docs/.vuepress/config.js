/*
 * @Author: cbw
 * @Date: 2023-08-10 21:25:06
 * @LastEditors: cbw
 * @LastEditTime: 2023-09-03 18:54:06
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
  plugins: [["vuepress-plugin-code-copy",{
    color:'#c9c2c2'
  }]],
  theme: "reco",
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "https://github.com/aisuandebowen/Hut",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",
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
      { text: "简法主页", link: "https://www.jianfast.com/" },
      // { text: "GitHub", link: "https://github.com/aisuandebowen" },
      // {
      //   text: "CSDN",
      //   link: "https://blog.csdn.net/weixin_44173943?spm=1000.2115.3001.5343",
      // },
    ],
    sidebar: [
      {
        title: "简介",
        path: "/",
      },
      {
        title: "代码片段",
        path: "/code-snippet/",
      },
      {
        title: "学习笔记",
        path: "/note/",
        collapsable: false,
        children: [
          { title: "Git", path: "/note/git/" },
          { title: "Note", path: "/note/study/" },
        ],
      },
    ],
  },
};
