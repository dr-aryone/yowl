<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <table 
            id="alerts-table" 
            class="table is-hoverable is-fullwidth" 
            v-cloak>
            <tr 
              v-for="(alert, index) in alerts" 
              :key="alert._id">
              <td><severity-tag :level="alert.severity" /></td>
              <td>{{ alert.type }}</td>
              <td>{{ alert.message }}</td>              
              <td class="alert-actions">
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
import SeverityTag from './SeverityTag'

export default {
  components: {
    SeverityTag
  },
  data () {
    return {
      alerts: []
    }
  },
  methods: {
    deleteAlert (id, index) {
      var inst = this

      Alerts.remove(id)
        .then(function (response) {
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
    var inst = this

    inst.getAlerts()

    // var socket = io.connect('http://localhost:3000');
    // socket.on("connect", function(){
    //   console.log("Socket connected.");
    // });
    // socket.on('alert:created', function(alert) {
    //   inst.alerts.push(alert);
    // });
  }
}
</script>

<style scoped>
#alerts-table button {
  visibility: hidden;
}

#alerts-table tr:hover button {
  visibility: visible;
}

#alerts-table td {
  vertical-align: middle;
}

.alert-actions {
  text-align: right;
}
</style>
