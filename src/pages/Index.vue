<template>
  <q-page>
    <div class="q-pa-md">
      <q-infinite-scroll
        @load="onLoad"
        :offset="250"
        :disable="noMore"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="caption"
        >
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
        <div v-if="noMore">没有更多了</div>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      items: [],
      noMore: false,
      count: 0,
      firstLoading: false
    }
  },
  mounted () {
    // this.$q.notify({
    //   message: '操作成功',
    //   color: 'negative'
    // })
    this.msgInfo('你好')
  },
  methods: {
    alert () {
      this.$q.dialog({
        title: 'Alert',
        message: 'Some message'
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    refresh (done) {
      setTimeout(() => {
        this.items.push({}, {}, {}, {}, {}, {}, {})
        done()
      }, 1000)
    },

    onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2000)
      this.count++
      if (this.count === 3) this.noMore = true
    }
  }
}
</script>
