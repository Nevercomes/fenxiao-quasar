<!-- 表单提交等操作成功跳转的页面 -->
<template>
  <div class="app-container">
    <q-toolbar
      v-if="!isWechat()"
      class="text-white bg-primary text-subtitle1 shadow-2"
    >
      <q-btn
        flat
        round
        dense
        icon="arrow_back_ios"
        @click="onBack"
      />
      返回
    </q-toolbar>
    <div class="sucesss-page__box">
      <div class="sucesss-page__title">{{title}}</div>
      <q-img
        :src="imgUrl"
        class="sucesss-page__image"
        width="100px"
        height="100px"
      />
      <div class="sucesss-page__message">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '操作成功',
      message: '恭喜操作成功',
      imgUrl: require('../assets/success.png')
    }
  },
  created () {
    if (this.isWechat()) document.title = '操作成功'
    const title = this.$route.query && this.$route.query.title
    const message = this.$route.query && this.$route.query.message
    this.title = title || this.title
    this.message = message || this.message
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
.sucesss-page__box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sucesss-page__title {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}

.sucesss-page__image {
  margin: 30px 0;
}

.sucesss-page__message {
  color: darkgrey;
}
</style>
