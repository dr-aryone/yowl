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
              <td>
                <severity-tag :level="alert.severity" />
                <span v-if="alert.count">x {{ alert.count }}</span>
              </td>
              <td>{{ alert.application }}</td>
              <td>{{ alert.errorCode }}</td>
              <td :title="alert.message" class="is-hidden-mobile">
                {{ alert.message | truncate(60) }}
              </td>              
              <td class="actions is-hidden-mobile">
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
import BrowserPush from '../services/BrowserPushService'
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

      BrowserPush.sendNotification(alert.severity, alert._id, alert.message)
    })

    EventBus.$on('alert:updated', (alert) => {
      for (var i in inst.alerts) {
        if (inst.alerts[i]._id !== alert._id) continue

        inst.alerts[i] = alert
        break
      }

      BrowserPush.sendNotification(alert.severity, alert._id, alert.message)
    })
  },
  data () {
    return {
      alerts: []
    }
  },
  filters: {
    truncate: function (text, length) {
      var clamp = '...'
      return text.length > length ? text.slice(0, length) + clamp : text
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
