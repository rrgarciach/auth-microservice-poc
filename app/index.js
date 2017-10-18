const express = require('express');
const http = require('http');

const CONFIG = require('./config/environment');

const app = express();
const server = http.createServer(app);

const setup = require('./config/express');
setup(app);

const routes = require('./routes');
routes(app);

app.nodeServer = server.listen(CONFIG.PORT, CONFIG.IP, () => {
    console.info(`Express server lsitening on ${CONFIG.PORT}, in ${app.get('env')}`);
});

module.exports = app;
