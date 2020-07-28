<template>
  <div>
    <q-toolbar class="text-white bg-primary text-subtitle1 shadow-2">
      <q-btn
        flat
        round
        dense
        icon="arrow_back_ios"
        @click="back"
      />
      报名详细信息
    </q-toolbar>

    <q-form
      @submit="submit"
      class="q-gutter-md column justify-center"
      ref="form"
    >
      <q-btn
        label="提交"
        type="submit"
        color="primary"
        :loading="submiting"
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

export default {
  name: 'SignUpInfo',
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
      return this.form.tuition && this.form.discount
        ? this.form.tuition - this.form.reserve - this.form.discount
        : ''
    },
    studentDesc: function () {
      const arr = []
      if (this.student.school) arr.push(this.student.school)
      if (this.student.major) arr.push(this.student.major)
      if (this.student.gread) arr.push(this.student.gread)
      return arr.join('-')
    },
    classShop: function () {
      const arr = []
      if (this.student.provincename) arr.push(this.student.provincename)
      if (this.student.shopname) arr.push(this.student.shopname)
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
      })
    },
    submit () {
      this.student.tuition = this.form.tuition
      this.student.reserve = this.form.reserve
      this.student.newOrOld = this.form.newOrOld
      this.student.discount = this.form.discount
      this.refs.form.validate().then(success => {
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
