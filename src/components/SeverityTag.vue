<template>
  <span :class="[tagClass, levelClass]">{{ levelDisplay }}</span>
</template>

<script>
export default {
  data () {
    return {
      tagClass: 'tag'
    }
  },
  computed: {
    levelClass () {
      var name = ''

      switch (this.level) {
        case 'warn':
          name = 'warning'
          break
        case 'error':
          name = 'danger'
          break
        case 'fatal':
          name = 'grey-dark'
          break
        case 'default':
          name = this.level
          break
      }

      return 'is-' + name
    },
    levelDisplay () {
      return this.level.charAt(0).toUpperCase() + this.level.slice(1)
    }
  },
  props: ['level']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
