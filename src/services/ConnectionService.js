import axios from 'axios'

export default {
  getAll () {
    return axios.get('/api/connection')
  },
  get (id) {
    return axios.get('/api/connection/' + id)
  },
  save (id, model) {
    return axios.post('/api/connection/' + id, model)
  },
  test (id, model) {
    return axios.post('/api/connection/' + id + '/test', model)
  }
}
