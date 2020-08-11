<template>
  <q-page>
    <q-toolbar class="text-white shadow-2 bg-primary text-subtitle1 justify-center">
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
  </q-page>
</template>

<script>
import vueQr from 'vue-qr'
import {
  mapGetters
} from 'vuex'
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
    // dev to prod
    // const url = 'http://haitun158.natapp1.cc/signup'
    const url = 'http://www.haitun158.com/fenxiao/signup'
    this.qrText = url + '?shopId=' + this.shopId + '&userId=' + this.userId + '&phone=' + this.loginName
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
      } else if (this.qrcodeType === 'zhuoyue') {
        this.qrcodeType = 'sign'
        this.title = this.name + '招生二维码'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
