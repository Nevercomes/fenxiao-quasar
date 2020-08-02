import axios from 'axios'
import store from 'src/store/index'
import router from 'src/router/index.js'
import { Dialog, Notify } from 'quasar'
import {
  getToken
} from 'src/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // dev to prod
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://www.haitun158.com/HTMU/',
  // baseURL: 'http://localhost/HTMU/',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.cookie = 'jeesite.session.id=' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // const code = res.data.code
    const statusCode = res.statusCode + ''
    const codeHead = statusCode.substring(0, 1)
    console.log(res)
    if (codeHead === '4' || codeHead === '5') {
      return Promise.reject(res)
    } else {
      if (res.data === undefined) {
        return Promise.reject(res)
      } else {
        try {
          res.data = JSON.parse(res.data)
        } catch (e) {
          // console.log("not json data")
        }
      }
      // 后台多端杂糅要处理鉴权失败返回Json数据一直运行错误...
      let needLogin = false
      if (typeof (res.data) === 'string' && (res.data.indexOf('家校通') !== -1 && res.data.indexOf(
        'placeholder="请填写登录账号"') !== -1)) { needLogin = true }
      if (needLogin) {
        // loginDialg简单的单例显示 锁？锁个屁
        if (!store.state.appStatus.loginDialog) {
          store.commit('showLoginDialog')
          Dialog.create({
            title: '登录异常',
            message: '身份验证已过期，请重新登录',
            persistent: true
          }).onOk(() => {
            router.replace({
              name: 'Login',
              params: { reload: true }
            })
            // 在离开login页面的时候设置hide
            // store.commit('hideLoginDialog')
          }).onDismiss(() => {
            // store.commit('hideLoginDialog')
          })
        }
        return Promise.reject(res)
      } else if (res.statusCode === 403 || res.data.code === 70001) {
        Notify.create({
          message: '接口权限不足',
          color: 'negative'
        })
        return Promise.reject(res)
      } else if (res.data.code !== 1 && res.data.message) {
        Notify.create({
          message: res.data.message,
          color: 'negative'
        })
        return Promise.reject(res)
      } else {
        return res.data
      }
    }
  },
  (error) => {
    Notify.create({
      message: '好像哪里出错了'
    })
    return Promise.reject(error)
  }
)

export default service
