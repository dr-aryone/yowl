import axios from 'axios'

export default {
  create (severity, application, errorCode, keywords, broadcast) {
    var model = {
      application: application,
      severity: severity,
      errorCode: errorCode,
      keywords: keywords,
      broadcastType: broadcast
    }

    return axios.post('/api/rules', model)
  },

  get () {

  },

  list () {
    return axios.get('/api/rules')
  },

  remove (id) {
    return axios.delete('/api/rules/' + id)
  },

  update (id, severity, application, errorCode, keywords, broadcast) {
    var model = {
      application: application,
      severity: severity,
      errorCode: errorCode,
      keywords: keywords,
      broadcastType: broadcast
    }

    return axios.patch('/api/rules/' + id, model)
  }
}
