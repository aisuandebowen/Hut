(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{450:function(n,a,t){"use strict";t.r(a);var e=t(2),i=Object(e.a)({},(function(){var n=this,a=n._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("p",[n._v("export default class TabCommunication {\n/**")]),n._v(" "),a("ul",[a("li",[n._v("构造函数")]),n._v(" "),a("li",[n._v("@param {Object} options")]),n._v(" "),a("li",[n._v("@param {Function} options.handleMsgFn 处理消息的方法")]),n._v(" "),a("li",[n._v("@param {String} options.name 页签名\n*/\nconstructor({ handleMsgFn, name }) {\nthis.handleMsgFn = handleMsgFn;\nthis.name = name;\nthis.init();\n}")])]),n._v(" "),a("p",[n._v("/**")]),n._v(" "),a("ul",[a("li",[n._v('初始化\n*/\ninit() {\nwindow.addEventListener("storage", (data) => {\nconst value = data.newValue;\nif (value && this.handleMsgFn) {\n// 发送数据\nthis.handleMsgFn.call(this, {\nkey: this.name,\nvalue: JSON.parse(value),\n});\n}\n});\n}')])]),n._v(" "),a("p",[n._v("/**")]),n._v(" "),a("ul",[a("li",[n._v("发消息")]),n._v(" "),a("li",[n._v("@param {Object} option - data")]),n._v(" "),a("li",[n._v("@param {String} option.key - key")]),n._v(" "),a("li",[n._v("@param {*} option.value -value\n*/\nstatic sendMes({ key, value }) {\nif (key) {\nwindow.localStorage.setItem(key, JSON.stringify(value));\nwindow.localStorage.removeItem(key);\n}\n}\n}")])])])}),[],!1,null,null,null);a.default=i.exports}}]);