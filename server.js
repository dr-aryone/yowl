var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('./web/assets'));
app.use('/static/vendor/skeleton', express.static('./node_modules/skeleton-css/css'));
app.use('/static/vendor/vue', express.static('./node_modules/vue/dist'));

require('./api/routes/alertRoutes')(app);
require('./web/routes/dashboardRoutes')(app);

app.listen(port);

console.log('Alert API server started on: ' + port);