const Event = {
  OPEN: 'open',
  MESSAGE: 'message',
  CLOSE: 'close',
  ERROR: 'error',
};

function isFunction(target) {
  return typeof target === 'function' && typeof target.nodeType !== 'number';
}

function isString(target) {
  return typeof target === 'string';
}

export default class WS {
  /**
   *
   * @param {String} url ws链接
   * @param {Object} options 选项
   * @param {Function} options.open
   * @param {Function} options.message
   * @param {Function} options.beforeClose 关闭连接前
   * @param {Function} options.close
   * @param {Function} options.closed 关闭连接后
   * @param {Function} options.error
   * @param {Function} options.beforeSend 发送数据前
   * @param {Function} options.send
   * @param {Function} options.sended 发送数据后
   */
  constructor(url, options) {
    this.ws = null;
    this.options = options;
    this.init(url, options);
  }

  close() {
    this.options?.beforeClose?.();
    this.ws.close();
    this.options?.closed?.();
  }

  send(data) {
    const strData = isString(data) ? data : JSON.stringify(data);
    if (isFunction(this.options?.beforeSend)) {
      if (this.options.beforeSend(strData)) {
        this.ws.send(strData);
        this.options?.sended?.(strData);
      }
    } else {
      this.ws.send(strData);
      this.options?.sended?.(strData);
    }
  }

  init(url, options) {
    this.ws = new WebSocket(url);
    this.listEvent(options);
  }

  listEvent(options) {
    const events = Object.values(Event);
    for (const eventName of events) {
      this.ws.addEventListener(eventName, (e) => {
        options?.[eventName]?.(e); // 执行回调
      });
    }
  }
}
