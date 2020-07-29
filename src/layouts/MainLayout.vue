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
        align="center"
        dense
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
  }
}
</script>
