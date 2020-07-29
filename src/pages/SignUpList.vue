<template>
  <q-page>
    <q-toolbar class="text-white shadow-2 bg-primary text-subtitle1 justify-center">
      报名学生列表
    </q-toolbar>
    <!-- 选择组 -->
    <div class="flex">
      <q-btn-dropdown
        class="col text-black ellipsis q-py-sm"
        color="white"
        flat
        :label="queryParams.shopName"
      >
        <q-list>
          <q-item
            v-for="(item,index) in shopOptions"
            :key="index"
            clickable
            v-close-popup
            @click="onShopItemClick(item)"
          >
            <q-item-section>
              <q-item-label class="ellipsis">{{item.text}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown
        class="col text-black ellipsis q-py-sm"
        color="white"
        flat
        :label="queryParams.year"
      >
        <q-list>
          <q-item
            v-for="(item,index) in yearOptions"
            :key="index"
            clickable
            v-close-popup
            @click="onYearItemClick(item)"
          >
            <q-item-section>
              <q-item-label class="ellipsis">{{item.text}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <q-pull-to-refresh
      @refresh="refresh"
      ref="refresh"
    >
      <q-list
        v-for="(group, idx) in timeList"
        :key="idx"
      >
        <q-item class="bg-grey-3">
          <q-item-section>
            {{group[0].enrollDate}}
          </q-item-section>
        </q-item>
        <q-item
          v-for="(item, idx2) in group"
          :key="idx2"
          clickable
          v-ripple
          @click="onClick(item.id)"
        >
          <q-item-section>{{item.name}}</q-item-section>
        </q-item>
      </q-list>
    </q-pull-to-refresh>

    <!-- 会增加操作的迟滞感 -->
    <!-- <q-inner-loading :showing="loading">
      <q-spinner-dots
        size="50px"
        color="primary"
      />
    </q-inner-loading> -->

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="keyboard_arrow_up"
        color="primary"
      />
    </q-page-scroller>
    <nl-empty
      :show="empty"
      :text="'没有招生数据，快去招生吧~'"
    ></nl-empty>

  </q-page>
</template>

<script>

import {
  formatGroupTime
} from 'src/utils/util.js'
import {
  listSignup
} from 'src/api/signup.js'
import {
  getShops
} from 'src/api/shop.js'
import {
  mapGetters
} from 'vuex'
import NlEmpty from 'src/components/NlEmpty'

export default {
  name: 'SignUpList',
  components: {
    NlEmpty
  },
  computed: {
    ...mapGetters([
      'role',
      'loginName',
      'shopId'
    ]),
    title: function () {
      const arr = []
      arr.push('报名学生列表')
      if (this.queryParams.year) arr.push(this.queryParams.year + '年')
      if (this.shopName) arr.push(this.shopName)
      return arr.join('-')
    }
  },
  data () {
    return {
      // 加载状态
      loading: false,
      // 是否为空
      empty: false,
      // 原始数据
      dataList: [],
      // 按照时间分组之后的数据
      timeList: [],
      // index排序辅助对象
      object: {},
      // 查询参数
      queryParams: {
        name: '',
        pageNo: -1,
        year: undefined,
        shopId: undefined,
        shopName: undefined
      },
      // 检索的下拉菜单
      shopList: [],
      shopOptions: [],
      yearOptions: []
    }
  },
  created () {
    // 初始化年份列表
    this.getYearOptions()
    this.getShopOptions()
    this.getList()
  },
  methods: {
    getList (done) {
      this.loading = true
      listSignup(this.queryParams).then(res => {
        this.dataList = res.data
        this.timeList = []
        this.empty = !this.dataList || this.dataList.length === 0
        this.dataList.forEach(element => {
          element.enrollDate = formatGroupTime(element.enrollDate)
        })
        this.timeList = this.groupBy(this.dataList, function (item) {
          return [item.enrollDate]
        })
        this.loading = false
        if (done) done()
      }).catch(() => {
        this.loading = false
        if (done) done()
      })
    },
    refresh (done) {
      this.queryParams.pageNo = -1
      this.getList(done)
    },
    onShopItemClick (item) {
      this.queryParams.shopName = item.text
      this.queryParams.shopId = item.value
      this.getList()
    },
    onYearItemClick (item) {
      this.queryParams.year = item.value
      this.getList()
    },
    onClick (id) {
      // 跳转到详情页面
      this.$router.push({
        name: 'SignUpInfo',
        query: {
          id: id
        }
      })
    },
    getYearOptions () {
      const now = new Date()
      const year = now.getFullYear()
      this.queryParams.year = year
      this.yearOptions = []
      for (let i = 0; i < 5; i++) {
        this.yearOptions.push({
          text: year - i,
          value: year - i
        })
      }
    },
    getShopOptions () {
      this.queryParams.shopId = this.shopId
      this.shopOptions = []
      this.shopOptions.push({
        text: '全部',
        value: ''
      })
      getShops(this.loginName).then(res => {
        this.shopList = res
        if (res) {
          res.forEach(item => {
            if (this.shopId === item.id) { this.queryParams.shopName = item.shopname }
            this.shopOptions.push({
              text: item.shopname,
              value: item.id
            })
          })
        }
      })
    },
    groupBy (array, f) {
      var groups = {}
      array.forEach(function (o) {
        var group = JSON.stringify(f(o))
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      return Object.keys(groups).map(function (group) {
        return groups[group]
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
