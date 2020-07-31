<template>
  <q-page>
    <div
      class="q-pa-md"
      style="height: 400px; width: 100vw"
      id="mapBox"
    ></div>
  </q-page>
</template>

<script>

const echarts = require('echarts/lib/echarts')
require('src/assets/china')

import { getMapData } from 'src/api/statistic'

export default {
  name: 'PageIndex',
  data () {
    const sqlData = ['北京市', '天津市', '上海市', '重庆市', '河北省', '河南省',
      '云南省', '辽宁省', '黑龙江省', '湖南省', '安徽省', '山东省', '新疆', '江苏省',
      '浙江省', '江西省', '湖北省', '广西', '甘肃省', '山西省', '内蒙古',
      '陕西省', '吉林省', '福建省', '贵州省', '广东省', '青海省', '西藏', '四川省',
      '宁夏', '海南省', '台湾省', '香港', '澳门'
    ]
    const mapData = ['北京', '天津', '上海', '重庆', '河北', '河南',
      '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏',
      '浙江', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古',
      '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川',
      '宁夏', '海南', '台湾', '香港', '澳门'
    ]
    return {
      sqlData: sqlData,
      mapData: mapData,
      chart: {}
    }
  },
  mounted () {
    const myChart = this.initMap()
    getMapData().then(res => {
      const data = res.data
      const myData = []
      let maxNumber = -1
      data.forEach(item => {
        if (item.number > maxNumber) { maxNumber = item.number }
        myData.push({
          name: this.nameMap(item.province),
          value: item.number
        })
      })
      myChart.hideLoading()
      myChart.setOption({
        series: [{
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: false // 省份名称,显示的话太挤了
            },
            emphasis: {
              show: false
            }
          },
          data: myData // 数据
        }],
        visualMap: {
          min: 0,
          max: maxNumber + 300,
          x: 'left',
          y: 'center',
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        }
      })
    })
  },
  methods: {
    initMap () {
      // 初始化echarts实例
      var myChart = echarts.init(document.getElementById('mapBox'))
      myChart.showLoading()

      var optionMap = {
        backgroundColor: '#FFFFFF',
        title: {
          // text: this.getYear() + '年报名学生生源地各省分布',
          subtext: '截止时间 ' + this.getTime(),
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        }
      }

      // 使用制定的配置项和数据显示图表
      myChart.setOption(optionMap)
      return myChart
    },
    // sql存储的省市名称到map josn数据的转化
    nameMap (sqlName) {
      for (const i in this.sqlData) {
        if (this.sqlData[i] === sqlName) {
          return this.mapData[i]
        }
      }
      return sqlName
    },
    getTime () {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()
      const hour = today.getHours()
      const min = today.getMinutes()
      const sec = today.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
    },
    getYear () {
      return new Date().getFullYear()
    }
  }

}
</script>
