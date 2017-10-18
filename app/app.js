const express = require('express');
const http = require('http');

const CONFIG = require('./config/environment');

// const redisService = require('./redis.service');
// redisService.start();

const app = express();
const server = http.createServer(app);

const setupExpress = require('./config/express');
setupExpress(app);

const setupRoutes = require('./routes');
setupRoutes(app);

app.nodeServer = server.listen(CONFIG.PORT, CONFIG.IP, () => {
    console.info(`Express server listening on ${CONFIG.PORT}, in ${app.get('env')}`);
});

module.exports = app;
