<!-- 学生报名信息页面 -->
 <template>
  <div
    class="app-container"
    ref="AppContainer"
  >
    <!-- <q-img
      :src="signupBg"
      class="signup__from-screen-bg-img"
      ref="BackImage"
    /> -->

    <div class="row justify-center">
      <div
        class="column justify-between q-pa-md"
        style="margin-top: 70px; "
        ref="FormBox"
      >
        <!-- 姓名 -->
        <div
          class="signup__form-item"
          :class="[invalid.name ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="user-circle-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            v-model="form.name"
            type="text"
            placeholder="姓名"
            @blur="validInput($event, form.name)"
          />
        </div>

        <!-- 学习校区 -->
        <div
          class="signup__form-item"
          :class="[invalid.learningShopId ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="location-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            :value="formDisplay.shop"
            type="text"
            readonly="readonly"
            placeholder="学习校区"
            @click="shopPicker = true"
          />
          <div class="signup__form-select-icon">
            <van-icon
              name="arrow"
              color="white"
              size="20px"
            />
          </div>
        </div>

        <!-- 报名班种 -->
        <div
          class="signup__form-item"
          :class="[invalid.classtype ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="apps-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            :value="formDisplay.classType"
            type="text"
            readonly="readonly"
            placeholder="报名班种"
            @click="classTypePicker = true"
          />
          <div class="signup__form-select-icon">
            <van-icon
              name="arrow"
              color="white"
              size="20px"
            />
          </div>
        </div>

        <!-- 就读学校 -->
        <div
          class="signup__form-item"
          :class="[invalid.school ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="wap-home-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            :value="schoolName"
            type="text"
            placeholder="就读学校"
            readonly="readonly"
            @click="goToSchoolPickerPage"
          />
          <div class="signup__form-select-icon">
            <van-icon
              name="arrow"
              color="white"
              size="20px"
            />
          </div>
        </div>

        <!-- 在校专业 -->
        <div
          class="
            signup__form-item"
          :class="[invalid.major ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="star-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            v-model="form.major"
            type="text"
            placeholder="在校专业"
            @blur="validInput($event, form.major)"
          />
        </div>

        <!-- 入校时间 -->
        <div
          class="signup__form-item"
          :class="[invalid.gread ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="underway-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            v-model="form.gread"
            type="text"
            readonly="readonly"
            placeholder="入学时间"
            @click="enrollPicker = true"
          />
          <div class="signup__form-select-icon">
            <van-icon
              name="arrow"
              color="white"
              size="20px"
            />
          </div>
        </div>

        <!-- 联系电话 -->
        <div
          class="signup__form-item"
          :class="[invalid.phone ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="phone-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            v-model="form.phone"
            type="text"
            placeholder="联系电话"
            @blur="validInput($event, form.phone)"
          />
        </div>

        <div
          class="signup__form-item"
          :class="[invalid.qq ? 'signup__form-item--invalid' : '']"
        >
          <div class="signup__form-icon">
            <van-icon
              name="chat-o"
              color="white"
              size="20px"
            />
            <div class="icon-decoration" />
            <div class="signup__form-divider" />
          </div>
          <input
            class="signup__form-input"
            v-model="form.qq"
            type="text"
            placeholder="QQ号码"
            @blur="validInput($event, form.qq)"
          />
        </div>

      </div>

      <button
        class="signup__form-btn"
        @click="onSubmit"
      >提 交 信 息</button>
      <div class="signup__form-footer">
        以上信息仅使用于卓越设计教育机构报名信息登记
      </div>
    </div>

    <van-popup
      v-model="shopPicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="shops"
        @cancel="shopPicker = false"
        @confirm="shopPickerConfirm"
      />
    </van-popup>
    <van-popup
      v-model="classTypePicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="timeProAndClasTypeList"
        @cancel="classTypePicker = false"
        @confirm="classTypePickerConfirm"
        @change="classTypePickerChange"
      />
    </van-popup>
    <van-popup
      v-model="enrollPicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="enrollDates"
        @cancel="enrollPicker = false"
        @confirm="enrollPickerConfirm"
      />
    </van-popup>

    <van-dialog
      style="text-align: center;"
      v-model="showQrCode"
      title="报名请先关注公众号,以接收确认通知"
    >
      <img
        style="width: 300Px; height: 300Px;"
        :src="qrCode"
      />
    </van-dialog>
  </div>
</template>

<script>
import SignupBg from 'src/assets/signup-bg.jpg'
import {
  hasClass,
  addClass,
  removeClass,
  isNullOrEmpty,
  getQueryParam
} from 'src/utils/util.js'

import {
  getSchools,
  getClassTypes,
  getPros,
  saveSignup,
  getOpenId,
  getAreas
} from 'src/api/signup.js'

import { mapGetters } from 'vuex'

export default {
  name: 'SignUpStudent',
  computed: {
    ...mapGetters([
      'schoolName',
      'provinceCode'
    ])
  },
  data () {
    return {
      qrCode: require('../assets/zhuoyue-qrcode.jpg'),
      showQrCode: false,
      leadTeacher: '',
      shopId: '',
      school: '',

      shops: [],
      realShops: [],
      shopPicker: false,

      classTypes: [],
      realClassTypes: [],
      classTypePicker: false,

      areaList: [],
      showAreaList: [],
      showArea: false,
      areaIndex: 0,

      pros: [],
      realPros: [],

      classTimes: [
        '平时班',
        '假期班7月',
        '假期班8月',
        '假期班1月',
        '假期班2月'
      ],

      timeProAndClasTypeList: [],
      groupedClassTypes: new Map(),

      enrollPicker: false,
      enrollDates: [],

      form: {},
      formDisplay: {},
      invalid: {},

      signupBg: SignupBg,
      sHeight: undefined,
      sWidth: undefined
    }
  },
  watch: {
    schoolName: function () {
      this.form.school = this.schoolName
      this.form.province = this.provinceCode
    }
  },
  created () {
    if (this.isWechat()) document.title = '卓越设计教育'
    this.shopId = getQueryParam('shopId') || this.shopId
    this.form.leadTeacher = getQueryParam('userId') || this.leadTeacher
    // 20200811 这是报名校区，和学习校区区分
    this.form.shopid = this.shopId
    // this.reset()
    this.$store.commit('setSchoolName', '')
    this.$store.commit('provinceCode', '')
    this.getOpenId()
    this.getSchools(this.shopId)
    this.getClassTypes(this.shopId)
    this.getPros(this.shopId)
    this.getClassTimes()
    this.initEnrollDate()
    this.getAreas()
  },
  mounted () {
    this.setHeight()
  },
  activated () {
    if (!this.$route.meta.isUseCache) {
      // 重新加载数据，包含里重置分页，设空原有数据等操作
      this.reloadData()
    }
  },
  methods: {
    reset () {
      this.form = {
        leadTeacher: this.leadTeacher,
        shopid: undefined,
        name: undefined,
        province: undefined,
        classTime: undefined,
        bmzy: undefined,
        bmzyname: undefined,
        classtype: undefined,
        school: undefined,
        major: undefined,
        gread: undefined,
        phone: undefined,
        qq: undefined,
        openId: undefined
      }
      this.formDisplay = {
        shop: undefined,
        classType: undefined
      }
      this.invalid = {
        name: undefined,
        shopid: undefined,
        classtype: undefined,
        school: undefined,
        major: undefined,
        phone: undefined,
        qq: undefined,
        gread: undefined
      }
    },
    getOpenId () {
      const code = getQueryParam('code')
      if (!isNullOrEmpty(code)) {
        getOpenId(code).then(res => {
          this.form.openId = res.data.openId
          // 未关注公众号，弹窗显示卓越的二维码
          if (!res.data.subscribe) {
            this.showQrCode = true
          }
        })
      }
    },
    // 这里的学校是指报名校区
    getSchools (shopId) {
      getSchools(shopId).then(res => {
        // 从学校中取出区域
        let areas = res.data.map(s => s.area)
        const aSet = new Map()
        // 过滤得到相同的区域
        areas = areas.filter(a => !aSet.has(a.id) && aSet.set(a.id, 'foo'))
        // 将相同区域的学校设置到同一区域下
        areas = areas.map(item => {
          item.sList = res.data.filter(s => s.area.id === item.id)
          return item
        })
        // 保留原始对象结构的school
        const shopPickerList = areas.map(item => {
          const children = []
          item.sList.forEach(s => {
            children.push({
              text: s.name
            })
          })
          return {
            text: item.name,
            children: children
          }
        })
        this.realShops = areas
        this.shops = shopPickerList
      })
    },
    getClassTypes (shopId) {
      getClassTypes(shopId).then(res => {
        this.realClassTypes = res.data
        // 从这里面取出开课时间时间数据
        let openClassTimeList = res.data.map(s => s.openTime)
        const aSet = new Map()
        openClassTimeList = openClassTimeList.filter(a => !aSet.has(a) && aSet.set(a))
        this.classTimes = openClassTimeList
        this.timeProAndClasTypeList[0] = {
          values: this.classTimes
        }
        // 对classType进行分组
        let groupedClassTypes = {}
        groupedClassTypes = this.groupBy(this.realClassTypes, function (item) {
          return [item.openTime]
        })
        // 将二维数组转化为map
        groupedClassTypes.forEach(item => {
          this.groupedClassTypes.set(item[0].openTime, item.map(c => c.classtypename))
        })
        console.log(this.groupedClassTypes)
        this.timeProAndClasTypeList[3] = {
          values: this.groupedClassTypes.get(this.classTimes[0])
        }

        // this.classTypes = res.data.map(c => c.classtypename)
        // this.timeProAndClasTypeList[2] = {
        //   values: this.classTypes
        // }
      })
    },
    getPros (shopId) {
      getPros(shopId).then(res => {
        this.realPros = res.data
        this.pros = res.data.map(p => p.name)
        this.timeProAndClasTypeList[1] = {
          values: this.pros
        }
      })
    },
    getClassTimes () {
      // this.timeProAndClasTypeList[0] = {
      //   values: this.classTimes
      // }
    },
    getAreas () {
      getAreas().then(res => {
        this.areaList = res.data
        this.showAreaList = []
        for (const i in this.areaList) {
          const area = this.areaList[i]
          this.showAreaList.push({
            text: area.name,
            value: i
          })
        }
        // console.log(this.showAreaList)
      })
    },
    initEnrollDate () {
      let year = new Date().getFullYear()
      // 表单的语义需要placeholder来说明，默认值会让用户不知道表单的含义
      // this.form.gread = year + '年'
      // this.invalid.gread = false
      for (let i = 0; i < 10; i++) {
        this.enrollDates.push(year + '年')
        year = year - 1
      }
      this.enrollDates.push('已工作')
    },
    onSubmit () {
      if (this.validate()) {
        // 调用提交方法
        saveSignup(this.form).then(res => {
          this.msgSuccess('提交信息成功，请等待老师与您联系')
          this.$router.push({
            name: 'SuccessPage',
            query: {
              title: '报名信息提交成功',
              message: '感谢你的报名，老师将尽快与你联系'
            }
          })
        })
      }
    },
    shopPickerConfirm (value, index) {
      this.shopPicker = false
      this.formDisplay.shop = value[1]
      // this.form.province = this.realShops[index[0]].code
      this.form.learningShopId = this.realShops[index[0]].sList[index[1]].id
      this.invalid.shopid = false
      this.$forceUpdate()
    },
    classTypePickerConfirm (value, index) {
      this.classTypePicker = false
      this.formDisplay.classType = value[1] + '-' + value[2] + '-' + value[0]
      this.form.classtype = this.realClassTypes[index[2]].id
      this.form.bmzy = this.realPros[index[1]].id
      this.form.bmzyname = this.formDisplay.classType
      this.form.classTime = value[0]
      this.invalid.classtype = false
      this.$forceUpdate()
    },
    classTypePickerChange (picker, values, index) {
      if (index === 0) {
        picker.setColumnValues(2, this.groupedClassTypes.get(values[0]))
      }
    },
    enrollPickerConfirm (value) {
      this.enrollPicker = false
      this.form.gread = value
      this.invalid.gread = false
      this.$forceUpdate()
    },
    goToSchoolPickerPage () {
      this.$router.push({ name: 'SchoolPicker' })
    },
    validate () {
      this.invalid = {
        name: undefined,
        learningShopId: undefined,
        classtype: undefined,
        school: undefined,
        major: undefined,
        phone: undefined,
        qq: undefined,
        gread: undefined
      }
      let isInvalid = false
      if (isNullOrEmpty(this.form.name)) {
        isInvalid = true
        this.invalid.name = true
      }
      if (isNullOrEmpty(this.form.learningShopId)) {
        isInvalid = true
        this.invalid.learningShopId = true
      }
      if (isNullOrEmpty(this.form.classtype)) {
        isInvalid = true
        this.invalid.classtype = true
      }
      if (isNullOrEmpty(this.form.school)) {
        isInvalid = true
        this.invalid.school = true
      }
      if (isNullOrEmpty(this.form.major)) {
        isInvalid = true
        this.invalid.major = true
      }
      if (isNullOrEmpty(this.form.phone)) {
        isInvalid = true
        this.invalid.phone = true
      }
      if (isNullOrEmpty(this.form.qq)) {
        isInvalid = true
        this.invalid.qq = true
      }
      if (isInvalid) {
        this.msgWarn('请正确填写所有信息')
        this.$forceUpdate()
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
          this.invalid.phone = true
          this.msgWarn('手机号码格式不正确，请重新输入')
          this.$forceUpdate()
          return false
        }
        return true
      }
    },
    validInput (e, value) {
      const ele = e.target
      const ep = e.target.parentElement
      if (isNullOrEmpty(value)) {
        addClass(ep, 'signup__form-item--invalid')
        this.msgWarn(ele.placeholder + '不能为空')
      } else {
        if (hasClass(ep, 'signup__form-item--invalid')) {
          removeClass(ep, 'signup__form-item--invalid')
        }
        if (ele.placeholder === '联系电话' && !(/^1[3456789]\d{9}$/.test(value))) {
          addClass(ep, 'signup__form-item--invalid')
          this.msgWarn('手机号码格式不正确，请重新输入')
        }
      }
    },
    // 解决安卓软键盘弹出屏幕高度改变的问题
    setHeight () {
      const sHeight = screen.height
      const sWidth = screen.width
      console.log(sHeight, sWidth)
      this.sHeight = sHeight
      this.sWidth = sWidth
      console.log(this.$refs)
      this.$refs.AppContainer.style.height = sHeight + 'px'
      this.$refs.AppContainer.style.width = sWidth + 'px'
      this.$refs.FormBox.style.height = sHeight * 0.7 + 'px'
      this.$refs.FormBox.style.paddingTop = sHeight * 0.08 + 'px'
      // this.$refs.BackImage.style.height = sHeight + 'px'
      // this.$refs.BackImage.style.width = sWidth + 'px'
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

<style lang="scss" scoped>
$primary-btn-color: #d88e5d;
$primary-bg-color: #375455;
$form-invalid-color: red;

$form-item-width: 230px;
$form-item-height: 36px;

.app-container {
  // background-color: $primary-bg-color;
  background: url("../assets/signup-bg.jpg") round left top;
  background-size: contain;
  z-index: -1000;
}

.signup__from-screen-bg-img {
  z-index: -1000;
  position: absolute;
}

.signup__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.ignore {
  // height: 60vh;
  // padding-top: 9vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.signup__form-item {
  display: flex;
  flex-direction: row;
  align-self: center;
  // padding: 10px 0;
  height: $form-item-height;
  width: $form-item-width;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 17px;
  margin: 3px 0;
}

.signup__form-item--invalid {
  border-color: $form-invalid-color;
}

.signup__form-icon {
  position: relative;
  display: flex;
  align-self: center;
  padding-left: 15px;
  padding-right: 10px;
  z-index: 10;

  .icon-decoration {
    width: 14px;
    height: 14px;
    background-color: $primary-btn-color;
    opacity: 0.7;
    border-radius: 50%;
    position: absolute;
    // left: 17px;
    bottom: 0;
    // 可能是因为背景显示的方式修改了的缘故,黄点没有显示了
    // 但是没有黄点好像还更清爽一些
    // z-index: -10;
    z-index: 9;
  }
}

.signup__form-divider {
  width: 1px;
  height: 24px;
  padding: 7px 0;
  margin-left: 10px;
  background-color: white;
  opacity: 0.8;
}

.signup__form-input {
  width: 140px;
  // display: flex;
  // flex-grow: 1;
  outline: none;
  background-color: transparent;
  border: none;
  caret-color: white;
  color: white;
  font-size: 14px;
  padding-right: 10px;
  box-sizing: border-box;
}

input::placeholder {
  color: white;
  position: relative;
  // left: 5px;
}

.signup__form-select-icon {
  display: flex;
  align-items: center;
}

.signup__form-btn {
  height: 34px;
  width: $form-item-width;
  color: white;
  background-color: $primary-btn-color;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  margin-top: 30px;
}

.signup__form-footer {
  width: $form-item-width;
  font-size: 10px;
  color: white;
  text-align: center;
  margin-top: 5px;
  opacity: 0.8;
}
.signup__form {
  position: relative;
  top: 120px;
}
</style>
