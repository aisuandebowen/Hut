# Vue2 

## 创建全局组件

```javascript
Vue.component(name, {
  template: '', // html代码
  props: ,
})
```

​	需要在创建实例之前使用该方法。

## 计算属性

计算属性是基于响应式依赖进行缓存的，相比方法，**只有在相关响应式依赖发生变化时才重新求值**。

### 原理

`src/core/instance/state.js`，[参考链接](https://juejin.cn/post/6844903678533451783#heading-0)。

1. `initState`函数中，`initComputed`初始化`computed`。

2. `initComputed`中

   1. 遍历`computed`，获取`(key, value)`，即属性名和计算的方法。
   2. 对每一个计算属性
      1. 创建`Watcher`实例
      2. 初始化`getter`、`deps`（依赖哪些属性）、`dep`（发布者，以备未来有被订阅）
      3. `defineComputed` --- 定义`set`、`get(createComputedGetter)`计算方法，然后通过`Object.defineProperty()`设置vue实例的属性的`set`、`get`方法。

3. 针对`createComputedGetter`

   1. `watcher.evaluate()`

      如果已创建的`Watcher`实例，是计算方法，执行`evaluate()`获取值。`evaluate`本质是调用之前定义的`Watcher`实例的`getter`方法。如果要求是`depp`深度监听，将重新收集所有依赖。

   2. `watcher.depend()`：如果存在`Dep.target`，收集依赖。

   当对一个对象使用`getters`时，同样会调用其子属性的`getters`。这样每一个属性对应的`watcher`都会被推入`Dep`类的静态属性`target`，从此每一个属性都将被收集到计算属性的依赖。

## key

> Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可。

## v-for

1. 永远不要把`v-if` 和 `v-for `同时用在同一个元素上。

   `v-for`的优先级比`v-if`的优先级更高，因此每次重渲染时，都会遍历整个列表，不论活跃用户是否发生了变化，因此浪费性能。

   解决方法：

   - 先使用**计算属性筛选**一次。
   - 将`v-if`转移到容器元素上。

2. `key`不能使用`index`

   > 不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。

   `index`代表当前项的索引（0,1,2,3,4,...），当发生删除、增加等操作时，其后面的元素的`index`都会发生变化，此时`diff`算法就认为后面的`key-index`映射全部发生了变化，将全部重新渲染，严重影响性能。因此推荐`key`使用**唯一值**，如时间戳`+new Date()`、身份证号、学号等...

## 同步组件和异步组件

### 同步组件

```js
import componentA from './componentA.vue'
```

### 异步组件

只在组件**需要渲染的时候才进行加载渲染**并进行缓存，以备下次访问。

```js
componentA: () => import('./componentA.vue')
```

调用异步组件的方法-延时

```js
setTimeout(() => {
  this.$nextTick(() => {
    console.log(this.$refs.com);
  });
}, 100);
```

优点：提升首页渲染速度。

### 区别

1. nextTick

   父组件获取子组件时：

   同步组件：nextTick可以获取组件。

   异步组件：**第一次nextTick之后无法获取组件**。

2. 打包

   打包成单独的js文件存储在static/js文件夹里面

3. 生命周期顺序

   **异步组件**：父组件`beforeCreate`、`created`、`beforeMount`、`mounted` --->挨个子组件`beforeCreate`、`created`、`beforeMount`、`mounted`

   **同步组件**：父组件`beforeCreate`、`created`、`beforeMount` --->挨个子组件`beforeCreate`、`created`、`beforeMount`--->挨个子组件`mounted`---> 父组件`mounted`

## 组件

1. 当一个组件被定义，`data`必须声明为返回一个初始数据对象的函数，因为组件可能被用于创建多个实例。

   否则，会出现多个组件使用一个数据对象的情况。

2. 使用事件抛出值

   - 子组件

     ```js
     <button @click="$emit('put', 999)"><button />
     ```

   - 父组件

     `num`接收来自子组件传来的值`num`

     ```js
     <Father @put="num = $event"/>
     ```

     或者

     ```js
     <Father @put="change"/>

     methods:{
       change(num)
       {
         // change方法的第一个形参即子组件传来的值
       }
     }
     ```

3. 组件使用`v-model`

   - 父组件

     ```vue
     // 法一：有缺陷，初始值传不过去
     <Father v-model="message" />
     // 法二：刨根问底
     <Father v-bind:message="message" v-on:input="message = $event">
     // or
     <Father :message="message" @input="message = $event">
     ```

   - 子组件

     ```javascript
     Vue.component('Son', {
       props: ['message'],
       template: `
         <input
           v-bind:value="message"
           v-on:input="$emit('input', $event.target.value)"
         >
       `
     })
     ```

   小知识：`update:myPropName`模式可以用`.sync`修饰符使父子组件通信的`prop`进行双向绑定。

   - 子组件

     数据发生变化时

     ```js
     this.$emit('update:title', newtitle)
     ```

   - 父组件

     - 刨根问底

       ```js
       <text-document
         v-bind:title="doc.title"
         v-on:update:title="doc.title = $event"
       ></text-document>
       ```

     - `.sync`修饰符

       ```js
       <text-document v-bind:title.sync="doc.title"></text-document>
       ```

## prop

1. 子组件接收`prop`并作为本地数据使用。

   ```js
   props: ['initCount'],
   data() {
     return {
       count: this.initCount
     }
   }
   ```

2. 带有默认值的对象

   对象或数组默认值**必须从一个工厂函数获取**

   ```js
   props: {
     propA: {
       type: Object,
       // 对象或数组默认值必须从一个工厂函数获取
       default: function () {
      		return { message: 'hello' }
       }
     }
   }
   ```



## 插槽

### 使用

1. a.vue

   ```vue
   <template>
     <div>
       <header>
         <slot name="header"></slot>
       </header>
       <main>
         <slot></slot>
       </main>
       <footer>
         <slot name="footer"></slot>
       </footer>
     </div>
   </template>
   ```

2. App.vue

   ```vue
   <A>
     <template v-slot:header>
       <h1>header</h1>
     </template>
     <template v-slot:footer>
       <h1>footer</h1>
     </template>
     <h1>main</h1>
   </A>
   ```

### 插槽内容使用子组件数据

子组件	

```vue
<slot v-bind:propName="propName"></slot>
// propName是子组件内部数据
```

插槽内容

```vue
<template v-slot="allProp">
	// allProp可以使用所有插槽的所有属性，通过打点区分。
</template>
```

### 注意事项

1. 不带`name`的`<slot>`默认名称为“default”。
2. `v-slot`只能添加在`<template>`上。

## 访问组件或元素

### 访问根实例

```js
this.$root		
```

### 访问父组件

```js
this.$parent		
```

### 访问子组件

1. `this.$children`
2. `ref`

### 依赖注入

父组件使用实例新选项`provide`

```js
provide() {
  return {
    getMap: this.getMap
  }
}
```

子组件使用实例新选项`inject`

```js
inject: ['getMap']
```

## vue生命周期

1. `new Vue()`

   初始化事件和生命周期。

2. `breforeCreate()`

   创建实例前，可以访问实例选项`$options`，但无法访问`$el`、`data`等。

3. `created()`

   创建实例后，可以访问`data`，无法访问`$el`。

   `created` ~`breforeMount`

   - 查询是否有`$el`选项，没有则**暂停生命周期**，需手动挂载`$mount`，反之进行下一步。

   - 查询是否有模板`template`，没有则使用外部`HTML`作为模板编译，反之则`render`函数编译模板。

     优先级：`render`>`template`>`outHTML`

4. `beforeMount()`

   挂载前，无法访问`$el`。

5. `mounted()`

   挂载后，可以访问`$el`。

6. `breforeUpdate()`

   视图层`view`数据并未更新，`$el`、`data`均已更新，但真实`DOM`还未更新。

7. `updated()`

   视图层`view`数据更新，真实`DOM`更新。

8. `beforeDestroy()`

   仍可使用`this`、

9. `destoryed()`

   Vue实例销毁，解绑事件监听、子实例、`watcher`。

## vue自定义指令

### 全局注册

```js
Vue.directive('focus', {
  inserted: function(el) {
	el.focus()
  }
}) 
```

### 局部注册

实例新选项`directives`

```js
directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
```

使用：v-focus

## forceUpdate

迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

## 过滤器

常在**双花括号插值**、**`v-bind`表达式**中用于文本格式化，需被添加在`JavaScript`表达式尾部。

如：

```vue
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

### 创建过滤器

1. 局部

   ```js
   filters: {
   	function a(){}
   }
   ```

2. 全局

   ```js
   Vue.filter(funcName, function (value) {})
   ```

### 使用

`{{ message | filterA | filterB }}`中`message`用于函数`filterA`的第一个参数，`filterA`的结果被传入`filterB`。

## 混入

1. 创建混入对象

   ```javascript
   const myMixin = {
     created() {
   	this.show()    
     },
     methods:{
       show() {
         console.log('混入！')
       }
     },
   }
   ```

2. 使用混入对象

   ```javascript
   const vm = new Vue({
     mixins: [myMixin]
   })
   // 全局引入：
   Vue.mixin(myMixin)
   ```

注意事项：

- 选项合并发生冲突时，以组件数据为准。未冲突，将合并。
- 钩子函数合并，混入先被调用，其次调用组件的。

## 插件

### 开发插件

插件暴露`install(Vue, options)`方法，在此方法里do something。

```javascript
const obj = {
  install(_Vue) {
    // 如果较多时，可以forEach批量注册components
    _Vue.component("my", {
      render(createElement) {
        return createElement("h" + this.level, this.$slots.default);
      },
      props: {
        level: {
          type: Number,
          require: true,
        },
      },
    });
  },
};
```

### 使用插件

```javascript
Vue.use(obj)
```

## 过渡

### 单元素/组件过渡

Vue提供了封装组件`transition`

```vue
<transition name=""></transition>
```

常用于：

1. `v-if`
2. `v-show`
3. 动态组件
4. 组件根节点

#### 过渡类名

默认无名`transition`：`v-enter`、`v-enter-active`、`v-enter-to`、`v-leave`、`v-leave-active`、`v-leave-to`。

有`name`：`name`取代`v`。

#### 自定义类名

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

#### 注意事项

1. CSS 过渡在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除。

### 多元素过渡

可使用`v-if/v-else`。

#### 过渡模式

`transition`新`props`：`mode`

mode常用值：

1. `out-in`：当前元素过渡完，新元素再来。
2. `in-out`：新元素先过渡，当前元素再走。

#### 注意事项

1. 同名标签切换，记得设置`key`。

### 多组件过渡

可使用动态组件。

### 列表过渡

`<transition-group>`

常用`props`：

1. `tag`：默认`span`标签。

   `<transition-group>`为真实元素，默认`span`。

### 可复用过渡组件

使`<transition>`或`<transition-group>`成为根组件。

### 动态过渡

所有属性都是动态可绑定的。

## 模板template编译原理

流程

1. 定位模板

   寻找根节点`$el`

   - 不存在，手动`mount`，下一步。
   - 存在，下一步。

   寻找模板`template`，render函数编译。

   - 不存在，使用外部HTML。
   - 存在，使用。

2. **解析器**：生成AST语法树

   一段一段生成，开始标签、文本、注释、结束标签。确定层级关系使用栈，开始标签推入栈，结束标签弹出栈。

3. **优化器**：标记静态节点

   方便重新渲染，不需再为静态节点创建新虚拟树。

   标记：

   - 所有静态子树。
   - 静态根树。

4. **代码生成器**：生成render函数

   首先，得到渲染函数字符串。

   ```javascript
   with (this) {
     return _c(
       'div',
       { attrs: {"id": "app"} },
       [
         _c(
           'div',
           { staticClass: "class-name", attrs: { "title": `title`} },
           [
             _v(" "+_s(name)+" ")
           ]
         ),
         _v(" "),
         _c(
           'div',
           [_v("tetttt")]
         )
       ]
     )
   }
   ```

   再通过new Function得到渲染函数，以便得到该模板的虚拟DOM。

   注意：

   - `_c`：createElement，处理元素节点为虚拟DOM节点。
   - `_v`：createTextVNode，处理文本节点为虚拟DOM节点。
   - `_e`：createEmptyVnode，处理注释节点为虚拟DOM节点。

## 数组变化监听

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`
