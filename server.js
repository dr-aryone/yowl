var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('./web/assets'));
app.use('/static/vendor/axios', express.static('./node_modules/axios/dist'));
app.use('/static/vendor/bulma', express.static('./node_modules/bulma/css'));
app.use('/static/vendor/socket.io', express.static('./node_modules/socket.io-client/dist'));
app.use('/static/vendor/vue', express.static('./node_modules/vue/dist'));

require('./api/routes/alertRoutes')(app, io);
require('./web/routes/dashboardRoutes')(app);

server.listen(port);

console.log('Alert API server started on: ' + port);