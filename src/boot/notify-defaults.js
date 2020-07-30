import Vue from 'vue'
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom',
  timeout: 2000,
  textColor: 'white'
})

// 在vue中可以用this. 进行调用三种常用的notify
Vue.prototype.msgInfo = function (message) {
  Notify.create({
    message: message
  })
}

Vue.prototype.msgSuccess = function (message) {
  Notify.create({
    message: message,
    color: 'positive'
  })
}

Vue.prototype.msgWarn = function (message) {
  Notify.create({
    message: message,
    color: 'warning'
  })
}

Vue.prototype.msgError = function (message) {
  Notify.create({
    message: message,
    color: 'negative'
  })
}
