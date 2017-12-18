<template>
  <div class="pane">
    <h3 class="title">Rule</h3>
    <div class="field">
      <label class="label">Severity</label>
      <div class="control">
        <div class="select">
          <select v-model="severity">
            <option></option>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Error Code</label>
      <div class="control">
        <input 
          class="input" 
          type="text"
          v-model="errorCode">
      </div>
    </div>
    <div class="field">
      <label class="label">Keywords</label>
      <div class="control">
        <input 
          class="input" 
          type="text"
          v-model="keywords">
      </div>
    </div>          
    <div class="field">
      <label class="label">Broadcast Type</label>
      <div class="control">
        <div class="select">
          <select v-model="broadcastType">
            <option value="notify">Notify</option>
            <option value="requireAction">Require Action</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" @click="save()">Save</button>
      </div>
      <div class="control">
        <button class="button is-text" @click="close()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../services/EventBus'
import Rules from '../services/RuleService'

export default {
  data () {
    return {
      severity: '',
      errorCode: '',
      keywords: '',
      broadcastType: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    create () {
      var inst = this

      Rules.create(this.severity, this.errorCode, this.keywords, this.broadcastType)
        .then(function (response) {
          if (response.data._id) {
            inst.close()
          } else {
            console.log('Failed to create rule')
            console.log(response.data)
          }
        })
        .catch((error) => console.log(error))
    },
    save () {
      if (this.model.updating) {
        this.update()
      } else {
        this.create()
      }
    },
    update () {
      var inst = this

      Rules.update(this.model._id, this.severity, this.errorCode, this.keywords, this.broadcastType)
        .then(function (response) {
          if (response.data.success) {
            EventBus.$emit('rule:updated')
            inst.close()
          } else {
            console.log('Failed to update rule')
            console.log(response.data)
          }
        })
        .catch((error) => console.log(error))
    }
  },
  mounted () {
    if (!this.model) return

    this.severity = this.model.severity
    this.errorCode = this.model.errorCode

    if (this.model.updating) {
      this.broadcastType = this.model.broadcastType
    }
  },
  props: ['model']
}
</script>

<style scoped>
</style>
