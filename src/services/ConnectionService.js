import axios from 'axios'

export default {
  getAllActive () {
    return axios.get('/api/connection')
  },
  getBrowserPush () {
    return axios.get('/api/connection/browserPush')
  },
  getSmtp () {
    return axios.get('/api/connection/smtp')
  },
  saveBrowserPush (model) {
    return axios.post('/api/connection/browserPush', model)
  },
  saveSmtp (model) {
    return axios.post('/api/connection/smtp', model)
  },
  testSmtp (model) {
    return axios.post('/api/connection/smtp/test', model)
  }
}
