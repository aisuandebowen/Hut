# 其他

## Lodash常用

1. `shuffle`
2. 拷贝
   - 浅拷贝`clone`
   - 深拷贝`cloneDeep`
3. 防抖`debounce`

## 跨域

### options预检请求

区分简单请求和复杂请求：

1. 使用方法`put/delete/patch/post`;
2. 发送`json`格式的数据`（content-type: application/json）`
3. 请求中带有自定义头部；

在跨域复杂请求的时候才会`preflight request`，因为怕对服务器数据造成影响。

请求报文：

1. `Access-Control-Request-Method`：告知服务器实际请求所使用的HTTP方法；
2. `Access-Control-Request-Headers`：告知服务器实际请求所携带的自定义首部字段。

响应报文：

1. `Access-Control-Request-Method`：告知客户端被允许使用的HTTP方法；
2. `Access-Control-Request-Headers`：告知客户端被允许携带的自定义首部字段。
3. `Access-Control-Max-Age`：浏览器指定时间内无需再次发送预检请求。

## MV*模式

### MVC

#### Smalltalk-80 MVC解释

+ View：管理用户界面的层次。
+ Model：提供操作数据的接口，执行业务逻辑。
+ Controller：View和Model之间的协作。

用户对View操作后，View将处理的权限移交给Controller。Controller进行应用逻辑（调Model哪个接口、对View数据预处理...），具体的业务逻辑交给Model。当**Model变更时通过观察者模式告诉View**，View收到消息后向Model请求最新的数据，更新界面。

#### 优缺点

+ 优点：逻辑分离（应用逻辑、业务逻辑、展示逻辑）、多视图更新（观察者模式）。
+ 缺点：单元测试困难，View无法组件化（高度依赖Model）。

#### 前端思考：

1. 前端由于HTTP是单工协议，服务端无法向前端发送消息（websocket除外），只能前端发送请求到后端。
2. MVC模式有点类似于Vuex。在Vuex中，更改state状态的唯一方法就是提交mutation，即业务逻辑。进行应用逻辑的类似于action，action中提交的是mutation。展示逻辑就类似于Getters，负责将数据归纳整理，提供给页面想要的数据。

### MVP

#### 解释

大致与MVC相同，唯一不同的是Controller变成了Presenter。

用户对View操作后，View将处理的权限移交给Presenter。Presenter进行应用逻辑（调Model哪个接口、对View数据预处理...），具体的业务逻辑交给Model。

不同的是，当Model变更时通过观察者模式告诉Presenter，**Presenter通过View提供的接口告诉View**。

#### 优缺点

+ 优点：便于对Presenter单元测试、View可组件化。
+ 缺点：Presenter变得臃肿，不仅有应用逻辑，还有同步逻辑。

### MVVM

#### 解释

大致与MVP相同，唯一不同的是将Presenter中的同步逻辑分给了“Binder”。Binder主要是负责View和Model双向绑定。

用户对View操作后，View将处理的权限移交给View-Model。View-Model进行应用逻辑（调Model哪个接口、对View数据预处理...），具体的业务逻辑交给Model。

不同的是，当Model变更时，**通过Binder自动把数据更新到View上**。当用户**对View操作时，也会自动更新到Model**。

#### 优缺点

+ 优点：解决了大量同步问题，提高代码可维护性。便于测试，由于Binder的存在，Model正确即View正确，减少View同步更新测试。
+ 缺点：建立大量View-Model、数据绑定以指令写在View中不便测试。



## 动态规划

思路：

1. 确定状态

   + `f[i][j]`。
   + 最后一步：最优策略的最后一步。
   + 子问题：通过最后一步，把问题规模缩小。

2. 转移方程 

3. 初始条件和边界状态

   边界状态即数组不可越界。初始状态一般类似于f(0) = 0。

4. 计算顺序

   一维从小到大，二维从左到右、从上至下。​


## 前端跨域

### 什么是跨域？

当端口号、域名、协议三者有一不同，即为跨域。

### 实战解决方案

1. 服务端设置cors白名单

2. Nginx代理

   前端想要访问的内容，本质是存在跨域问题的。但在客户端和服务端之间增加了一层，这一层与服务端同源，同时又允许客户端访问。客户端访问的就是中间这一层，而中间这一层再请求真实的服务端，返回数据。

### 前端代理

`api`接口，存在多个地址的问题，它们可能来自多个ip。而跑前端项目时，请求的baseIP固定，而真实的接口IP又不一致，所以请求不到接口。

解决方案

1. 前端本地做代理，请求接口时，更改baseIP。
2. Nginx代理。

## webpack

### devDependencies 和 dependencies 的区别

+ devDependencies：开发时依赖。
+ dependencies：运行时依赖。

**工程项目**，不外部使用。`npm i`时，`devDependencies`和`dependencies`的依赖都会下载。

**工具库**。外部使用时，`npm i`只下载`dependencies`的依赖。

三种情况：

1. 工程项目和工具库都要用到的依赖。

   工程项目设置`dependencies` 公用依赖，工具库设置`peerDependencies`。

   + 当工程项目显示设置`dependencies` ，将忽略工具库的`peerDependencies`；
   + 当工程项目未显示设置`dependencies` ，将使用工具库的`peerDependencies`；
   + 当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复；

2. 工程项目不会用的依赖，工具库用到的依赖。

   工具库设置

   + 业务依赖：`dependencies`
   + 开发时依赖：`devDependencies`

## ESLint

### 开始

1. 安装

   ```
   $ npm install eslint --save-dev
   ```

2. 生成配置文件

   ```
   npx eslint --init
   ```

   Tips:`npx` 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 `PATH` 里找。如果依然找不到，就会帮你安装！

3. 校验

   ```
   // 文件
   npx eslint file_path
   // 目录
   npx eslint path
   ```

4. 自动修复

   ```
   npx eslint {file_path or path} --fix
   ```

   ​

## 正则

### 居民身份证

示例：`510802199912102033`

正则：`/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/`

### 士官证

示例：`军字第2001988号`，`士字第P011816X号`

正则：`/^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/`

### 驾驶证

示例：`610114198911192028`

正则：`/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/`

### 护照

示例：`141234567`,`G12345678`, `P1234567`

正则：`/^([a-zA-z]|[0-9]){5,17}$`

### 驾驶证

示例：`610114198911192028`

正则：`/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/`

### 港澳通行证

示例：`H1234567890`

正则：`/^([A-Z]\d{6,10}(\(\w{1}\))?)$/`

### 只能数字或字母

`/[a-zA-Z0-9]+$/g`

### 只能数字

`/^[0-9]+$/g`
