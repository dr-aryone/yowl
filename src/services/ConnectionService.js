import axios from 'axios'

export default {
  getAllActive () {
    return axios.get('/api/connection')
  },
  getSmtp () {
    return axios.get('/api/connection/smtp')
  },
  saveSmtp (model) {
    return axios.post('/api/connection/smtp', model)
  },
  testSmtp (model) {
    return axios.post('/api/connection/smtp/test', model)
  }
}
