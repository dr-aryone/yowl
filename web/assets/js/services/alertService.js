var Alerts = (function() {

  return {
    get: function() {

    },
    list: function() {
      return axios.get("/api/alerts");
    }
  }
}());