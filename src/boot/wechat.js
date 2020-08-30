import Vue from 'vue'

// 判断是否是微信浏览器的函数
Vue.prototype.isWechat = function () {
  const ua = window.navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
}
