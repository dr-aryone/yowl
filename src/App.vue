<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title is-1">Yowl</h1>
          </div>
        </div>
      </div>
    </section>

    <component :is="currentView" />
    <component :is="currentPane" />
  </div>
</template>

<script>
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
  data () {
    return {
      currentView: 'dashboard-view',
      currentPane: 'rule'
    }
  },
  methods: {

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
</style>
