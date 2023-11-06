import isFunction from "@/common/type-utils/isFunction";

/**
 * 事件监听
 * @param {Object} dom
 * @param {String} type
 * @param {Function} listener
 * @param {Object} options
 * @param {Boolean} useCapture
 * @returns
 */
export function addEventListener(
  dom,
  type,
  listener,
  options = false,
  useCapture = false
) {
  if (!isFunction(listener)) {
    throw new Error(`${listener} is not Function`);
  }

  dom.addEventListener(type, listener, options, useCapture);
  return {
    remove() {
      dom.removeEventListener(type, listener, options, useCapture);
    },
  };
}
