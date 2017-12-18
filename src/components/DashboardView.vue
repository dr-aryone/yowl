<template>
  <section class="view section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <table 
            class="main-table table is-hoverable is-fullwidth" 
            v-cloak>
            <tr 
              v-for="(alert, index) in alerts" 
              :key="alert._id">              
              <td><severity-tag :level="alert.severity" /></td>
              <td>{{ alert.application }}</td>
              <td>{{ alert.errorCode }}</td>
              <td>{{ alert.message }}</td>              
              <td class="actions">
                <button
                  type="button"
                  class="button is-light"
                  @click="createRule(alert)">
                  Create Rule
                </button>
                <button 
                  type="button" 
                  class="button is-light">
                  Clear
                </button>
                <button 
                  type="button" 
                  class="button is-light" 
                  @click="deleteAlert(alert._id, index)">
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Alerts from '../services/AlertService'
import EventBus from '../services/EventBus'
import SeverityTag from './SeverityTag'

export default {
  components: {
    SeverityTag
  },
  created () {
    var inst = this

    EventBus.$on('alert:created', (alert) => {
      inst.alerts.push(alert)
    })
  },
  data () {
    return {
      alerts: []
    }
  },
  methods: {
    createRule (alert) {
      EventBus.$emit('rule:create', alert)
    },
    deleteAlert (id, index) {
      var inst = this

      Alerts.remove(id)
        .then((response) => {
          if (response.data.success === true) {
            inst.alerts.splice(index, 1)
          } else {
            console.log('Failed to delete alert')
          }
        })
        .catch((error) => console.log(error))
    },
    getAlerts () {
      Alerts.list()
        .then((response) => (this.alerts = response.data))
        .catch((error) => console.log(error))
    }
  },
  mounted () {
    this.getAlerts()
  }
}
</script>

<style scoped>
</style>
