// 'use strict';
//
const app = require('../server');
const User = app.models.operator;
//
module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  server.use(router);

};
