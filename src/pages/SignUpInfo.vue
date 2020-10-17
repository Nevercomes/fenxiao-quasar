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
      报名详细信息
    </q-toolbar>

    <nl-block-title
      :title="'学生信息'"
      class="q-mt-sm"
    />
    <div class="column q-px-md q-mb-sm">
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="姓名"
          v-model="student.name"
          readonly
        />
        <q-input
          class="col"
          label="学校"
          v-model="studentDesc"
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
          label="联系方式"
          v-model="contact"
          readonly
        />
        <q-input
          class="col"
          label="上课班种"
          v-model="classType"
          readonly
        />
      </div>
    </div>

    <nl-block-title :title="'缴费信息'" />

    <q-form
      @submit="submit"
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
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          label="备注内容"
          v-model="form.remarks"
          type="textarea"
          clearable
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
      form: {},
      submiting: false,

      newOrOldOptions: [
        '新学员',
        '老学员'
      ],
      student: {},
      id: ''
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
    studentDesc: function () {
      const arr = []
      // if (this.student.provincename) arr.push(this.student.provincename)
      if (this.student.school) arr.push(this.student.school)
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
    classType: function () {
      const arr = []
      if (this.student.classTime) arr.push(this.student.classTime)
      if (this.student.bmzyname) arr.push(this.student.bmzyname)
      if (this.student.classtypename) arr.push(this.student.classtypename)
      return arr.join('-')
    },
    contact: function () {
      const arr = []
      let phone = this.student.phone
      if (!isNullOrEmpty(phone)) { phone = phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4) }
      if (phone) arr.push(phone)
      if (this.student.qq) arr.push(this.student.qq)
      return arr.join('/')
    }
  },
  created () {
    if (this.isWechat()) document.title = '报名详细信息'
    this.id = this.$route.query && this.$route.query.id
    this.getSignup(this.id)
  },
  methods: {
    reset () {
      this.form = {
        id: undefined,
        tuition: undefined,
        reserve: undefined,
        newOrOld: '',
        discount: undefined
      }
    },
    getSignup (id) {
      this.reset()
      getSignup(id).then(res => {
        this.student = res.data
        this.form.id = res.data.id
        this.form.tuition = this.student.tuition
        this.form.reserve = this.student.reserve
        this.form.newOrOld = this.student.newOrOld
        this.form.discount = this.student.discount
        this.form.remarks = this.student.remarks
      })
    },
    submit () {
      this.student.tuition = this.form.tuition
      this.student.reserve = this.form.reserve
      this.student.newOrOld = this.form.newOrOld
      this.student.discount = this.form.discount
      this.student.remarks = this.form.remarks
      this.$refs.form.validate().then(success => {
        if (success) {
          this.submiting = true
          updateSignup(this.student).then(res => {
            this.submiting = false
            if (res.code === 1) {
              this.msgSuccess('报名信息修改成功')
            } else {
              this.msgError('报名信息修改失败')
            }
          })
        } else {
          this.msgWarn('请正确填写所有字段')
        }
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
