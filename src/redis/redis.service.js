const redis = require('redis');

const CONFIG = require('../config/environment');

const client = redis.createClient({
    port: CONFIG.REDIS.PORT,
    host: CONFIG.REDIS.HOST
});
client.auth(CONFIG.REDIS.PASSWORD);

client.on('connect', function() {
    console.info(`Connected to Redis at ${CONFIG.REDIS.HOST}:${CONFIG.REDIS.PORT}.`);
});

client.on('error', function (err) {
    console.error('Redis Error: ', err);
});

module.exports = {
    client
};
