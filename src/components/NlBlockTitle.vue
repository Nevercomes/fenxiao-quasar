<template>
  <div class="row items-center q-px-md q-py-sm">
    <div
      style="width: 4px; height:1.2em"
      class="bg-primary"
    />
    <div class="text-subtitle1 q-ml-sm text-primary text-bold">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'NlBlockTitle',
  props: {
    title: {
      required: true,
      default: '标题'
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
</style>
