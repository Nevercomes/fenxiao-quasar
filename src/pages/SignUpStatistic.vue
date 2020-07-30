<template>
  <q-page>
    <!-- <q-toolbar class="text-white bg-primary text-subtitle1 shadow-2 justify-center">
      卓越全国最新实时报名情况
    </q-toolbar> -->
    <q-header reveal>
      <q-tabs
        v-model="tab"
        class="bg-primary text-white"
      >
        <q-tab
          name="statistic"
          label="数据统计"
          narrow-indicator
          @click="scrollToElement('#statistic')"
        />
        <q-tab
          name="map"
          label="招生地图"
          narrow-indicator
          @click="scrollToElement('#map')"
        />
        <q-tab
          name="school"
          label="校区招生数据"
          narrow-indicator
          @click="scrollToElement('#school')"
        />
        <q-tab
          name="province"
          label="生源地数据"
          narrow-indicator
          @click="scrollToElement('#province')"
        />
        <q-tab
          name="pro"
          label="专业分布"
          narrow-indicator
          @click="scrollToElement('#pro')"
        />
      </q-tabs>
    </q-header>

    <div class="q-pa-md">
      <div
        id="statistic"
        class="text-grey q-mb-md"
      >截止北京时间 {{time}} </div>
      <q-card>
        <q-card-section class="">
          <!-- 当日 -->
          <div class="row justify-around items-center">
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.normalNumber, yesterdaySum.normalNumber) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.normalNumber, yesterdaySum.normalNumber)}}
                </span>
              </div>
              <div class="text-h4 color-1">{{todaySum.normalNumber}}</div>
              <div>平时班人次</div>
            </div>
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.vocationNumber, yesterdaySum.vocationNumber) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.vocationNumber, yesterdaySum.vocationNumber)}}
                </span>
              </div>
              <div class="text-h4 color-2">{{todaySum.vocationNumber}}</div>
              <div>假期班人次</div>
            </div>
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.softwareNumber, yesterdaySum.softwareNumber) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.softwareNumber, yesterdaySum.softwareNumber)}}
                </span>
              </div>
              <div class="text-h4 color-3">{{todaySum.softwareNumber}}</div>
              <div>软件班人次</div>
            </div>
          </div>

          <!-- 全年 -->
          <div class="row justify-around items-center q-mt-md">
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.normalNumber, 0) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.normalNumber, 0)}}
                </span>
              </div>
              <div class="text-h4 color-4">{{yearSum.normalNumber}}</div>
              <div>全年平时班</div>
            </div>
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.vocationNumber, 0) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.vocationNumber, 0)}}
                </span>
              </div>
              <div class="text-h4 color-5">{{yearSum.vocationNumber}}</div>
              <div>全年假期班</div>
            </div>
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.softwareNumber, 0) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.softwareNumber, 0)}}
                </span>
              </div>
              <div class="text-h4 color-6">{{yearSum.softwareNumber}}</div>
              <div>全年软件班</div>
            </div>
          </div>

          <!-- 全部数据 -->
          <div class="row justify-around items-center q-mt-md">
            <div class="column justify-around items-center">
              <div class="text-caption text-grey-7">较昨日
                <span :class="[calDiff(todaySum.normalNumber + todaySum.vocationNumber, 0) === '无变化' ? '' : 'color-1']">
                  {{calDiff(todaySum.normalNumber + todaySum.vocationNumber, 0)}}
                </span>
              </div>
              <div class="text-h4 color-4">{{yearSum.normalNumber + yearSum.vocationNumber}}</div>
              <div>全年招生总人次</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <nl-block-title
      id="map"
      :title="'全国校区招生地图'"
    />

    <nl-block-title
      id="school"
      :title="'各校区招生数据'"
    />
    <q-markup-table class="q-mx-sm q-mb-lg">
      <thead>
        <tr>
          <td>校区</td>
          <td>累计人次</td>
          <td>排序</td>
          <td>平时班</td>
          <td>排序</td>
          <td>假期班</td>
          <td>排序</td>
          <td>软件班</td>
          <td>排序</td>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(item, index) in schoolData"
          :key="index"
        >
          <td class="text-left">{{item.schoolName}}</td>
          <td>{{item.totalNumber}}</td>
          <td>{{item.totalOrder}}</td>
          <td>{{item.normalNumber}}</td>
          <td>{{item.normalOrder}}</td>
          <td>{{item.vocationNumber}}</td>
          <td>{{item.vocationOrder}}</td>
          <td>{{item.softwareNumber}}</td>
          <td>{{item.softwareOrder}}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <nl-block-title
      id="province"
      :title="'学员学校数据来源'"
    />
    <q-markup-table class="q-mx-sm q-mb-lg">
      <thead>
        <tr>
          <td>地区</td>
          <td>累计人次</td>
          <td>排序</td>
          <td>平时班</td>
          <td>排序</td>
          <td>假期班</td>
          <td>排序</td>
          <td>软件班</td>
          <td>排序</td>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(item, index) in provinceData"
          :key="index"
        >
          <td class="text-left">{{item.provinceName}}</td>
          <td>{{item.totalNumber}}</td>
          <td>{{item.totalOrder}}</td>
          <td>{{item.normalNumber}}</td>
          <td>{{item.normalOrder}}</td>
          <td>{{item.vocationNumber}}</td>
          <td>{{item.vocationOrder}}</td>
          <td>{{item.softwareNumber}}</td>
          <td>{{item.softwareOrder}}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <nl-block-title
      id="pro"
      :title="'假期各校区快题班专业'"
    />
    <q-markup-table class="q-mx-sm q-mb-lg">
      <thead>
        <tr>
          <td>校区</td>
          <td>总人数</td>
          <td
            v-for="(item,index) in proList"
            :key="index"
          >
            {{item.name}}
          </td>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(item, index) in ktProData"
          :key="index"
        >
          <td class="text-left">{{item.schoolName}}</td>
          <td>{{item.totalNumber}}</td>
          <td
            v-for="(zy, idx) in proList"
            :key="idx"
          >
            {{item[zy.name] || 0}}
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <nl-block-title :title="'假期各校区软件班专业'" />
    <q-markup-table class="q-mx-sm q-mb-lg">
      <thead>
        <tr>
          <td>校区</td>
          <td>总人数</td>
          <td
            v-for="(item,index) in proList"
            :key="index"
          >
            {{item.name}}
          </td>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(item, index) in softwareProData"
          :key="index"
        >
          <td class="text-left">{{item.schoolName}}</td>
          <td>{{item.totalNumber}}</td>
          <td
            v-for="(zy, idx) in proList"
            :key="idx"
          >
            {{item[zy.name] || 0}}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>

import NlBlockTitle from 'src/components/NlBlockTitle'

import { scroll, date } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

import {
  getYesterdaySignNum,
  getTodaySignNum,
  getYearSignSum,
  getMapData,
  getSchoolData,
  getProvinceData,
  getKtProData,
  getSoftwareProData
} from 'src/api/statistic.js'
import {
  getPros
} from 'src/api/signup.js'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'SignUpStatistic',
  components: {
    NlBlockTitle
  },
  computed: {
    ...mapGetters([
      'role',
      'shopId'
    ]),
    title: function () {
      return '卓越全国最新实时招生情况'
    }
  },
  data () {
    return {
      // tab的激活项
      tab: 'map',

      // 实体数据
      yesterdaySum: [],
      todaySum: [],
      yearSum: [],
      mapData: [],
      schoolData: [],
      provinceData: [],
      ktProData: [],
      softwareProData: [],

      // 专业数据
      proList: [],

      // 查询参数
      queryParams: {},

      // 当前时间
      time: ''
    }
  },
  created () {
    const timeStamp = Date.now()
    this.time = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')

    getYesterdaySignNum().then(res => {
      this.yesterdaySum = res.data
    })
    getTodaySignNum().then(res => {
      this.todaySum = res.data
    })
    getYearSignSum().then(res => {
      this.yearSum = res.data
    })
    getMapData().then(res => {
      this.mapData = res.data
    })
    getSchoolData().then(res => {
      this.schoolData = res.data
    })
    getProvinceData().then(res => {
      this.provinceData = res.data
    })
    getKtProData().then(res => {
      this.ktProData = res.data
    })
    getSoftwareProData().then(res => {
      this.softwareProData = res.data
    })

    getPros(this.shopId).then(res => {
      this.proList = res.data
    })
  },
  methods: {
    calDiff (a, b) {
      try {
        const diff = a - b
        if (diff === 0) return '无变化'
        else if (diff > 0) return '+' + diff
        return diff
      } catch (e) {
        return '无变化'
      }
    },
    goAnchor (selector) {
      const anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop // chrome
      document.documentElement.scrollTop = anchor.offsetTop // firefox
    },
    scrollToElement (selector) {
      const el = this.$el.querySelector(selector)
      const target = getScrollTarget(el)
      const offset = el.offsetTop - el.scrollHeight
      const duration = 1000
      setScrollPosition(target, offset, duration)
    }
  }
}
</script>

<style lang='scss' scoped>
$color1: rgb(247, 76, 47);
$color2: rgb(246, 131, 2);
$color3: rgb(162, 89, 76);
$color4: rgb(173, 36, 43);
$color5: rgb(94, 110, 147);
$color6: rgb(39, 183, 162);

.color-1 {
  color: $color1;
}

.color-2 {
  color: $color2;
}

.color-3 {
  color: $color3;
}

.color-4 {
  color: $color4;
}

.color-5 {
  color: $color5;
}

.color-6 {
  color: $color6;
}
</style>
