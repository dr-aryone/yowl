<template>
  <section class="view section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">Connections</h4>
          <div class="tile is-ancestor">
            <div class="tile box is-child">
              <p class="title">
                SMTP
              </p>
              <p class="action">
                <button 
                  type="button" 
                  :class="['button', {'is-info': !smtpActive}, {'is-success': smtpActive}]" 
                  @click="createConnection('SmtpConnection')">
                  {{ smtpActive ? 'Connected' : 'Connect' }}
                </button>
              </p>
            </div>            
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">Users</h4>          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EventBus from '../services/EventBus'
import Connections from '../services/ConnectionService'

export default {
  data () {
    return {
      smtpActive: false
    }
  },
  methods: {
    createConnection (type) {
      EventBus.$emit('connection:create', type)
    },
    loadActiveConnections () {
      Connections.getAllActive()
        .then((response) => {
          response.data.forEach((key) => {
            this[key + 'Active'] = true
          })
        })
        .catch((err) => console.log(err))
    }
  },
  mounted () {
    this.loadActiveConnections()
  }
}
</script>

<style scoped>
.tile.is-ancestor {
  margin-left:0;
  margin-right:0;
}

.tile.is-child {
  margin:20px 20px 20px 0 !important;
  max-width: 200px;
}

.tile.tile.is-child:last-child {
  margin-right: 0 !important;
}

.tile .title {
  text-align: center;
}

.action {
  margin: 0 -1.25rem -1.25rem -1.25rem;
}

.action button {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: block;  
  width: 100%;
}
</style>
