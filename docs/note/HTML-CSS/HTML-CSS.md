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
