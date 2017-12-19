<template>
  <div class="pane">
    <h3 class="title">SMTP</h3>
    <div class="field">
      <label class="label">Outgoing Mail (SMTP) Server</label>
      <div class="control">
        <input
          class="input" 
          type="text"
          v-model="settings.host">
      </div>
    </div>  
    <div class="field">
      <label class="label">Port</label>
      <div class="control">
        <input 
          class="input" 
          type="number"
          v-model="settings.port">
      </div>
    </div> 
    <div class="field">
      <label class="label">Use Authentication</label>
      <div class="control">
        <div class="select">
          <select v-model="settings.useAuthentication">
            <option value="y">Yes</option>
            <option value="n">No</option>            
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Use Secure Connection</label>
      <div class="control">
        <div class="select">
          <select v-model="settings.useSecure">
            <option value="y">Yes</option>
            <option value="n">No</option>            
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input 
          class="input" 
          type="text"
          v-model="settings.username">
      </div>
    </div>    
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input 
          class="input" 
          type="password"
          v-model="settings.password">
      </div>
    </div>       
    <div class="field">
      <label class="label">Test Email Address</label>
      <div class="control">
        <input 
          class="input" 
          type="email"
          v-model="settings.testTo">
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

      Connections.getSmtp()
        .then(function (response) {
          inst.settings = response.data
        })
        .catch((error) => console.log(error))
    },
    save () {
      var inst = this

      Connections.saveSmtp(inst.settings)
        .then(function (response) {
          if (response.data.success) {
            inst.close()
          } else {
            console.log('Failed to send SMTP')
            console.log(response.data)
          }
        })
        .catch((error) => console.log(error))
    },
    test () {
      var inst = this
      inst.isTesting = true

      Connections.testSmtp(inst.settings)
        .then(function (response) {
          if (response.data.success) {
            inst.isTesting = false
          } else {
            console.log('Failed to send SMTP')
            console.log(response.data)
            inst.isTesting = false
          }
        })
        .catch((error) => {
          console.log(error)
          inst.isTesting = false
        })
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style scoped>
</style>
