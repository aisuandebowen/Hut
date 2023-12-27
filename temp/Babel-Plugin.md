# Babel插件

## 定义

AST就是抽象语法树的缩写，是源代码语法结构的一种抽象表示，它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

+ 测试网站：[https://astexplorer.net/](https://astexplorer.net/)
+ 开发手册：[https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

## 常用库

+ esprima

  把JS源代码转成AST语法树的包

+ estraverse

  遍历语法树的包,可以修改树上的节点

+ escodegen

  把AST语法树重新转换，还原成源代码的包

+ @babel/types

  遍历ast过程中，封装的对节点进行快捷操作各种方法

+ @babel/core

  核心包

  ```javascript
  const res = core.transform(sorceCode,{
    visitor:{
      // ...
    }
  }) // 转换源代码
  res.code // 处理后的代码
  ```



## Demo

+ [将箭头函数转为普通函数](https://github.com/aisuandebowen/code-snippet/blob/master/webpack/transform-arrowFn.js)
+ [删除console.log](https://github.com/aisuandebowen/code-snippet/blob/master/webpack/remove-console.js)

