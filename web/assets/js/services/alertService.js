var Alerts = (function() {

  return {
    get: function() {

    },
    list: function() {
      return axios.get("/api/alerts");
    },
    remove: function(id) {
      return axios.delete("/api/alerts/"+id);
    }
  }
}());