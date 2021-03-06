<!-- 教师通过消息点击进入的报名缴费信息填写页面 -->
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
      填写缴费信息
    </q-toolbar>

    <nl-block-title
      :title="'学生信息'"
      class="q-mt-sm"
    />
    <div class="column q-px-md q-mb-sm">
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="姓名-学校"
          v-model="nameAndSchool"
          readonly
        />
        <q-input
          class="col"
          label="专业-入校时间"
          v-model="majorAndYear"
          readonly
        />
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="报名校区"
          v-model="signShop"
          readonly
        />
        <q-input
          class="col"
          label="上课校区"
          v-model="classShop"
          readonly
        />
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="报名上课时间"
          v-model="openClassTime"
          readonly
        />
        <q-input
          class="col"
          label="上课专业-班种"
          v-model="bmzy_classType"
          readonly
        />
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="联系方式-手机"
          v-model="contact_phone"
          readonly
        />
        <q-input
          v-if="!isNullOrEmpty(contact_qq)"
          class="col"
          label="联系方式-QQ"
          v-model="contact_qq"
          readonly
        />
      </div>
    </div>

    <nl-block-title :title="'缴费信息'" />

    <q-form
      @submit="onSubmit"
      class="column justify-center q-px-md q-mb-sm"
      ref="form"
    >
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="学费"
          v-model="form.tuition"
          :rules="[val => !!val || '学费不能为空']"
          lazy-rules
        />
        <q-input
          class="col"
          label="预留金"
          v-model="form.reserve"
          :rules="[val => !!val || '预留金不能为空']"
          lazy-rules
        />
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="优惠"
          v-model="form.discount"
          :rules="[val => !!val || '优惠不能为空']"
          lazy-rules
        />
        <q-select
          class="col"
          :options="newOrOldOptions"
          label="新老学员"
          v-model="form.newOrOld"
          :rules="[val => !!val || '请选择新老学员']"
          lazy-rules
        />
      </div>
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="应缴学费"
          v-model="finalTuition"
          readonly
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
  updateSignup
} from 'src/api/signup.js'
import NlBlockTitle from 'src/components/NlBlockTitle'

export default {
  name: 'SignUpInfo',
  components: {
    NlBlockTitle
  },
  data () {
    return {
      newOrOldOptions: [
        '新学员',
        '老学员'
      ],

      showPicker: false,
      submiting: false,

      form: {},
      student: {},
      signupId: ''
    }
  },
  computed: {
    finalTuition: function () {
      return (this.form.tuition || this.form.tuition === 0) &&
        (this.form.reserve || this.form.reserve === 0) &&
        (this.form.discount || this.form.discount === 0)
        ? this.form.tuition - this.form.reserve - this.form.discount
        : ''
    },
    nameAndSchool: function () {
      const arr = []
      if (this.student.name) arr.push(this.student.name)
      if (this.student.school) arr.push(this.student.school)
      return arr.join('-')
    },
    majorAndYear: function () {
      const arr = []
      // if (this.student.provincename) arr.push(this.student.provincename)
      if (this.student.major) arr.push(this.student.major)
      if (this.student.gread) arr.push(this.student.gread)
      return arr.join('-')
    },
    signShop: function () {
      const arr = []
      if (this.student.shopname) arr.push(this.student.shopname)
      return arr.join('-')
    },
    classShop: function () {
      const arr = []
      if (this.student.learningShopName) arr.push(this.student.learningShopName)
      return arr.join('-')
    },
    bmzy_classType: function () {
      const arr = []
      if (this.student.bmzyname) arr.push(this.student.bmzyname)
      if (this.student.classtypename) arr.push(this.student.classtypename)
      return arr.join('-')
    },
    openClassTime: function () {
      let oct = ''
      if (this.student.classTime) oct = this.student.classTime
      return oct
    },
    contact_phone: function () {
      let phone = this.student.phone
      if (!isNullOrEmpty(phone)) { phone = phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4) }
      return phone
    },
    contact_qq: function () {
      return this.student.qq
    }
  },
  created () {
    if (this.isWechat()) document.title = '填写缴费信息'
    this.reset()
    this.signupId = this.$route.query.signupId
    this.getSignup(this.signupId)
  },
  methods: {
    reset () {
      this.form = {
        id: undefined,
        tuition: undefined,
        reserve: undefined,
        newOrOld: '',
        discount: undefined,
        newUpdate: true
      }
    },
    getSignup (signupId) {
      getSignup(signupId).then(res => {
        this.student = res.data
        this.form.id = res.data.id
      })
    },
    onSubmit (values) {
      this.submiting = true
      this.student.tuition = this.form.tuition
      this.student.reserve = this.form.reserve
      this.student.newOrOld = this.form.newOrOld
      this.student.discount = this.form.discount
      this.student.newUpdate = this.form.newUpdate
      updateSignup(this.student).then(res => {
        this.submiting = false
        if (res.code === 1) {
          this.msgSuccess('报名缴费信息保存成功')
          this.$router.push({
            name: 'SuccessPage',
            query: {
              title: '报名缴费信息填写成功',
              message: '缴费信息填写成功，请尽快与学生取得联系'
            }
          })
        } else {
          this.msgError('报名缴费信息保存失败')
        }
      })
    },
    onConfirm (value, index) {
      this.form.newOrOld = value
      this.showPicker = false
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
