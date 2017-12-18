const bcrypt = require('bcrypt')
const Users = require('../models/userModel')

module.exports = function (router) {
  router.post('/users/login', (req, res) => {
    Users.find({email: req.body.email}, {}, (err, user) => {
      if (err) {
        res.status(401).send({
          message: 'Login invalid.'
        })
        return
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          res.status(401).send({
            message: 'Login invalid.'
          })
          return
        }

        req.session.userId = user._id
        res.send({ success: true })
      })
    })
  })

  router.get('/users/logout', (req, res) => {
    if (!req.session) {
      res.send({ success: true })
      return
    }

    req.session.destroy((err) => {
      if (err) {
        res.send(err)
        return
      }

      return res.send({ success: true })
    })
  })

  router.post('/users', (req, res) => {
    if (!(req.body.email &&
      req.body.password &&
      req.body.passwordConfirmation)) {
      res.status(412).send({
        message: 'Required fields missing.'
      })
      return
    }

    if (req.body.password !== req.body.passwordConfirmation) {
      res.status(412).send({
        message: 'Passwords do not match.'
      })
      return
    }

    var newUser = {
      email: req.body.email,
      password: req.body.password
    }

    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) {
        res.send(err)
        return
      }

      newUser.password = hash

      Users.insert(newUser, (err, user) => {
        if (err) {
          res.send(err)
          return
        }

        req.session.userId = user._id
        res.json({ success: true })
      })
    })
  })

  return {
    requiresAuthentication: (req, res, next) => {
      Users.find({_id: req.session.userId}, {}, (err, user) => {
        if (err) {
          res.status(401).send({
            message: 'Unauthenticated.'
          })
          return
        }

        next()
      })
    }
  }
}
