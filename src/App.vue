<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <nav class="navbar">
              <div class="navbar-brand">
                <a class="navbar-item" @click="openDashboardView()">
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
                  <a :class="['navbar-item', {'is-active': currentView == 'dashboard-view'}]" @click="openDashboardView()">
                    Dashboard
                  </a>
                  <a :class="['navbar-item', {'is-active': currentView == 'rules-view'}]" @click="openRulesView()">
                    Rules
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
      @close="onPaneClose" />
  </div>
</template>

<script>
import EventBus from './services/EventBus'
import DashboardView from './components/DashboardView'
import RulesView from './components/RulesView'
import Rule from './components/Rule'

export default {
  name: 'app',
  components: {
    DashboardView,
    RulesView,
    Rule
  },
  created () {
    var inst = this

    EventBus.$on('rule:create', (alert) => {
      inst.paneModel = alert
      inst.openRulePane()
    })

    EventBus.$on('rule:edit', (rule) => {
      rule.updating = true

      inst.paneModel = rule
      inst.openRulePane()
    })
  },
  data () {
    return {
      currentView: 'dashboard-view',
      currentPane: '',
      paneModel: {}
    }
  },
  methods: {
    onPaneClose () {
      this.currentPane = ''
    },
    openDashboardView () {
      this.currentView = 'dashboard-view'
    },
    openRulePane () {
      this.currentPane = 'rule'
    },
    openRulesView () {
      this.currentView = 'rules-view'
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
</style>
