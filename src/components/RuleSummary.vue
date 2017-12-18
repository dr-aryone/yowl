<template>
  <span>{{ summary }}</span>
</template>

<script>
export default {
  data () {
    return {
      exclude: {
        _id: true,
        broadcastType: true
      }
    }
  },
  computed: {
    summary () {
      var pairs = Object.keys(this.rule)
        .filter((key) => {
          return !this.exclude[key] && this.rule[key].length > 0
        })
        .map((key) => {
          return key + '=' + this.rule[key]
        })

      return pairs.join(', ')
    }
  },
  props: ['rule']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
