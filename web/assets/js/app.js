Vue.component("severityTag", {
  data: function() {
    return {
      tagClass: "tag"
    }
  },
  computed: {
    levelClass: function() {
      return "is-" + this.level;
    },
    levelDisplay: function() {
      return this.level.charAt(0).toUpperCase() + this.level.slice(1);
    }
  },
  props: ["level"],
  template: "#severity-tag-template"
});


var app = new Vue({
  el: "#app",
  data: {
    alerts: []
  },
  methods: {
    getAlerts: function() {
      Alerts.list()
        .then((response) => this.alerts = response.data)
        .catch((error) => console.log(error));
    }
  },
  created: function() {
    var inst = this;

    inst.getAlerts();

    var socket = io.connect('http://localhost:3000');
    socket.on("connect", function(){
      console.log("Socket connected.");
    });
    socket.on('alert:created', function(alert) {
      inst.alerts.push(alert);
    });
  }
});