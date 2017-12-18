<template>
  <div class="pane">
    <h3 class="title">Rule</h3>
    <div class="field">
      <label class="label">Severity</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Debug</option>
            <option>Info</option>
            <option>Warning</option>
            <option>Error</option>
            <option>Critical</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Error Code</label>
      <div class="control">
        <input 
          class="input" 
          type="text">
      </div>
    </div>
    <div class="field">
      <label class="label">Keywords</label>
      <div class="control">
        <input 
          class="input" 
          type="text">
      </div>
    </div>          
    <div class="field">
      <label class="label">Broadcast Type</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Notify</option>
            <option>Require Action</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Channels</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Email</option>
            <option>SMS</option>
            <option>Desktop</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success">Save</button>
      </div>
      <div class="control">
        <button class="button is-text">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
