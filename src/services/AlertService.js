import axios from 'axios'

export default {
  get () {

  },

  list () {
    return axios.get('/api/alerts')
  },

  remove (id) {
    return axios.delete('/api/alerts/' + id)
  }
}
