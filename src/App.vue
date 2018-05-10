<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <nav class="navbar">
              <div class="navbar-brand">
                <a class="navbar-item" @click="openView('dashboard-view')">
                  Yowl
                </a>
                <div class="navbar-burger burger" data-target="main-nav">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div id="main-nav" class="navbar-menu">
                <div class="navbar-start">
                  <a :class="['navbar-item', {'is-active': currentView == 'dashboard-view'}]" @click="openView('dashboard-view')">
                    Dashboard
                  </a>
                  <a :class="['navbar-item', {'is-active': currentView == 'rules-view'}]" @click="openView('rules-view')">
                    Rules
                  </a>
                  <a :class="['navbar-item', {'is-active': currentView == 'settings-view'}]" @click="openView('settings-view')">
                    Settings
                  </a>
                </div>                
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <component v-if="currentView" :is="currentView" />
    <component 
      v-if="currentPane" 
      :is="currentPane" 
      :model="paneModel"
      @close="closePane" />
  </div>
</template>

<script>
import Connection from './components/Connection'
import EventBus from './services/EventBus'
import DashboardView from './components/DashboardView'
import IO from 'socket.io-client'
import RulesView from './components/RulesView'
import Rule from './components/Rule'
import SettingsView from './components/SettingsView'

export default {
  name: 'app',
  components: {
    Connection,
    DashboardView,
    RulesView,
    Rule,
    SettingsView
  },
  created () {
    var inst = this

    EventBus.$on('connection:create', (connection) => {
      inst.paneModel = connection
      inst.openPane('connection')
    })

    EventBus.$on('rule:create', (alert) => {
      inst.paneModel = alert
      inst.openPane('rule')
    })

    EventBus.$on('rule:edit', (rule) => {
      rule.updating = true

      inst.paneModel = rule
      inst.openPane('rule')
    })

    var socket = IO.connect(`https://${window.location.hostname}`)
    socket.on('connect', () => console.log('Socket connected.'))
    socket.on('alert:created', (alert) => EventBus.$emit('alert:created', alert))
    socket.on('alert:updated', (alert) => EventBus.$emit('alert:updated', alert))
  },
  data () {
    return {
      currentView: 'dashboard-view',
      currentPane: '',
      paneModel: {}
    }
  },
  methods: {
    closePane () {
      this.paneModel = {}
      this.currentPane = ''
    },
    openPane (pane) {
      this.currentPane = pane
    },
    openView (view) {
      this.currentView = view
    }
  }
}
</script>

<style>
[v-cloak] {
  display:none;
}

.pane {
  position: absolute;
  top: 0;
  right: 0;
  padding: 66px 20px 12px 20px;
  background: #efefef;
  bottom: 0;
  min-width: 500px;
}

.main-table button {
  visibility: hidden;
}

.main-table tr:hover button {
  visibility: visible;
}

.main-table td {
  vertical-align: middle;
}

.navbar-brand a {
  font-size: 200%;
  font-weight: bold;  
}

.navbar-item.is-active {
  background: #efefef !important;
}

.actions {
  text-align: right;
}

.view.section {
  padding-top: 0;
}
</style>
