const redis = require('redis');

const CONFIG = require('../config/environment');

client = redis.createClient({
    port: CONFIG.REDIS.PORT,
    host: CONFIG.REDIS.HOST
});

client.on("error", function (err) {
    console.error("Redis Error: " + err);
});

