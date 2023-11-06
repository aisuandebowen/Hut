/**
 * 目标节点是否在父节点
 * @param {DOM} root 父节点
 * @param {DOM} target 目标节点
 * @returns
 */
export default function contains(root, target) {
  let el = target;
  while (el) {
    if (el === root) {
      return true;
    }
    el = el.parentNode;
  }
  return false;
}
