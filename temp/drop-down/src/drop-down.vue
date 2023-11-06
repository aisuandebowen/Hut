<template>
  <div class="right-menu">
    <!-- 绑定位置 -->
    <div class="right-loc" v-on="triggerEvent">
      <slot> </slot>
    </div>

    <!-- 覆盖右键菜单 -->
    <div ref="overlay" class="overlay" :style="overlayStyle">
      <template>
        <slot name="overlay"></slot>
      </template>
    </div>
  </div>
</template>

<script>
import props from "./props";
import { FIX_LOC_MODE } from "./props";
import contain from "./utils/dom-tools/contain";
import { addEventListener } from "./utils/dom-tools/dom-utils";

export default {
  name: "DropDown",
  props,
  data() {
    return {
      /** 右键菜单显隐 */
      overlayVisible: false,
      /** 触发事件 */
      triggerEvent: {
        contextmenu: this.onContextmenu,
      },
      /** 右键菜单样式 */
      overlayStyle: {
        position: "absolute",
        left: "",
        top: "",
        "z-index": this.zIndex,
      },
      /** 要监听的对象 */
      listeners: {
        body: null,
        window: null,
        currentDom: null,
      },
    };
  },
  mounted() {
    const overlayDOM = this.$refs.overlay;
    document.body.appendChild(overlayDOM);
    this.listenEvent();
  },
  methods: {
    /**
     * 监听事件
     */
    listenEvent() {
      /** 文档点击 */
      this.listeners.body = addEventListener(
        document.body,
        "click",
        this.onDocumentClick
      );
      /** window失焦 */
      this.listeners.window = addEventListener(
        window,
        "blur",
        this.closeOverlay
      );
      /** 滚动条滚动 */
      this.listeners.currentDom = addEventListener(
        this.containDom,
        "scroll",
        this.closeOverlay
      );
      /** 页面缩放 */
      this.listeners.body = addEventListener(
        document.body,
        "mousewheel",
        this.onMousewheel
      );
    },
    /**
     * 移除事件监听
     */
    removeListen() {
      for (const key in this.listeners) {
        const listener = this.listeners[key];
        listener && listener.remove();
      }
    },
    /**
     * 鼠标右键
     */
    onContextmenu(e) {
      e.preventDefault();
      this.closeOverlay();
      this.openOverlay();
      const next = () => {
        this.calculateLoc(e);
      };
      this.$nextTick(next);
    },
    /**
     * 打开菜单
     */
    openOverlay() {
      this.overlayVisible = true;
    },
    /**
     * 关闭菜单
     */
    closeOverlay() {
      this.overlayVisible = false;
      this.overlayStyle = {
        position: "absolute",
        left: "",
        top: "",
        "z-index": this.zIndex,
        opacity: "0",
        height: "0",
        width: "0",
      };
    },
    /**
     * 计算菜单位置
     */
    calculateLoc(e) {
      const overlayDOM = this.$refs.overlay;
      const { clientWidth, clientHeight } = overlayDOM;
      const { clientX, clientY, pageX, pageY } = e;
      const { clientHeight: visibleHeight, clientWidth: visibleWidth } =
        document.documentElement;
      const top = this.getLoc(pageY, clientY, clientHeight, visibleHeight);
      const left = this.getLoc(pageX, clientX, clientWidth, visibleWidth);

      this.overlayStyle.left = left + "px";
      this.overlayStyle.top = top + "px";
      this.overlayStyle.height = "auto";
      this.overlayStyle.width = "auto";
      this.overlayStyle.visibility = "visible";
      this.overlayStyle.opacity = "1";
    },

    /**
     * 优化菜单位置
     * @param {Number} pageLoc pageX/Y
     * @param {Number} mouseLoc 鼠标位置
     * @param {Number} len 菜单宽度
     * @param {Number} visibleLen 可视区宽度
     */
    getLoc(pageLoc, mouseLoc, len, visibleLen) {
      const diff = mouseLoc + len - visibleLen;
      let loc;
      if (diff <= this.maxError) {
        loc = pageLoc;
      } else {
        switch (this.fixLocMode) {
          case FIX_LOC_MODE.REVERSE:
            loc = this.fixReversedLoc(pageLoc - len, mouseLoc - len);
            break;
          case FIX_LOC_MODE.AUTO:
            loc = pageLoc - Math.abs(diff) - this.edge;
            break;
          default:
            loc = pageLoc;
            break;
        }
      }

      return loc;
    },
    /**
     * 优化翻转后的菜单位置（防溢出）
     * @param {Number} pageLoc pageX/Y
     * @param {Number} mouseLoc 鼠标位置
     */
    fixReversedLoc(pageLoc, mouseLoc) {
      const diff = Math.abs(mouseLoc);
      if (mouseLoc < 0 && diff >= this.maxError) {
        pageLoc = pageLoc + diff + this.edge;
      }
      return pageLoc;
    },

    /**
     * 文档点击事件
     */
    onDocumentClick(e) {
      // 点击事件在菜单外
      if (!contain(this.$refs.overlay, e.target)) {
        this.closeOverlay();
      }
    },
    /**
     * 页面缩放事件
     */
    onMousewheel(e) {
      if (e.ctrlKey) {
        this.closeOverlay();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./drop-down.less";
</style>
