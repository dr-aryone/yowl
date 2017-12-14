'use strict';

module.exports = function(app) {
  var controller = require('../controllers/dashboardController');

  app.route('/dashboard')
    .get(controller.index);
};