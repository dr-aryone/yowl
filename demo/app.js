const axios = require('axios')

function addAlert (alert) {
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/alerts',
    data: alert
  })
  .then(function (response) {
    console.log('Add alert.')
  })
  .catch(function (error) {
    console.error(error)
  })
}

setInterval(() => {
  addAlert({
    severity: 'error',
    application: 'That one app',
    errorCode: '9090',
    message: 'ITs DOWN!'
  })
}, 2000)
