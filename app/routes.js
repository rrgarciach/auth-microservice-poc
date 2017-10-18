const path = require('path');
const cors = require('cors');

const CONFIG = require('./config/environment');

const setupRoutes = (app) => {

    if (CONFIG.ENABLE_CORS) app.use(cors());

    app.use('/api/v1/auth', require('./auth'));

};

module.exports = setupRoutes;
