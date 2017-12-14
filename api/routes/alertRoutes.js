'use strict';

module.exports = function(app) {
  var alertController = require('../controllers/alertController');

  app.route('/alerts')
    .get(alertController.list_all_alerts)
    .post(alertController.create_an_alert);

  app.route('/alerts/:alertId')
    .get(alertController.read_an_alert);
    //.put(todoList.update_a_task)
    //.delete(todoList.delete_a_task);
};