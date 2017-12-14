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
    alerts: [
      {
        code: "E-12932",
        message: "Something",
        severity: "warning"
      }
    ]
  }
});