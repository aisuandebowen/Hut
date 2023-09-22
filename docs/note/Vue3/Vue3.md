# Vue3

## 生命周期（组合式API）

![](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

1. `setup`

   组合式API特有，在created之前

2. `onBeforeMount`

3. `onMounted`

4. `onBeforeUpdate`

   `props`发生变更时，会调用此方法。

5. `onUpdated`

6. `onBeforeUnmount`

7. `onUnmounted`

## 错误拦截

```javascript
app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.log(err);
};
```

## 响应式原理

Proxy

## 格式

1. prop 名称还是 v-on 的事件名称，都需要转换为相应等价的 kebab-case (短横线连字符) 形式


## 响应式

+ `reactive`：只能用引用数据类型
+ `ref`：all。
  + 包装成带`value`属性的ref对象。
  + 当 ref 在模板中作为顶层属性被访问时。它们会被自动“解包”，所以不需要使用 `.value`。

## 计算属性

`computed(Function)`

## watch监听

方法：`const unwatch = watch(ele, (newVal, oldVal) => {}, options)`

参数：

1. `ele`可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组。
2. `watchEffect()、watchPostEffect()` 允许我们自动跟踪回调的响应式依赖
3. options包括deep、immediate、flush
4. 手动关闭`unwatch()`

注意：

1. watch不可以监听响应式对象的属性。解决方法：getter函数
2. 用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

## ref

ref支持访问模板、v-for、函数、组件

访问子组件：`const refName = ref(null)`

注意：

1. `<script setup>` 的组件是**默认私有**的。父组件无法访问子组件，需要子组件在其中通过 `defineExpose` 宏显式暴露。

   ```javascript
   <script setup>
   import { ref } from 'vue'

   const a = 1
   const b = ref(2)

   // 像 defineExpose 这样的编译器宏不需要导入
   defineExpose({
     a,
     b
   })
   </script>
   ```


## 编译宏命令

1. `defineExpose`,暴露子组件属性。
2. `defineProps` ，定义子组件`props`
3. `defineEmits` 

## 组件

通过 `<script setup>`，导入的组件都在模板中直接可用。

## v-model

`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。

小技巧：父子组件可以使用`computed`做`v-model`。
```
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```

## 禁用 Attributes 继承

`inheritAttrs: false`。

## 透传

`class`、`style` 和 `id`。

+ 显式绑定`Attributes`继承：`v-bind="$attrs"`

+ 访问透传 Attributes

  ```javascript
  import { useAttrs } from 'vue'

  const attrs = useAttrs()
  ```

  ​


## 依赖注入

### 父组件

`provide(propName, value)`

### 子组件

`const prop = inject(propName, default)`

### 传输的数据

+ 可操作

  ```javascript
  // fath
  provide(propName,{value, chanegMethod})
  // son
  const {value, changeMethod} = inject(propName)
  ```

+ 不可操作

  ```javasc
  provide("read-only-state", readonly(state));
  ```
