const CONFIG = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    ENABLE_CORS: process.env.ENABLE_CORS || false,
    DEBUG: process.env.DEBUG || false,
    SESSION: {
        SECRET: process.env.SESSION_SECRET || 'auth-secret',
        MINUTES_TIMEOUT: process.env.SESSION_MINUTES_TIMEOUT || 15,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || '127.0.0.1',
        PORT: process.env.REDIS_PORT || 6379,
        PASSWORD: process.env.REDIS_PASSWORD || '',
        SESSION_DB: 0,
        TOKEN_DB: 1,
    },
};

module.exports = CONFIG;
