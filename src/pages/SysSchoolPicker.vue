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
      选择学校
    </q-toolbar>
    <!-- 搜索框 -->
    <q-input
      rounded
      outlined
      dense
      v-model="queryParams.schoolName"
      type="search"
      placeholder="输入学校名称"
      class="q-px-sm q-mt-md"
      @input="onSearch"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <!-- 学校列表 -->
    <q-list>
      <q-item
        v-for="(item, index) in schoolList"
        :key="index"
        clickable
        v-ripple
        class="relative-position q-my-xs"
        @click="onItemClick(item.schoolName)"
      >
        <q-item-section>
          {{item.schoolName}}
        </q-item-section>
      </q-item>
    </q-list>
    <nl-empty
      :show="empty"
      :text="'没有符合的学校'"
    ></nl-empty>
  </div>
</template>

<script>

import { listSchool } from 'src/api/school.js'
import NlEmpty from 'src/components/NlEmpty'

export default {
  name: 'SysSchoolPicker',
  components: {
    NlEmpty
  },
  data () {
    return {
      dataList: [],
      empty: false,
      schoolList: [],
      queryParams: {
        schoolName: undefined
      }
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      listSchool(this.queryParams).then(res => {
        this.dataList = res.data
        this.schoolList = this.dataList.slice(0, 100)
      })
    },
    onSearch () {
      if (this.queryParams.schoolName) {
        this.schoolList = this.dataList.filter(ele => ele.schoolName.indexOf(this.queryParams.schoolName) !== -1)
      } else {
        this.schoolList = this.dataList.slice(0, 100)
      }
      this.empty = !this.schoolList || this.schoolList.length === 0
    },
    onItemClick (schoolName) {
      this.$store.commit('setSchoolName', schoolName)
      this.$router.back()
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
