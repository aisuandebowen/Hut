# JavaScript

## ES6

### Symbol-新数据类型

Symbol是JavaScript的第七种数据类型。常用于表示独一无二的字符串，例如函数名等。

#### 定义

1. `Symbol()`

   局部，相同的串并不代表是同一个Symbol。

2. `Symbol.for()`

   全局，开辟内存空间，相同的串代表是同一个Symbol。

#### 描述

1. `symbol.description`：通用。
2. `Symbol.keyfor()`：由`Symbol.for()`建立的对象独享。

#### 用途

1. 唯一的key。

2. 对象私有属性。

   遍历时，将无法取到以Symbol对象为key的属性。

#### 注意事项

1. `for...in`取不到以Symbol对象为key的属性。
2. `Object.getOwnPropertySymbols()`可以拿到以Symbol对象为key的属性。
3. `Reflect.ownKeys()`能够获取所有属性。

### 数据结构

#### Set

类似数组，但所有value唯一。

常用

+ 属性：`size`
+ 方法：
  1. 增：`add`
  2. 查：`has`
  3. 删：`delete`
  4. `clear`：清空。
  5. `values`：获得Set迭代对象。

与数组互转

+ 转数组：`Array.from()`、`[...set]`
+ 转Set：`new Set(arr)`

##### WeakSet

和`Set`差不多，但是`WeakSet`有几个不同点：

1. 只能存放<u>引用数据类型</u>。

2. `WeakSet`的对象是弱引用。

   `WeakSet`对对象的引用不会被考虑进垃圾回收机制，只要没有引用该对象，该对象就会被回收，无论是否在`WeakSet`中被引用。因此容易被弱引用造成影响的方法都不被提供，如`values`、`size`、`for of`等。

   ```javascript
   const objs = new WeakSet();
   let obj = { qq: "123" };
   objs.add(obj);
   objs.add({
     a: "123",
     b: {
       c: "hello",
     },
   });
   console.log(objs);
   setTimeout(() => {
     console.log(objs);
   }, 5000);
   ```

#### Map

类似对象，但所有key唯一，且key可以是任意值（对象key本质是字符串）。

常用

1. 属性
2. 方法
   + 增：
     + `set`，key同样时，即为更改。
     + `new Map([[key, value], [], ...])`
   + 删：`delete`
   + 查：`has`、`get`
3. 遍历
   + `entries`，可以解构一下[key, value]
   + `keys`
   + `values`
   + `for...of`
   + `forEach`

与数组互转

+ 转数组：`[...map]`
+ 转map：`new Map([[key, value], [], ...])`

##### WeakMap

与map差不多，但**键key必须是引用数据类型**，且WeakMap是弱引用类型。

变化：`size`、`keys`等方法都用不了，因为是弱引用，不加入垃圾回收机制。

### 运算符的扩展（ES6）

#### 指数运算符`**`

```js
num1 ** num2 = num1^num2
// 右结合
num1 ** num2 * num3 = num1^(num2^num3)
// 新赋值运算符
num1 **= 3 // num1 ^3
```

#### 链判断运算符`?.`

三种用法：

1. 对象属性

   `obj`是否存在？`obj.obj2`是否存在？`obj.obj2.data`是否存在？顺序着来，不存在直接返回`undefined`。

   ```js
   const data = obj?.obj2?.data || {}
   ```

2. 对象方法

   ```js
   obj?.func()
   ```

3. 函数调用

   ```js
   func?.()
   ```

#### Null判断运算符`??`

通常赋默认值是以`||`方式提供，但 如`null、undefined、NaN、0、""、false`也会出现会被囊括其中。Null判断运算符`??`只有运算符左侧的值为`undefined`、`null`时才会返回右侧的值。

```js
const num = 0 ?? 1 // num = 0
const num = obj?.num ?? 1 // num = 1
```



## 文字翻转

```js
split('').reverse().join('')
```

## 类型判断

### `typeof`

```js
type of 1 // number
type of '1' // string
type of {} // object
type of [1, 2, 3] // object
type of function run() {} // function
type of hdcms // hdcms未定义情况下：undefined
type of hdcms // hdcms已声明情况下：undefined，因为初始值为undefined
```

### `instanceof`

```js
[] instanceof Array // true
{} instanceof Object // true
```

###`Object.prototype.toString.call(obj)`

升级版`typeof`，更强大。



## 同源、跨域页面间通信

### 同源页面

同源：协议、url、端口号一致。

1. A页面

   ```javascript
   window.addEventListener('storage', (e)=>{
     console.log(e)
   })
   ```

2. B页面

   ```javascript
   localStorage.setItem(key, value)
   ```

### 跨域页面

跨域：协议、url、端口号至少一个不一样。

1. A页面

   ```javascript
   window.addEventListener('message', (e) => {
     console.log(e)
     // e.origin 查看源地址
   })
   ```

2. B页面

   ```javascript
   const targetWindow = window.open('http://localhost:10001/user');
   setTimeout(()=>{
        targetWindow.postMessage('来自10002的消息', 'http://localhost:10001')
   }, 3000)
   ```


## 内存泄漏

不再用到的内存，没有及时释放，叫做**内存泄漏**。

### 引起的原因

1. 全局变量
2. 定时器
3. 闭包使用不当
4. 网络回调函数
5. DOM元素（js、DOM树都清理）

### Garbage Collection（GC）

1. 标记清除法

   根对象开始寻找可引用的对象，未被引用的对象移出。

2. 引用计数法

   新引用+1，移出引用-1，引用为0的对象回收。

## Websocket

### 基本用法

#### 方法

1. `close()`：主动关闭连接。
2. `send()`：客户端想服务端发送数据。

#### 事件

1. `close`：连接断开触发。
2. `error`：连接错误触发。
3. `message`：收到服务端发送的数据。
4. `open`：打开连接时触发。

例子

```javascript
const ws = new WebSocket(url)
// 建立连接
ws.addEventListener('open', () => {
  ws.send('hello server') // 向服务端发送数据
})
// 接受消息
ws.addEventListener('message', (e) => {
  // e.data
})
// 断开连接
ws.addEventListener('close', () => {
})
// 断开连接
ws.addEventListener('error', () => {
})
```

对于后端，每创建一个新的连接，都会有一个`conn`对象。

## 全局变量污染

1. 立即执行函数

   ```javascript
   (function (window) {
     function show() {
       console.log(`js2.js ---`);
     }

     window.js2 = {
       show,
     };
   })(window);
   ```

2. 块作用域

   ```javascript
   {
     let show = function () {
       console.log(`js1.js ---`);
     };

     window.js1 = {
       show,
     };
   }
   ```

## Web Workers

### 基本使用

1. 检测浏览器是否支持`Web Workers`

   ```javascript
   if(window.Worker) {}
   ```

2. 创造一个`worker`

   ```javascript
   const worker1 = new Worker(aURL, options)
   ```

   此`worker`指定一个脚本来执行线程。

   脚本里(main.js)可以写一个事件处理函数作为响应

   ```javascript
   onmessage = function (e) {
     // e.data
     postMessage(data);
   }
   ```

3. 向`worker`发送数据

   ```javascript
   worker1.postMessage(data)
   ```

4. 监听`worker`返回的消息

   ```javascript
   worker1.onmessage = function (e) {}
   ```

5. 杀掉`worker`

   ```
   worker1.terminate()
   ```

## String字符串常用方法

### 查找

1. `indexOf`、`lastIndexOf(char, loc)`

2. `includes`

3. `startsWith(str)`

   是否以str开头。

### 截取

1. `substr(start, num)`
2. `slice(start, end)`
3. `subString(start, end)`：start和end为非负的整数。

### 替换

`replace(word, replaceWord)`

### 重复

`str.repeat(num)`

## Array数组常用方法

### 检测

```javascript
Array.isArray()
```

### 数组与字符串互转

#### 转为字符串

1. `join()`

2. `String()`、`toString()`

   默认间隔英文逗号“,”。

#### 转为数组

1. `split()`

2. `Array.from(obj, map)`

3. `[...arr] = str`

   原理解构赋值+rest操作符。str本身是有 length属性的字符串，所以每个字符都放到了变量arr里。

### 元素操作

#### 添加

1. `push`

2. `unshift`

   添加到数组头部。

3. `splice(start, delNum, ele1,...)`

#### 删除

1. `pop`

2. `shift`

   删除数组尾部元素。

3. `splice(start, delNum)`

#### 移动

1. `splice`

   ```javascript
   function itemMove(arr, from, to) {
     arr.splice(to, 0, ...arr.splice(from, 1));
     return arr;
   }
   ```

### 替换

以obj替换已有数组[start, end)所有元素。

```javascript
arr.fill(obj, start, end)
```

### 清空数组

1. `arr = []`
2. 推荐：`arr.length = 0`
3. `arr.splice(0, arr.length)`

### 创建数组 

1. `Array.of(params,...)`

   ```javascript
   const arr = Array.of(1, 2, 3, true, "123");
   ```

2. `Array.from()`

   通过拥有 length 属性的对象或可迭代的对象来返回一个数组。

   ```javascript
   Array.from(obj, mapFunc, this)
   ```

   可实现浅拷贝，如

   ```javascript
   const arr = Array.from([{a: '1'}, 'b'])
   ```

3. `new Array()`

   仅传一个参数num，即创建num个为undefined的元素。多个参数与`Array.of`一致。

### 数组截取

1. `slice`

   截取数组[start, end)部分，返回一个新数组。不对原数组操作。

   ```javascript
   arr.slice(start, end)
   ```

   注意

   1. 只传一个参数时，end代表`arr.length`。
   2. slice(0)是浅拷贝！！！

2. `splice`

   此函数会**修改数组本身**，返回被修改的内容。

   ```javascript
   arr.splice(start) 
   ```

### 查找

以下查找，针对数组里的对象都是“址”查找，不是一样的地址，不会匹配。

1. `indexOf`

   查找在数组中某一指定元素（必须`===`）的第一次出现的位置。返回index、-1。

   ```js
   arr.indexOf(obj)
   ```

2. `includes`

   判断一个数组是否包含一个指定的值，返回true、false。

   ```javascript
   arr.includes(ele)
   ```

3. `find`

   查找通过测试的第一个值，返回查到的值、undefined。

   ```javascript
   arr.find(item => item > 18)

   // 手撕
   Array.prototype.find(callback) {
     for(let item of this) {
       if(callback(item)) return item;
     }
     return undefined;
   }
   ```

4. `findIndex`

   查找通过测试的第一个值，返回查到的值的索引、-1。

   ```javascript
   arr.findIndex(item => item > 18)
   ```

5. `some`

   查找是否有通过测试的值，返回true、false。

   ```javascript
   arr.some((item, index) => item > 18)
   ```

6. `every`

   类some，查找是否都有通过测试，返回true、false。

7. `filter`

   过滤不符合条件的元素，返回一个新数组（浅拷贝）。

   ```javascript
   arr2 = arr.filter(item => item > 18)
   ```

   原理：

   ```javascript
   Array.prototype.filter = function (callback) {
     const arr = [];
     for (const iterator of this) {
       callback(iterator) && arr.push(iterator);
     }
     return arr;
    };
   ```

### 合并

1. `arr.concat(array2,...)`

   返回一个新数组，将arr、arr2,...连接。传入的参数如果是数组，将被展开一层。如果是非数组，将直接作为元素添加。

2. `[...arr1, ...arr2]`

3. `Object.assign()`

### 排序

```javascript
arr.sort((a,b) => a-b) // 小于0升序，大于0降序
```

原理：

```javascript
Array.prototype.swap = function (index_a, index_b) {
  const box = this[index_a];
  this[index_a] = this[index_b];
  this[index_b] = box;
};

Array.prototype.sort = function (callback) {
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (callback(this[i], this[j]) > 0) {
        this.swap(i, j);
      }
    }
  }
};
```

### 翻转	

```javascript
arr.reverse() 
```

### 集合运算

#### 去重

```javascript
[...new Set(arr)]
```

#### 交集

```javascript
function show(arr1, arr2) {
  const arr = [];
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...set1].filter((item) => set2.has(item));
}
```

#### 并集-交集

```javascript
function show(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const fn = (s1, s2) => {
    const arr = [];
    for (let item of s1) {
      if (!s2.has(item)) {
        arr.push(item);
      }
    }
    return arr;
  };

  const res1 = fn(set1, set2);
  const res2 = fn(set2, set1);
  return [...res1, ...res2];
}
```

#### 差集

```javascript
arr1.filter((item) => !new Set(arr2).has(item))
```

### 高阶

1. 累计：`array.reduce(function(pre, currentValue, currentIndex, arr), initialValue)`

   参数：`pre`是上次的返回值，第一次为`initialValue ?? array[0]`。

   原理

   ```javascript
   Array.prototype.reduce = function (callback, initValue) {
     // 检查数组是否为null或undefined
     if (this == undefined) throw new TypeError("this is null or undefined");
     // 检查callback是否是函数
     if (typeof callback !== "function")
       throw new TypeError(`${callback} is not a function`);

     const arr = Object(this); // 确保arr为对象
     const arrLength = arr.length >>> 0; // 确保length为正数

     let index = 0; // 第一个有效值索引
     if (initValue === undefined) {
       // 寻找第一个有效值
       while (index < arrLength && !(index in arr)) index++;
       // index超出数组范围，证明是空数组
       if (index >= arrLength) {
         throw new TypeError("empty array");
       }
       // 设置初始值
       initValue = initValue ? initValue : arr[index++];
     }
     let res = initValue; // 初始化结果
     // 计算结果
     for (let i = index; i < arrLength; i++) {
       if (i in arr) res = callback(res, this[i], i, this);
     }
     return res;
   };
   ```

2. 映射：`map`

   原理

   ```javascript
   Array.prototype.map = function (callback = (item) => item) {
     const newArr = [];
     this.forEach((element) => {
       newArr.push(callback(element));
     });
     return newArr;
   };
   ```

## 对象

### 属性

#### 属性特征

1. 设置属性特征

   ```javascript
   Object.defineProperty(obj, property, {
     writable: false, // 不可写
     enumerable: false, // 不可遍历
     configurable: false, // 不可配置、删除
     value
   });

   Object.definePropertys(obj,{property1, property2,...})
   ```

2. 读取属性特征

   ```javascript
   Object.getOwnPropertyDescriptor(obj, propertyStr)

   Object.getOwnPropertyDescriptors(obj)
   ```

#### 删除属性

仅会删除对象里的属性，不会删除原型链上的。

```javascript
delete obj.property
```

#### 禁止添加属性

```javascript
Object.preventExtensions(obj)
```

检测是否禁止：`Object.isExtensible()`

#### 封闭对象

禁止添加属性，且对象不可配置

```javascript
Object.seal(obj)
```

检测是否被封禁：`Object.isSealed()`

#### 冻结对象

对象不能被修改，不可增删属性、不可配置、不可写，原型不可修改。

```javascript
Object.freeze(obj)
```

#### 检测某属性是否存在

1. `hasOwnProperty`：不查原型链，只查询对象
   ​
2. `in`：查原型链

#### 访问器

```javascript
const data = {
  set property(value) {
    
  },
  get property() {
    
  }
}
```

注意，`set`和打点访问赋值同时针对一个属性，`set`优先。

### 遍历

`for in`

### 拷贝

浅拷贝

1. `Object.assign({}, obj1, obj2)`

2. `{...obj1, ...obj2}`

3. `Object.create()`

   可以保证原型一样。

   ```javascript
   const obj2 = Object.create(
     Object.getPrototypeOf(obj),
     Object.getOwnPropertyDescriptors(obj)
   );
   ```

深拷贝

1. 老版

   ```javascript
   function cloneDeep(obj) {
     if (Array.isArray(obj)) {
       const arr = [];
       for (const ele of obj) {
         arr.push(cloneDeep(ele));
       }
       return arr;
     } else if (obj instanceof Object) {
       const copy_obj = {};
       for (const key in obj) {
         // for in会遍历所有可枚举属性
         if (obj.hasOwnProperty(key)) {
           copy_obj[key] = cloneDeep(obj[key]);
         }
       }
       return copy_obj;
     } else {
       return obj;
     }
   }
   ```

2. 新版

   ```javascript
   function cloneDeep(obj) {
     if (obj instanceof Object) {
       const res = Array.isArray(obj) ? [] : {};
       for (const [key, value] of Object.entries(obj)) {
         res[key] = cloneDeep(value);
       }
       return res;
     } else {
       return obj;
     }
   }
   ```

### 创建对象

```javascript
Object.create(prototype, properties)
```



## if()表达式和==原理

### if()

```javascript
if(1) // true ---> if(Boolean(1))
if(undefined) // fasle
if({}) // true 
if([]) // true ---> if(Boolean([]))
```

`if()`里，其实就是执行Boolan()方法。

### ==

```javascript
1 == true // true
2 == true // false ---> Number(2) == Number(true) ---> 2 == 1
[1] == true // true
```

`==`，本质是执行`Number()`方法。

### Boolean()

|    类型     |     值     | Boolean() |
| :-------: | :-------: | :-------: |
| undefined | undefined |   false   |
|   null    |   null    |   false   |
|  string   |    ''     |   false   |
|  string   |    '0'    |   true    |
|  number   |     0     |   false   |
|  number   |     1     |   true    |
|  boolean  |   false   |   false   |
|  boolean  |   true    |   true    |
|  object   |    {}     |   true    |
|  object   |  {num:0}  |   true    |
|  object   |    []     |   true    |
|  object   |    [0]    |   true    |

总结：

1. undefined、null都为false。
2. 字符串只有''为false。
3. 数值类型只有0为false。
4. 引用数据类型都为true。
5. 布尔类型看本身。

### Number()

|    类型     |     值     | Number() |
| :-------: | :-------: | :------: |
| undefined | undefined |   NaN    |
|   null    |   null    |    0     |
|  string   |    ''     |    0     |
|  string   |    '0'    |    0     |
|  string   |    '1'    |    1     |
|  string   |   '1a'    |   NaN    |
|  number   |     0     |    0     |
|  number   |     1     |    1     |
|  boolean  |   false   |    0     |
|  boolean  |   true    |    1     |
|  object   |    {}     |   NaN    |
|  object   |  {num:0}  |   NaN    |
|  object   |    []     |    0     |
|  object   |    [0]    |    0     |
|  object   |   [0,1]   |   NaN    |

总结：

1. undefined为NaN。
2. null为0。
3. 字符类型长度为0必为0。长度不为0看value是否包含非数字，不包含就是去掉引号后的值。否则NaN。
4. 数值类型保持原值。
5. 布尔类型true为1，false为0。
6. 引用数据类型。
   + 对象{}为NaN。
   + 数组长度为0即为0。长度为1则转那一个数值，长度大于1则NaN。

## Math

1. `max`、`min`

   可以使用spread、rest或apply、call来改变传入参数是列表还是数组。

2. `ceil`、`floor`

   ceil：天花板，floor：地板。

3. `round`

   四舍五入。

4. `random`

   取[0, num]的整数：`Math.floor(Math.random() * (num + 1))`。

   取[num1, num2]的整数：本质还是[0 ,num]

   ```javascript
   function getRandom(num1,  num2) {
     return (
       Math.min(num1, num2) + Math.floor(Math.random() * (num2 - num1 + 1))
     );
   }
   ```

## Date

### 获取时间戳

1. `+date`
2. `Number(date)`
3. `date.valueOf()`
4. `date.getTime`

### 时间戳转ISO时间

```javascript
new Date(timeStamp)
```

### 格式化

好库：moment.js

1. 年：`getFullYear`
2. 月：`getMonth`，从0开始。
3. 日：`getDate`
4. 小时：`getHours`
5. 分钟：`getMinutes`
6. 秒：`getSeconds`

```javascript
const d = new Date("1999-11-10 03:03:12");

function formatDate(date, format) {
  const config = {
    YY: date.getFullYear(),
    MM: date.getMonth(),
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    SS: date.getSeconds(),
  };

  for (let item in config) {
    format = format.replace(item, config[item]);
  }

  return format;
}

console.log(formatDate(d, "YY年MM月"));
```

## 原型`[[prototype]]`

![图片](https://github.com/aisuandebowen/Hut/assets/58322181/16507d31-c3a1-4d74-8fc4-8263f3026a93)


### 含义

+ 显式原型（常规属性）：`prototype`

  **`prototype`仅用在构造函数创建新对象`new F()`时，为新对象的`[[prototype]]`赋值。**

+ 隐式原型:`__proto__`

  用于设置原型`[[prototype]]`的一种方式。

### 查找

1. `Object.getPrototypeOf()`

注意：更新显式原型时，一定要在产生实例之前更新，不然实例拿到的显式原型是以前的原型。

### constructor

`Fn.prototype.constructor === Fn`

### 继承

通过`__proto__`设置`[[prototype]]`。

#### this指向问题

**无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号 . 前面的对象。**

### 常用方法

#### 设置原型

1. `Object.setPropertyOf(o. proto)`
2. `__proto__`

#### instanceof

**instanceof** **运算符**用于检测**构造函数**的 `prototype` 属性是否出现在某个实例对象的原型链上。

原理，`__proto__`一直向上找。

#### isPrototypeOf

**isPrototypeOf()** 方法用于检查一个对象是否存在于另一个对象的原型链中。

#### 创建指定原型的对象

`Object.create()`

## Class类

### new的本质

1. 创建新对象
2. 执行`constructor`为对象添加属性。
3. 为类的原型存储类的方法。

### Class的本质

```javascript
function Class() {
  this[key] = value
}
Class.prototype.method = ...
```

#### constructor

初始化顺序：

1. 类字段

   - 对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
   - 对于派生类，在 `super()` 后立刻初始化。

2. 非类字段（往原型上添加的）

   在构造函数调用前初始化。

#### Class与function的区别

1. 特殊属性`[[IsClassConstructor]]`，只能new
2. 类的方法是不可枚举的`enumerable`
3. 类总是使用严格模式
4. 类没有变量提升
5. 类有两条继承链（构造函数+原型链）

### 类字段

“类字段”是一种允许添加任何属性的语法。

这种类似于在`constructor`里使用`this[] = ...`，会直接加在new出的对象里。而非类字段添加的方法，会添加到原型上。可以**避免`this`指向出错**的问题出现。

```javascript
class User {
  name = '123'
  show = () => {}
}
```

### 继承extends

本质：子类`prototype`属性设置`[[prototype]]`为父类的`prototype`。

![继承图](https://zh.javascript.info/article/static-properties-methods/animal-rabbit-static.svg)

注意

+ extends关键字后可以跟任意表达式，但原理仍是设置`[[prototype]]`。
+ 继承后，子类`[[prototype]]`等于父类

#### 重写

通俗一点，就是和父类的**方法同名**。此时，优先执行子类的方法。

优先顺序：类字段 > 类的原型方法 > 父类的原型方法

#### super

1. 构造方法`super()`

   + 如果是派生类，未定义`constructor`，默认执行父类的构造函数。
   + 如果派生类已定义`constructor`，必须**在使用`this`之前使用`super`**。因为，派生类中`this`来源于父类，只有基类是默认空对象赋给`this`。

2. 普通方法`super.method()`

   + 原理：方法在内部的`[[HomeObject]]`属性中记住了它们的类/对象，`[[HomeObject]]` 不能被更改，所以这个绑定是永久的。因此，`super`能够解析到父类方法。当方法被复制时，`[[HomeObject]]`仍然未变！！！
   + 注意：**是方法，不是类字段喔~**

   ​


### static静态

#### 基础

静态的用武之地：

+ 静态方法
+ 静态属性

本质在于**为类添加属性和方法**，而不是在原型链上添加属性和方法，当然，静态属性就不能被类生成的对象访问。只有通过`类.方法`或者`类.属性`的方式使用。

#### 继承

继承有两个地方：

1. `Son.__proto__ ==== Father`
2. `Son.prototype.__proto__ === Father.prototype`

##### 讨论

任何类的顶层原型都是`Object`，这和`extends`有什么区别？

区别就在于**子类的原型`[[prototype]]`等于父类**

### 扩展内建类

使用`extends`关键字扩展js原生类如`Array`、`Object`和`String`等等。

#### 特殊静态getter `Symbol.species`

当在执行`map`、`filter`等方法时，可以设置执行的`constructor`，方便扩展的内建类使用原生方法返回的类仍然是内建类。

注意，`String`、`Array`并不算是继承了`Object`，只继承了`prototype`上的原型，但是类之间并没有继承原型。

### 类型判断

|                      | 用于                                       | 返回值        |
| -------------------- | ---------------------------------------- | ---------- |
| `typeof`             | 原始数据类型                                   | string     |
| `{}.toString.call()` | 原始数据类型，内建对象，包含 `Symbol.toStringTag` 属性的对象 | string     |
| `instanceof`         | 对象                                       | true/false |

1. typeof

   幺蛾子多，对`null`、`[]`、`{}`返回值都是`Object`。

2. `{}.toString.call()`

   加强版`typeof`，本质读取对象属性 `Symbol.toStringTag`，可以自定义更改。

   ```javascript
   /**
    * 判断对象类型
    * 对于 number 类型，结果是 [object Number]
    * 对于 boolean 类型，结果是 [object Boolean]
    * 对于 null：[object Null]
    * 对于 undefined：[object Undefined]
    * 对于数组：[object Array]
    * @param {*} obj
    * @returns
    */
   function judgeType(obj) {
     return {}.toString.call(obj);
   }
   ```

   自定义修改示例：

   ```javascript
   const obj = {
     [Symbol.toStringTag]: "Peter",
   };

   console.log(judgeType(obj)); // [object Peter]
   ```

3. `instanceof`

   本质是顺着原型链向上找，和`isPrototypeOf`一样的。


## try-catch

```javascript
class HytError extends Error {
  constructor(mesage) {
    super(mesage);
    this.name = this.constructor.name;
  }
}

/**
 * 包装异常
 */
class ReadError extends HytError {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}
/**
 * 校验异常
 */
class ValidationError extends HytError {
  constructor(property) {
    super(`not property: ${property}`);
    this.property = property;
  }
}
/**
 * 格式化异常
 */
class FormatError extends HytError {
  constructor(data) {
    super(`${data} format error`);
  }
}
const errorClassArr = [ValidationError, FormatError];

/**
 * 校验User
 * @param {Object} data
 */
function validateUser(data) {
  if (!data.name) {
    throw new ValidationError("name");
  }

  if (!data.age) {
    throw new ValidationError("age");
  }
}
/**
 * 格式化data
 * @param {Object} data
 * @returns
 */
function formatData(data) {
  let res = {};
  try {
    res = JSON.parse(data);
  } catch (error) {
    throw new FormatError(data);
  }
  return res;
}

/**
 * 主函数
 */
function fn() {
  try {
    let orgin = '{"name":1}';
    const data = formatData(orgin);
    validateUser(data);
  } catch (error) {
    errorClassArr.forEach((item) => {
      if (error instanceof item) {
        throw new ReadError(error.message, error);
      } else {
        console.error(error);
      }
    });
  }
}

/**
 * 入口
 */
function main() {
  try {
    fn();
  } catch (error) {
    if (error instanceof ReadError) {
      console.error(error.cause);
    } else {
      console.log(error);
    }
  }
}

main();
```

### 注意

1. `try...catch`只能捕捉同步任务的异常。
2. `throw`后，后续的代码将不再执行。

### 全局catch

```javascript
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

## Promise

### 使用

```javascript
const promise = new Promise(function(resolve, reject) {
  // executor 立即执行
});
```

1. 当 `new Promise` 被创建，executor 会自动运行。

2. 当 executor 获得了结果，无论是早还是晚都没关系，它应该调用以下回调之一：

   - `resolve(value)` —— 如果任务成功完成并带有结果 `value`。
   - `reject(error)` —— 如果出现了 error，`error` 即为 error 对象。

   若不调用回调，状态一直是`pending`。

3. 状态变化

   ![状态变化](https://zh.javascript.info/article/promise-basics/promise-resolve-reject.svg)

4. 执行了`resolve`、`reject`后，不会再执行`resolve`、`reject`，而`executor`的代码依旧会正常执行。

### then、catch

```javascript
promise.then(suc=>{},err=>{})

promise.catch(err=>{})
```

promise 的执行者（executor）和 promise 的处理程序周围有一个“隐式的 `try..catch`”。如果发生异常（`reject`）或同步错误(`Error`)，它就会被捕获，并被视为 rejection 进行处理。

### 全局未处理的reject

如果一个 promise 的 error 未被在微任务队列的末尾进行处理，则会出现“未处理的 rejection”。

```javascript
window.addEventListener('unhandledrejection', function(event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] —— 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! —— 未处理的 error 对象
});

```

### 常用静态API

#### Promise.all

常用于执行多个`promise`，并等待所有`promise`准备就绪。

```javascript
Promise.all(iterable)
```

注意：

> 如果有多个同时进行的 `fetch` 调用，其中一个失败，其他的 `fetch` 操作仍然会继续执行，但是 `Promise.all` 将不会再关心（watch）它们。它们可能会 settle，但是它们的结果将被忽略。

1. 如果有一个`promise`被reject，则`Pormise.all`会立即`reject`，并携带这个`reject`的`error`。
2. 参数`iterable`是可迭代对象，一般是数组。数组里的元素，一般是`Pormise`对象，但是允许是非`Promsie`对象。

#### Promise.allSettled

和`Promise.all`的API类似，不同的是`allSettled`的结果里既有`fullfiled`又有`rejected`。我们仍然可以对`fullfilled`状态的结果进行处理。

#### Promise.race

返回第一个`settled`的`promise`。

#### Promise.any

返回第一个`fullfiled`的`promise`。

#### Promise.resolve/reject

如名。

### 微任务队列（Microtask queue）

当一个 promise 准备就绪时，它的 `.then/catch/finally` 处理程序就会被放入队列中：但是它们不会立即被执行。当 JavaScript 引擎执行完当前的代码，它会从队列中获取任务并执行它。

### async/await

#### async function

有`async`关键字开始的函数，默认返回`promise`对象，其他值将被包装在**一个 resolved 的 promise 中**。

#### await

等待`promise`完成`settle`。不仅支持等待`promise`，还支持`thenable`。即包含`then(resolve,reject)`函数的对象。

注意：如果 `await` 接收了一个非 promise 的但是提供了 `.then` 方法的对象，它就会调用这个 `.then` 方法，并将内建的函数 `resolve` 和 `reject` 作为参数传入（就像它对待一个常规的 `Promise` executor 时一样）。然后 `await` 等待被调用（在上面这个例子中发生在 `(*)` 行），然后使用得到的结果继续执行后续任务。

#### Error

针对`await`中返回`rejected`状态的`promise`对象，本质相当于`throw...`，因此只需`try...catch`。

```javascript
async function fn(){
  await Promise.reject(...)
}     
```

优雅解决方案：

1. `fn().catch(...)`
2. `fn`内部处理。



## 中文转码

+ 转URL安全格式`encodeURIComponent`
+ 解码`decodeURIComponent`
