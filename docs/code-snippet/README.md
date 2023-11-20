## JavaScript

### 登录登出
```javascript
const route = {
  LOGIN: "/login",
  SUCCESS: "/success",
};

export function logOut() {
  const href = location.href;
  location.replace(`${route.LOGIN}?url=${href}`);
}

export function login() {
  const getOldHrefReg = /login\?url=(.*)/;
  const res = location.href.match(getOldHrefReg);
  const href = res ? res[1] : route.SUCCESS;
  location.replace(decodeURIComponent(href));
}
```

### 页签通信
```javascript
export default class TabCommunication {
  /**
   * 构造函数
   * @param {Object} options
   * @param {Function} options.handleMsgFn 处理消息的方法
   * @param {String} options.name 页签名
   */
  constructor({ handleMsgFn, name }) {
    this.handleMsgFn = handleMsgFn;
    this.name = name;
    this.init();
  }

  /**
   * 初始化
   */
  init() {
    window.addEventListener("storage", (data) => {
      const value = data.newValue;
      if (value && this.handleMsgFn) {
        // 发送数据
        this.handleMsgFn.call(this, {
          key: this.name,
          value: JSON.parse(value),
        });
      }
    });
  }

  /**
   * 发消息
   * @param {Object} option - data
   * @param {String} option.key - key
   * @param {*} option.value -value
   */
  static sendMes({ key, value }) {
    if (key) {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.localStorage.removeItem(key);
    }
  }
}
```

### 复制样式

```javascript
function copyStyle(sourceEl, targetEl, isDeep = true) {
  const sourceStyle = window.getComputedStyle(sourceEl); // 获取样式
  // 复制样式
  for (let i = 0; i < sourceStyle.length; i++) {
    const property = sourceStyle[i];
    const value = sourceStyle.getPropertyValue(property);
    targetEl.style.setProperty(property, value);
  }
  // 深度复制
  if (isDeep) {
    const sourceChild = sourceEl.children;
    const targetChild = targetEl.children;

    for (let i = 0; i < targetChild.length; i++) {
      copyStyle(sourceChild[i], targetChild[i], isDeep);
    }
  }
}
```

### 简版Object.assign

index.js

```javascript
import _assign from './object-assign-deep';

/**
 * 一个或者多个源对象中的属性复制到“目标对象的自有属性”，并“返回修改后的目标对象”。
 * eg: objA = { a: 1, b: 2, c: { num: 99 } }
 *     objB = { b: 4, c: { num: 77, str: 'piter' }}
 *     res = {a: 1, b: 4, c: { num : 77 } }
 * @param {Object} target
 * @param {Boolean} isCloneDeep
 * @param  {...Object} sources
 */
export default function assign(target, isCloneDeep = false, ...sources) {
  if (!isObject(target)) {
    throw new Error('target must be a Object');
  }

  for (const source of sources) {
    if (isObject(source)) {
      _assign(target, source, isCloneDeep);
    }
  }
  return target;
}

```

object-assign-deep.js

```javascript
import { cloneDeep } from 'lodash';

/**
 * 对象深度合并，类似Object.assign。
 * @param {Object} target 目标对象
 * @param {Object} source 要拷贝的对象
 * @param {Boolean} isCloneDeep 是否对值深度克隆（针对引用数据类型）
 * @description 仅对源对象已有属性，且属性值为对象的深度合并
 * @returns
 */
export default function _assign(target, source, isCloneDeep = false) {
  // source必须是对象
  if (!isObject(source)) return target;

  const keys = Object.keys(target);
  for (const key of keys) {
    const targetValue = target[key]; // 目标value
    const sourceValue = source?.[key]; // 将合并的value

    // 如果targetValue是对象，继续深度赋值
    if (isObject(targetValue)) {
      _assign(targetValue, sourceValue);
    } else if (Object.hasOwnProperty.call(source, key)) {
      // 如果targetValue不是对象，且source存在此Key
      target[key] = isCloneDeep ? cloneDeep(sourceValue) : sourceValue;
    }
  }
  return target;
}

```
isObject.js
```javascript
export default function isObject(target) {
  return {}.toString.call(target) === '[object Object]';
}

```
### 水印
```javascript
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
### 防抖节流
#### 防抖
持续触发事件，n秒内再次触发某事件，将重新计算时间才执行。因此，只有**最后一次操作能被触发**。
```javascript
function debounce(fn, delay = 500) {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
```
#### 节流
持续触发事件，n秒内再次触发某事件，将等待上一次事件处理函数完成后，才执行。可以把这个理解成游戏中的“技能**冷却时间**”。
```javascript
function throttle(fn, delay = 1500) {
    let timer = null // 定时器
    let pre = +new Date() // 计算开始时间
    return (...args) => {
        const now = +new Date() // 计算当前时间
        const remaining = now - pre // 计算剩余时间
        clearTimeout(timer) // 取消先前调用的setTimeout
        if(remaining > delay) {
            // 超过冷却时间，立即执行
            fn.apply(this, args)
            pre = +new Date() // 更新开始时间
        }else {
            // 未超过冷却时间，禁止执行。同时保证最后一次调用，仍然可以执行。
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}
```
## Vue
### v-copy
```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      要复制的内容：
      <h1>{{message}}</h1>
      <button v-copy="message">点击复制</button>
    </div>
    <script>
      const vm = new Vue({
        el: "#app",
        data: {
          message: "999感冒灵",
        },
        directives: {
          copy: {
            // 指令第一次绑定到元素时
            bind(el, { value }) {
              // 初始化要复制的内容
              el.$value = value;
              // 初始化点击事件
              el.handle = () => {
                // 创建textarea
                const textarea = document.createElement("textarea");
                // 为textarea的value赋值
                textarea.value = el.$value;
                // 防止ios唤起键盘
                textarea.readOnly = "true";
                // 将textarea移出可视区
                textarea.style.position = "absolute";
                textarea.style.left = "-9999px";
                // 添加DOM元素
                document.body.appendChild(textarea);
                // 选中textarea的文本
                textarea.select();
                // 将当前选中区复制到剪贴板
                document.execCommand("Copy");
                // 移出DOM元素
                document.body.removeChild(textarea);
              };
              // btn添加监听事件
              el.addEventListener("click", el.handle);
            },
            //  VNode 及其子 VNode 全部更新后调用
            componentUpdated(el, { value }) {
              // 更新value
              el.$value = value;
            },
            // 指令与元素解绑时调用
            unbind(el) {
              // 解绑点击事件
              el.removeEventListener("click", el.handle);
            },
          },
        },
      });
    </script>
  </body>
</html>
```
参考文章：[https://juejin.cn/post/7067051410671534116#heading-1](https://juejin.cn/post/7067051410671534116#heading-1)
## Typescript
