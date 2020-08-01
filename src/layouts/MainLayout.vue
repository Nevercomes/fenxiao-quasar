<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      reveal
      elevated
      class="bg-white text-black"
    >
      <q-tabs
        narrow-indicator
        align="justify"
        dense
        id="tabbar"
      >
        <q-route-tab
          icon="group"
          label="学生"
          to="/signup/list"
          exact
        />
        <q-route-tab
          icon="qr_code"
          label="二维码"
          to="/signup/qrcode"
          exact
        />
        <q-route-tab
          v-if="role === 'manager'"
          icon="table_chart"
          label="统计"
          to="/signup/statistic"
          exact
        />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>

import { mapGetters } from 'vuex'
import { hasClass, removeClass, addClass } from 'src/utils/util'

export default {
  name: 'MainLayout',
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  data () {
    return {
    }
  },
  mounted () {
    // 解决直接通过url地址进入页面的tabbar样式异常问题
    const tabs = document.getElementById('tabbar')
    const tabbar = tabs.firstElementChild // quasar组件转化为dom后，真实包裹tab的div
    console.log(tabbar)
    if (hasClass(tabbar, 'q-tabs__content--align-left')) {

    }
    removeClass(tabbar, 'q-tabs__content--align-left')
    addClass(tabbar, 'q-tabs__content--align-justify')
  }
}
</script>
