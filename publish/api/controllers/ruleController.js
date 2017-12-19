'use strict'
const Rules = require('../models/ruleModel')

module.exports = function RuleController (router) {
  router.get('/rules', function (req, res) {
    Rules.find({}, function (err, rules) {
      if (err) {
        res.send(err)
        return
      }

      res.json(rules)
    })
  })

  router.post('/rules', function (req, res) {
    var newRule = req.body

    Rules.insert(newRule, function (err, rule) {
      if (err) {
        res.send(err)
        return
      }

      res.json(rule)
    })
  })

  router.delete('/rules/:ruleId', function (req, res) {
    Rules.remove({_id: req.params.ruleId}, {}, function (err, numRemoved) {
      if (err) {
        res.send(err)
        return
      }

      res.json({'success': numRemoved === 1})
    })
  })

  router.patch('/rules/:ruleId', function (req, res) {
    var updatedRule = req.body

    Rules.update({_id: req.params.ruleId}, updatedRule, function (err, numReplaced) {
      if (err) {
        res.send(err)
        return
      }

      res.json({'success': numReplaced === 1})
    })
  })
}
