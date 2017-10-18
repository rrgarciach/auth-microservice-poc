const CONFIG = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 9000,
    IP: process.env.IP || 'localhost',
    ENABLE_CORS: process.env.ENABLE_CORS || false,
    SECRETS: {
        SESSION: process.env.SESSION || 'auth-secret'
    },
};

module.exports = CONFIG;
