import WS from './ws';
const HeartTime = 3 * 1000;

class WsHeart {
  constructor(time, callback) {
    this.heart = null;
    this.init(time, callback);
  }

  init(time, callback) {
    this.createHeart(time, callback);
  }

  createHeart(time, callback) {
    this.clearHeart();
    this.heart = setInterval(() => {
      callback();
    }, time);
  }

  clearHeart() {
    clearInterval(this.heart);
    this.heart = null;
  }
}

export default class HYTWebSocket extends WS {
  constructor(...args) {
    super(...args);
    this.heart = null;
    this.wsInit();
  }

  wsInit() {
    this.startHeart();
  }

  startHeart() {
    if (this.heart) {
      this.clearHeart();
    }
    this.heart = new WsHeart(HeartTime, () => {
      const closeSendStatus = [2, 3];
      if (closeSendStatus.includes(this.ws.readyState)) {
        // ws即将关闭，停止发送心跳
        this.clearHeart();
      } else {
        this.send('ping');
      }
    });
  }

  clearHeart() {
    this.heart.clearHeart();
    this.heart = null;
  }
}
