<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <table 
            class="main-table table is-hoverable is-fullwidth" 
            v-cloak>
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tr 
              v-for="(rule, index) in rules" 
              :key="rule._id">
              <td>
                <rule-summary :rule="rule" />  
              </td>              
              <td>{{ rule.broadcastType }} </td>
              <td class="actions">
                <button 
                  type="button" 
                  class="button is-light" 
                  @click="editRule(rule)">
                  Edit
                </button>
                <button 
                  type="button" 
                  class="button is-light" 
                  @click="deleteRule(rule._id, index)">
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
import EventBus from '../services/EventBus'
import Rules from '../services/RuleService'
import RuleSummary from './RuleSummary'

export default {
  components: {
    RuleSummary
  },
  created () {
    var inst = this

    EventBus.$on('rule:updated', () => {
      inst.getRules()
    })
  },
  data () {
    return {
      rules: []
    }
  },
  methods: {
    deleteRule (id, index) {
      var inst = this

      Rules.remove(id)
        .then(function (response) {
          if (response.data.success === true) {
            inst.rules.splice(index, 1)
          } else {
            console.log('Failed to delete alert')
          }
        })
        .catch((error) => console.log(error))
    },
    editRule (rule) {
      EventBus.$emit('rule:edit', rule)
    },
    getRules () {
      Rules.list()
        .then((response) => (this.rules = response.data))
        .catch((error) => console.log(error))
    }
  },
  mounted () {
    this.getRules()
  }
}
</script>

<style scoped>
</style>
