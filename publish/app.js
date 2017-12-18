const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const api = require('./api')(io)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', api)
app.use(express.static('static'))

app.use(session({
  secret: 'work hard, play hard',
  resave: true,
  saveUninitialized: false
}))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
})

server.listen(3000, function () {
  console.log('Listening on port 3000!')
})
