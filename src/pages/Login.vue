<template>
  <div
    class="q-pa-md column justify-center"
    style="height: 80vh;"
  >
    <q-form
      @submit="submit"
      class="q-gutter-md column justify-center"
      ref="form"
    >

      <div class="text-h5 text-center">卓越登录</div>
      <q-input
        bottom-slots
        v-model="form.username"
        label="用户名"
        @blur="getShops"
        :rules="[val => !!val || '用户名不能为空']"
      >
        <template v-slot:prepend>
          <q-icon name="account_circle" />
        </template>
      </q-input>
      <q-input
        bottom-slots
        v-model="form.password"
        label="密码"
        :type="isPwd ? 'password' : 'text'"
        :rules="[val => !!val || '密码不能为空']"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-select
        v-model="form.shopId"
        :options="shopOptions"
        option-value="id"
        option-label="shopname"
        map-options
        emit-value
        label="门店"
        :rules="[val => !!val || '请选择门店']"
      >
        <template v-slot:prepend>
          <q-icon name="store" />
        </template>
      </q-select>
      <div>
      </div>
      <q-btn
        label="登录"
        type="submit"
        color="primary"
        :loading="submiting"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import {
  getShops
} from 'src/api/shop.js'

import {
  getQueryParam,
  parseQuery
} from 'src/utils/util.js'

export default {
  name: 'Login',
  computed: {
    ...mapGetters([
      'openId'
    ])
  },
  data () {
    return {
      form: {
        // username: '15211142974',
        // password: 'zhuoyue123',
        // shopId: '8e5d6871ec224bc792ce65b8f7a29213'
        username: '',
        password: '',
        shopId: ''
      },
      submiting: false,
      // 根据loginName获取门店列表
      shopList: [],
      shopOptions: [],
      // 跳转页面路由
      routerPath: 'SignUpList',
      query: {},
      // 密码可见性
      isPwd: true
    }
  },
  created () {
    const code = getQueryParam('code')
    this.routerPath = getQueryParam('routerPath') || this.routerPath
    // parseQuery 把字符串转换为对象格式，其实用json传输更好
    this.query = parseQuery(getQueryParam('query')) || this.query
    console.log(this.routerPath)
    console.log(this.query)
    if (code) {
      this.wxLogin(code)
    }
    if (this.$route.params.reload) location.reload()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'SignUpList') {
      to.meta.isUseCache = false
    }
    this.$store.commit('hideLoginDialog')
    next()
  },
  methods: {
    submit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.submiting = true
          this.$store
            .dispatch('Login', this.form)
            .then(() => {
              this.submiting = false
              this.msgSuccess('登录成功')
              this.$router.replace({
                name: this.routerPath,
                params: { reload: true }
              })
            })
            .catch((error) => {
              console.log(error)
              this.msgError('登录失败，用户名或密码错误')
              this.submiting = false
            })
        } else {
          this.msgWarn('请正确填写所有字段')
        }
      })
    },
    wxLogin (code) {
      this.submiting = true
      this.$store.dispatch('WxLogin', code).then(() => {
        this.submiting = false
        this.msgSuccess('微信授权登录成功')
        this.$router.replace({
          name: this.routerPath,
          query: this.query
        })
      }).catch((error) => {
        console.log(error)
        this.msgError('微信授权登录失败，请使用账号密码登录')
        this.submiting = false
      })
    },
    getShops () {
      getShops(this.form.username).then(res => {
        if (res && res.length > 0) {
          this.shopList = res
          this.shopOptions = res
        }
      })
    },
    // <!-- use-input
    //     @filter="filterFn" -->
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.shopOptions = this.shopList
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.shopOptions = this.shopList.filter(v => v.shopname.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
