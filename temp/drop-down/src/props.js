export const FIX_LOC_MODE = {
  REVERSE: "reverse", // 翻转
  AUTO: "auto", // 自动修补
};

export default {
  /** 优化溢出 */
  optimizeOverflow: {
    type: Boolean,
    default: false,
  },
  /** 菜单内容 */
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  /** 触发方式 */
  trigger: {
    type: Array,
    default() {
      return [];
    },
  },
  /** 菜单层级 */
  zIndex: {
    type: Number,
    default: 1000,
  },
  /** 外部包裹DOM */
  containDom: {
    default() {
      return window.document;
    },
  },
  /** 自动修复溢出位置 */
  fixLocMode: {
    default: FIX_LOC_MODE.REVERSE,
  },
  /** 距离边界值 */
  edge: {
    type: Number,
    default: 10,
  },
  /** 修复溢出位置最大误差值 */
  maxError: {
    type: Number,
    default: 5,
  },
  /** 取消鼠标显隐监听事件列表 */
  offListenEvents: {
    type: Array,
    default() {
      return [];
    },
  },
};
