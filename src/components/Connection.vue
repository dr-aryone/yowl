<template>
  <div class="pane">
    <h3 class="title">{{ connection.name }}</h3>
    <div class="field"
      v-for="(setting, index) in connection.settings" 
      :key="index">
      <label class="label">{{ setting.name }}</label>
      <div class="control">
        <input
          class="input" 
          :type="setting.type"
          v-model="setting.value">
      </div>
    </div>        
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
import BrowserPush from '../services/BrowserPushService'
import Connections from '../services/ConnectionService'

export default {
  data () {
    return {
      connection: {},
      isTesting: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    save () {
      var inst = this

      Connections.save(inst.connection._id, inst.connection)
        .then(function (response) {
          if (response.data.success) {
            inst.close()
          } else {
            console.log('Failed to save')
            console.log(response.data)
          }
        })
        .catch((error) => console.log(error))
    },
    test () {
      var inst = this
      inst.isTesting = true

      if (inst.connection._id === 'browserPush') {
        if (BrowserPush.isGranted()) {
          BrowserPush.sendNotification('INFO', 'test', 'This is a test.')
        } else {
          BrowserPush
            .requestPermission()
            .then(function (granted) {
              if (granted) {
                BrowserPush.sendNotification('INFO', 'test', 'This is a test.')
              }
            })
        }

        inst.isTesting = false
      } else {
        Connections.test(inst.settings)
          .then(function (response) {
            if (response.data.success) {
              inst.isTesting = false
            } else {
              console.log('Failed to test')
              console.log(response.data)
              inst.isTesting = false
            }
          })
          .catch((error) => {
            console.log(error)
            inst.isTesting = false
          })
      }
    }
  },
  mounted () {
    if (!this.model) return

    this.connection = this.model
  },
  props: ['model']
}
</script>

<style scoped>
</style>
