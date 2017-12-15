import axios from 'axios'

export default {
  get () {

  },

  list () {
    return axios.get('/api/alerts')
  },

  remove (id) {
    axios.delete('/api/alerts/' + id)
  }
}
