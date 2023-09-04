# HTML CSS

## Flex布局

### 使用flex布局

1. 容器

   ```css
   .box {
     display: flex;
   }
   ```

2. 行内元素

   ```css
   .box {
     display: inline-flex;
   }
   ```

flex布局后，`float`、`vertical-align`、`clear`失效。

### 容器属性

1. `flex-direction`：主轴方向

   属性值

   - `row`：子元素起点在左，左到右。
   - `row-reverse`：起点在右，右到左。
   - `column`：起点在上，上到下。
   - `column-reverse`

2. `flex-wrap`：换行

   - `nowarp`：不换行，缩小各子元素宽度。
   - `warp`：换行。
   - `warp-reverse`：换行，但从下至上，原第一排在最下方。

3. `flex-flow`：`flex-direction`和`flex-wrap`缩写。

   ```css
   flex-flow: column nowarp;
   ```

4. `justify-content`：项目在主轴上对齐方式

   - `flex-start`：左对齐，默认值。
   - `flex-end`：右对齐。
   - `center`：居中。
   - `space-between`：两端对齐，项目间间隔相等。
   - `space-around`：项目间间隔相等。

5. `align-items`：项目在交叉轴的对齐方式

   - `flex-start`
   - `flex-end`
   - `center`
   - `base-line`：和项目第一行文字基线对齐。
   - `strench`：默认值，没有高度将撑满容器。

6. `align-content`：多根轴线的对齐方式

   - `flex-start`：左对齐，默认值。
   - `flex-end`：右对齐。
   - `center`：居中。
   - `space-between`：两端对齐，项目间间隔相等。
   - `space-around`：项目间间隔相等。
   - `stretch`

### 项目属性

1. `order`：项目排列顺序，默认0，越小越靠前。

2. `flex-grow`：项目放大比例，默认0。

   如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

3. `flex-shrink`：项目缩小比例，默认1。

   所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

4. `flex-basis`：项目占据的主轴空间，默认为auto即项目原本大小。

5. `flex`：`flex-grow`、`flex-shrink`、`flex-basis`三者合一。

   `flex:1`代表`flex-grow:1`、`flex-shrink:1`、`flex-basis:0%`，项目将自动平分剩余空间。

6. `align-self`：覆盖`align-items`属性，允许单个项目在交叉轴上有不一样的对齐方式。

## Canvas

### 线条

- `moveTo(x,y)`：起点
- `lineTo(x,y)`：终点
- `stroke()`：绘制

### 矩形

`fillRect(*x,y,width,height)`

参数：

- `x、y`：左上角坐标
- `width、height`：宽高

### 圆

- `beginPath()`

  开始一条路径，或重置当前的路径。

- `arc(x, y, r, startAngle, endAngle)`

  参数：

  - `x、y`：圆中心坐标
  - `r`：圆半径
  - `startAngle、endAngle`：起始角、结束角。

- `stroke()`

### 文本

- `font`：设置属性

  ```javascript
  ctx.font = '30px Arail'
  ```

- `fillText(str, x, y)`：绘制实心文本。

- `strokeText(str, x, y)`：绘制空心文本。

### 图像

`drawImage(image,x,y*)`

注意需图片加载出来`onload`后再调用。

### 渐变

- 线性渐变

  `createLinearGradient(x,y,x1,y1)`

- 圆/径向渐变

  `createRadialGradient(x,y,r,x1,y1,r1) `

- 颜色停止

  `addColorStop(location, color)`

```javascript
const grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

ctx.fillStyle = grd;
ctx.fillRect(50, 125, 150, 75);
```

### 水印实战

原理：生成单个`canvas`水印，放到大`div`中，此大`div`设置`absolute`定位、高`z-index`、`background-img:url()`，依靠背景图片默认`repeat`。

css解读

1. `position: absolute`：将元素从文档流拖出来，对其最接近的一个具有定位属性的父定位包含框进行绝对定位。如果不存在这样的定位包含框，则相对于浏览器窗口。
2. `pointer-events: none`：该元素永远不会成为鼠标事件的 target。当其后代元素的`pointer-events`属性指定其他值时，鼠标事件可以指向后代元素。

```javascript
/*
 * @Author: cbw
 * @Date: 2022-09-23 16:21:05
 * @LastEditors: cbw
 * @LastEditTime: 2022-09-26 11:22:07
 * @Description:
 */
class WaterMark {
  #canvasOptions; // canvas默认配置
  #canvasIndividualOptions; //canvas个性化配置
  #waterMarkStyle; // 水印默认配置
  #waterMarkIndividualStyle; // 水印个性化配置
  #wm; // 水印DOM
  #Uuid; // 唯一id
  #waterMarkStyleStr; // style字符串

  constructor(canvasOptions = {}, waterMarkStyle = {}) {
    // canvas默认配置
    this.#canvasOptions = {
      width: 400, // canvas宽
      height: 400, // canvas高
      font: "normal 16px 思源黑体_ Regular",
      fillStyle: "rgba(10, 100, 80, .2)", // 文本颜色
      textAlign: "center",
      fillTextArr: ["Boen", "3150987521986"], // 文本
      rotate: -20, // 旋转角度
      fillTextX: 100, // 文本横坐标
      fillTextY: 100, // 文本纵坐标
    };
    // 水印默认配置
    this.#waterMarkStyle = {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      "z-index": "99999",
      "pointer-events": "none", // 永远不成文鼠标事件的 target
      container: document.body, // 水印创建位置
    };
    // canvas个性化配置
    this.#canvasIndividualOptions = canvasOptions;
    // 水印个性化配置
    this.#waterMarkIndividualStyle = waterMarkStyle;
    // 初始化
    this.#init();
  }

  /**
   * 创建canvas
   * @param {Object} options 选项
   * @returns canvasUrl
   */
  createCanvasUrl(options = {}) {
    const canvas = document.createElement("canvas"); // 创建canvas
    // 设置属性
    canvas.setAttribute("width", options?.width ?? this.#canvasOptions.width);
    canvas.setAttribute(
      "height",
      options?.height ?? this.#canvasOptions.height
    );
    const ctx = canvas.getContext("2d");
    ctx.font = options?.font ?? this.#canvasOptions.font;
    ctx.fillStyle = options?.fillStyle ?? this.#canvasOptions.fillStyle;
    ctx.textAlign = options?.textAlign ?? this.#canvasOptions.textAlign;
    ctx.rotate(
      (Math.PI / 180) * (options?.rotate ?? this.#canvasOptions.rotate)
    );
    const fillTextArr = options?.fillTextArr || this.#canvasOptions.fillTextArr;
    for (let i = 0; i < fillTextArr.length; i++) {
      const fillText = fillTextArr[i];
      // 防止多文本重叠
      ctx.fillText(
        fillText,
        options?.fillTextX ?? this.#canvasOptions.fillTextX,
        (options?.fillTextY ?? this.#canvasOptions.fillTextY) + 20 * i
      );
    }
    const canvasUrl = canvas.toDataURL(); // 获取base64图片URL
    return canvasUrl;
  }

  /**
   * 创建水印
   * @param {String} bgcImgUrl
   * @param {Object} options
   */
  createWaterMark(bgcImgUrl, options = {}) {
    this.#Uuid = this.getUuid();
    const waterMark = document.createElement("div");
    waterMark.setAttribute("id", this.#Uuid);
    this.#waterMarkStyleStr = "";
    // 拼接成style字符串
    for (let key in this.#waterMarkStyle) {
      this.#waterMarkStyleStr +=
        key + `:${options?.[key] ?? this.#waterMarkStyle[key]};`;
    }
    this.#waterMarkStyleStr += `background-image:url(${bgcImgUrl});`;
    waterMark.setAttribute("style", this.#waterMarkStyleStr); // 设置style属性
    options?.container?.appendChild(waterMark) ??
      this.#waterMarkStyle.container.appendChild(waterMark);
    return waterMark;
  }

  /**
   * 生成uuid
   * @returns
   */
  getUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * 初始化
   */
  #init() {
    const base64Url = this.createCanvasUrl(this.#canvasIndividualOptions); // base64图片
    this.#wm = this.createWaterMark(base64Url, this.#waterMarkIndividualStyle); // 创建水印
    this.#observer();
  }

  /**
   * 移除水印
   */
  #remove() {
    const wmDiv = document.getElementById(this.#Uuid);
    // 防止预移出节点不存在
    if (!wmDiv) {
      this.#waterMarkIndividualStyle?.container?.removeChild(this.#wm) ??
        this.#waterMarkStyle.container.removeChild(this.#wm);
    }
  }

  /**
   * 防止控制台删除水印
   */
  #observer() {
    const targetNode =
      this.#waterMarkIndividualStyle?.container ??
      this.#waterMarkStyle.container; // 监听节点
    // 监听配置
    const observerConfig = {
      subtree: true,
      childList: true,
      attributes: true,
    };
    // 创建observer对象
    const observer = new MutationObserver(() => {
      const wmDiv = document.getElementById(this.#Uuid);
      // wmDiv不存在
      if (!wmDiv) {
        this.init();
        return;
      }
      // css样式被修改
      if (wmDiv.getAttribute("style") !== this.#waterMarkStyleStr) {
        wmDiv.setAttribute("style", this.#waterMarkStyleStr);
      }
    });
    // 开始监听
    observer.observe(targetNode, observerConfig);
  }
}

const wm = new WaterMark();
const wm2 = new WaterMark(
  {},
  (waterMarkStyle = { left: "150px", top: "150px" })
);
```

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

![img](https://img2018.cnblogs.com/blog/850375/201907/850375-20190708151615691-1017611190.png)

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

  ​

# TS

官方文档：`https://www.tsdev.cn/type-inference.html`

## 数据类型

any、number、string、boolean、数组、元组、enum、void、null、undefined、never

### 手动指定类型

`<type> value` or `value as type`

### 类型断言

1. as 关键字`var as string`
2. `<>var`
3. `!`非空断言操作符

## 接口

```typescript
interface inter {
  num?: number, // 可选
  readonly str: string, // 只读
  [propName: string]: any, // 额外属性
  (name: string):void, // 函数
  [index: number]: string, // 索引类型
}
```



## 变量声明

```
var [变量名] : [类型] = 值;
```

### 函数声明

```typescript
  type C = { a: string };
  function show({ a }: C) {
    console.log(a);
  }
```

## 函数

### 基本语法

```javascript
function fnName(ele:type, ele?:type):returnType {
  return ...
}
```

### 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

```javascript
function fn(num:number):void;
function fn(str:string,num:number):void;
```

### 推断类型

```typescript
interface Show {
  (name: string): void;
}

const show: Show = (name) => {
  console.log(name);
};
```

### 参数

+ 默认参数

  `const fn2 = (val: string = "defalut value") => {};`

  默认参数，本质也转为了可选参数。

+ 可选参数

  `const fn1 = (val?: string) => {};`

+ 剩余参数

  `const ff = (...args: any[]) => {};`

## 泛型

### 简介

相当于一个类型变量，指定一个函数的未知类型。

```typescript
interface Kan<T> {
  (num: T): void;
}

function kankan<Y>(num: Y): void {
  console.log(num);
}

const kan: Kan<number> = kankan;

```

### 泛型约束

就是将泛型变量继承一个**接口**，实现约束。

```typescript
interface B {
  length: number;
}

function kankan<T extends B>(num: T): void {
  console.log(num.length);
}
```

## 枚举

```typescript
enum Resposne {
  Success,
  Failure = 'Failure'
}
```

枚举值：

+ 默认第一位为0，递增1。
+ 可给值常数枚举表达式。

## 元组

```javascript
const num = [1,'2',false,4]
```

可放任意类型的**数组**。

## 联合类型

类型即可是type1，也可是type2.

```javascript
const num:type1 | type2;
```

## 类

### 继承extends

子类只能继承一个类，但可以多重继承。

注意：

1. `super`关键字

   用于访问父类的属性、方法

   + 派生类包含了一个构造函数，它***必须*调用`super()`**，它会执行基类的构造函数。
   + 在构造函数里访问`this`的属性之前，*一定*要调用`super()`

### 抽象类

与接口类似，用于定义抽象方法和属性。但不同于接口。主要区别在于抽象类里可以有成员实现的细节。

```typescript
abstract class Person {
  abstract show(): void;
}

class XiaoMing extends Person {
  show() {
    console.log("1111111");
  }

  kan() {
    console.log(222222222);
  }
}

const xiao: Person = new XiaoMing();
xiao.show()
xiao.kan(); // error: 因为xiao定义了Person类型，里面只能有show方法

```



### readonly修饰符

 只读属性必须在声明时或构造函数里被初始化。

```typescript
  class Person {
    readonly code: string = "pidan";
  }

  class XiaoMing extends Person {
    name: string;
    constructor(name: string) {
      super();
      this.name = name;
    }

    show() {
      console.log(`${this.name} - ${this.code}`);
    }
  }

  const xiao = new XiaoMing("123");
  xiao.show();
```

### 静态static

### 类型判断instanceof

### 访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。

- **public（默认）** : 公有，可以在任何地方被访问。
- **protected** : 受保护，可以被其**自身以及其子类**访问。
- **private** : 私有，只能被其定义所在的类访问。

### 多态

```javascript
interface Water {
  weight: number;
}

class Ice implements Water {
  weight: number;
  name: number;
  constructor(weight: number, name: number) {
    this.name = name;
    this.weight = weight;
  }
}

class Liquid implements Water {
  weight: number;
  age: number;

  constructor(weight: number, age: number) {
    this.weight = weight;
    this.age = age;
  }
}

function showWeight(water: Water) {
  console.log(water.weight);
}

const liquid = new Liquid(999, 111);
showWeight(liquid);

```

## 命名空间

在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中。

```typescript
namespace Boen {
  export class Water {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  export interface Ice {
    type: string;
  }
}

// 使用
Boen.Water ...
```

# 杂

## Git

工作区：写好的代码，以文件形式保存的。

暂存区：`add`之后的。

本地仓库：`commit`之后的。

### Git版本回退

1. 查看提交记录

   复制指定`commit`的版本`id`。

   ```
   git log
   ```

2. 版本回退

   ```
   git reset
   ```

   - `git reset --soft`

     暂存区、工作区保持不变，本地仓库回滚到**指定版本`commit`完成后的那一刻**。

   - `git reset --mixed`

     工作区保持不变，本地仓和暂存区	回滚到指定版本。

   - `git reset --hard`

     本地仓、暂存区、工作区都回滚到指定版本。

   ![reset图解](https://img-blog.csdnimg.cn/15aef5b21c594dad9d0248d88d0cef13.png#pic_center)

### 修改commit message

```
git commit --amend
```

### 版本比对

` git diff [first-branch]...[second-branch] `

优化处理：

1. 只显示变更文件

   ```
   git diff --name-only
   ```

2. 变动文件状态(添加,修改,还是删除)

   ```
   git diff --name-status
   ```

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

# 需求开发思考

## 了解需求

1. 需求是什么？

2. 大致的流程是什么？

3. 我需要什么？

   接口、数据、格式...

4. 是否需要配置项？

## 开发思考
### 数据操作

1. 增：
   + 去重
   + 校验
2. 删
   + 不存在如何？
3. 查
   + 怎样更快？
4. 改
   + 校验
   + 去重
   + 唯一ID

做完增删查改，是否需要**还原**成**初始状态**？是否需要刷新最新数据？

### 网络请求

1. 数据赋值等，必做`try catch`。
2. 请求时，必做loading。
3. 异常捕捉。
4. 网速慢怎么办？await做的如何？


# 待做

## JSX

1. 如何引入css
2. 插槽、事件监听...怎么用的
3. 为什么this里有data的内容
