<template>
  <div class="pane">
    <h3 class="title">Browser Push Notification</h3>      
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" @click="save()">Save</button>
      </div>
      <div class="control">
        <button :class="['button', 'is-info', {'is-loading': isTesting}]" @click="test()">Test</button>
      </div>
      <div class="control">
        <button class="button is-text" @click="close()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import BrowserPush from '../../services/BrowserPushService'
import Connections from '../../services/ConnectionService'

export default {
  data () {
    return {
      settings: {},
      isTesting: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    load () {
      var inst = this

      Connections.getBrowserPush()
        .then(function (response) {
          inst.settings = response.data
        })
        .catch((error) => console.log(error))
    },
    save () {
      var inst = this

      Connections.saveBrowserPush(inst.settings)
        .then(function (response) {
          if (response.data.success) {
            inst.close()
          } else {
            console.log('Failed to send Browser Push')
            console.log(response.data)
          }
        })
        .catch((error) => console.log(error))
    },
    test () {
      var inst = this
      inst.isTesting = true

      if (BrowserPush.isGranted()) {
        BrowserPush.sendNotification('test', 'This is a test.')
      } else {
        BrowserPush
          .requestPermission()
          .then(function (granted) {
            if (granted) {
              BrowserPush.sendNotification('test', 'This is a test.')
            }
          })
      }

      inst.isTesting = false
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style scoped>
</style>
