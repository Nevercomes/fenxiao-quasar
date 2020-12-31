<template>
  <q-page>
    <q-toolbar
      v-if="!isWechat()"
      class="text-white shadow-2 bg-primary text-subtitle1 justify-center"
    >
      {{title}}
    </q-toolbar>
    <div
      class="column q-gutter-lg items-center justify-center"
      style="height: calc(100vh - 120px);"
    >
      <vue-qr
        v-if="qrcodeType == 'sign'"
        class="sigup__qrcode"
        :text="qrText"
        :size="300"
      />
      <q-img
        v-if="qrcodeType == 'zhuoyue'"
        :src="zhuoyueUrl"
        width="300px"
        height="300px"
      />
      <q-btn
        color="primary"
        @click="changeQrCode"
      >切换二维码</q-btn>
    </div>
    <q-fab
      color="primary"
      icon="keyboard_arrow_up"
      direction="up"
      style="position: absolute; bottom: 30px; right: 30px"
    >
      <q-fab-action
        color="secondary"
        @click="onSignOutClick"
        icon="logout"
      />
    </q-fab>
  </q-page>
</template>

<script>
import vueQr from 'vue-qr'
import {
  mapGetters
} from 'vuex'

import { getQrCodeUrl } from 'src/api/signup.js'

export default {
  name: 'signupQrcode',
  components: {
    vueQr
  },
  computed: {
    ...mapGetters([
      'userId',
      'shopId',
      'loginName',
      'role',
      'name'
    ])
  },
  created () {
    if (this.isWechat()) document.title = '招生二维码'
    getQrCodeUrl({
      shopId: this.shopId,
      userId: this.userId
    }).then(res => {
      this.qrText = res.data
    })
    // const host = process.env.NODE_ENV === 'production' ? 'http://www.haitun158.com/fenxiao' : 'http://rowingtest.nevercome.net'
    // const uri = '/f/signup/snsapi/student'
    // this.qrText = host + uri + '?shopId=' + this.shopId + '&userId=' + this.userId + '&phone=' + this.loginName
  },
  data () {
    return {
      zhuoyueUrl: require('../assets/zhuoyue-qrcode.jpg'),
      qrText: '',
      qrcodeType: 'sign',
      title: this.name ? this.name + '招生二维码' : '招生二维码'
    }
  },
  methods: {
    changeQrCode () {
      if (this.qrcodeType === 'sign') {
        this.qrcodeType = 'zhuoyue'
        this.title = '卓越手绘设计家公众号'
        if (this.isWechat()) document.title = '卓越手绘设计家公众号'
      } else if (this.qrcodeType === 'zhuoyue') {
        this.qrcodeType = 'sign'
        this.title = this.name + '招生二维码'
        if (this.isWechat()) document.title = '招生二维码'
      }
    },
    onSignOutClick () {
      this.$q.dialog({
        title: '退出登录',
        message: '退出登录将回到登录界面',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        this.$store.dispatch('Logout').then(res => {
          this.$router.replace({
            name: 'Login'
          })
        }).catch(() => {
          this.msgError('退出登录失败')
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
