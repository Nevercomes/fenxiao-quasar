<template>
  <div>
    <q-toolbar
      v-if="!isWechat()"
      class="text-white bg-primary text-subtitle1 shadow-2"
    >
      <q-btn
        flat
        round
        dense
        icon="arrow_back_ios"
        @click="back"
      />
      学生基本信息
    </q-toolbar>

    <nl-block-title
      :title="'基本信息'"
      class="q-mt-sm"
    />

    <q-form
      @submit="submit"
      class="column justify-center q-px-md q-mb-sm"
      ref="form"
    >
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="姓名"
          v-model="form.name"
        />
        <q-input
          class="col"
          label="学校"
          v-model="form.school"
          readonly
        />
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="学校专业"
          v-model="form.major"
        />
        <q-select
          class="col"
          v-model="form.gread"
          :options="greadOptions"
          option-value="value"
          option-label="label"
          map-options
          emit-value
          label="入学时间"
        >
        </q-select>
      </div>
      <div class="row justify-between q-gutter-sm">
        <q-select
          class="col"
          v-model="form.classTime"
          :options="classTimeOptions"
          option-value="name"
          option-label="name"
          map-options
          emit-value
          label="报名上课时间"
          :rules="[val => !!val || '请选择报名上课时间']"
          @input="onClassTimeChange"
        >
        </q-select>
        <q-select
          class="col"
          v-model="form.learningShopId"
          :options="shopOptions"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          label="学习校区"
          :rules="[val => !!val || '请选择学习校区']"
        >
        </q-select>
      </div>
      <div class="row q-gutter-sm">
        <q-select
          class="col"
          v-model="form.bmzy"
          :options="bmzyOptions"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          label="报名专业"
          :rules="[val => !!val || '请选择报名专业']"
        >
        </q-select>
        <q-select
          class="col"
          v-model="form.classtype"
          :options="classTypeOptions"
          option-value="id"
          option-label="classtypename"
          map-options
          emit-value
          label="班种"
          :rules="[val => !!val || '请选择报名班种']"
        >
        </q-select>
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="手机"
          v-model="form.phone"
        />
        <q-input
          class="col"
          label="QQ"
          v-model="form.qq"
        />
      </div>

      <q-btn
        label="提交"
        type="submit"
        color="primary"
        :loading="submiting"
        class="q-mt-lg"
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
  isNullOrEmpty
} from 'src/utils/util.js'
import {
  getSignup,
  updateBasicInfo,
  getClassTypes,
  getProsByStudentTempId,
  getClassTimes,
  getSchools
} from 'src/api/signup.js'
import NlBlockTitle from 'src/components/NlBlockTitle'

import { mapGetters } from 'vuex'

export default {
  name: 'SignUpInfoBasic',
  components: {
    NlBlockTitle
  },
  data () {
    return {
      form: {},
      submiting: false,

      classTimeOptions: [],
      shopOptions: [],
      greadOptions: [],
      bmzyOptions: [],
      classTypeOptions: [],
      sourceClassTypeOptions: [],

      student: {},
      id: ''
    }
  },
  computed: {
    ...mapGetters([
      'shopId'
    ])
  },
  created () {
    if (this.isWechat()) document.title = '学生信息'
    this.id = this.$route.query && this.$route.query.id
    this.getSignup(this.id)
    this.getSchools(this.shopId)
    this.getClassTypes(this.shopId)
    this.getPros(this.id)
    this.getClassTimes(this.shopId)
    this.initEnrollDate()
  },
  methods: {
    reset () {
      this.form = {
        id: undefined,
        major: undefined
      }
    },
    getSignup (id) {
      this.reset()
      getSignup(id).then(res => {
        this.form = res.data
      })
    },
    getSchools (shopId) {
      getSchools(shopId).then(res => {
        this.shopOptions = res.data || []
      })
    },
    getClassTypes (shopId) {
      getClassTypes(shopId).then(res => {
        this.sourceClassTypeOptions = res.data || []
        this.classTypeOptions = this.sourceClassTypeOptions
        this.onClassTimeChange()
      })
    },
    getPros (studentTempId) {
      getProsByStudentTempId(studentTempId).then(res => {
        this.bmzyOptions = res.data || []
      })
    },
    getClassTimes (shopId) {
      getClassTimes(shopId).then(res => {
        this.classTimeOptions = res.data || []
      })
    },
    initEnrollDate () {
      let year = new Date().getFullYear()
      // 表单的语义需要placeholder来说明，默认值会让用户不知道表单的含义
      // this.form.gread = year + '年'
      // this.invalid.gread = false
      for (let i = 0; i < 10; i++) {
        this.greadOptions.push({
          value: year + '年',
          label: year + '年'
        })
        year = year - 1
      }
      this.greadOptions.push({
        label: '已工作',
        value: '已工作'
      })
      console.log(this.greadOptions)
    },
    onClassTimeChange () {
      this.classTypeOptions = this.sourceClassTypeOptions.filter(item => {
        return item.openTimeId === this.form.classTime || item.openTime === this.form.classTime
      })
    },
    submit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.submiting = true
          updateBasicInfo(this.form).then(res => {
            this.submiting = false
            if (res.code === 1) {
              this.msgSuccess('学生基本信息修改成功')
              setTimeout(() => this.back(), 1500)
            } else {
              this.msgError('学生基本信息修改失败')
            }
          })
        } else {
          this.msgWarn('请正确填写所有字段')
        }
      })
    },
    back () {
      this.$router.back()
    },
    isNullOrEmpty (obj) {
      return isNullOrEmpty(obj)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
