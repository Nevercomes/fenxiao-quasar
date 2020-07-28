<template>
  <div
    class="column justify-center items-center q-pa-md"
    v-if="show"
  >
    <q-img
      style="width: 104px; height: 64px;"
      src="../assets/no-data.png"
    />
    <div class="q-mt-md text-grey">{{text}}</div>
  </div>
</template>
<script>
export default {
  name: 'NlEmpty',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    text: {
      default: '空空如也'
    }
  }
}
</script>
