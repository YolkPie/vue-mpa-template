<template>
  <div v-if="visible">
    <div class="toast-mask-transparent"></div>
    <div
      class="toast"
      :class="customClass"
    >
      {{message}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: String
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    customClass () {
      var classes = []
      switch (this.show) {
        case 'true':
          classes.push('toast__show')
          break
        case 'false':
          classes.push('toast__hide')
          break
        default:
          classes.push('')
      }
      classes.push(this.className)

      return classes.join(' ')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./toast.scss";
</style>
