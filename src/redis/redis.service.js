const redis = require('redis');

function createClient(config) {

    const client = redis.createClient({
        port: config.port,
        host: config.host,
        db: config.db
    });

    client.auth(config.password);

    client.on('connect', function() {
        console.info(`Connected to Redis at ${config.host}:${config.port} for database ${config.db}`);
    });

    client.on('error', function (err) {
        console.error('Redis Error: ', err);
    });

    return client;

}

module.exports = {
    createClient
};
