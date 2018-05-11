'use strict'
const db = 'azure'
const Rules = require(`../repositories/${db}/rules`)

module.exports = function RuleController (router, io) {
  router.get('/rules', function (req, res) {
    Rules
      .getAll()
      .then((rules) => res.json(rules))
      .catch((err) => res.send(err))
  })

  router.post('/rules', function (req, res) {
    var newRule = req.body

    Rules.create(newRule)
      .then(function (rule) {
        io.sockets.emit('rule:created', rule)
        res.json(rule)
      })
      .catch((err) => res.send(err))
  })

  router.delete('/rules/:ruleId', function (req, res) {
    Rules
      .delete({_id: req.params.ruleId})
      .then(() => res.json({'success': true}))
      .catch((err) => res.send(err))
  })

  router.patch('/rules/:ruleId', function (req, res) {
    var updatedRule = req.body

    Rules
      .update(updatedRule)
      .then(function () {
        io.sockets.emit('rule:updated', updatedRule)
        res.json(updatedRule)
      })
      .catch((err) => res.send(err))
  })
}
