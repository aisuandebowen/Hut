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
