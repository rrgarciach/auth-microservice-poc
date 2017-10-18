const CONFIG = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    ENABLE_CORS: process.env.ENABLE_CORS || false,
    SESSION_MINUTES_TIMEOUT: process.env.SESSION_MINUTES_TIMEOUT || 15,
    SECRETS: {
        SESSION: process.env.SESSION || 'auth-secret'
    },
    REDIS: {
        PORT: process.env.REDIS_PORT || 6379,
        HOST: process.env.REDIS_HOST || '127.0.0.1',
    },
};

module.exports = CONFIG;
