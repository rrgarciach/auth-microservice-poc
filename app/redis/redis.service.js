const redis = require('redis');

const CONFIG = require('../config/environment');

const client = redis.createClient({
    port: CONFIG.REDIS.PORT,
    host: CONFIG.REDIS.HOST
});

client.on('error', function (err) {
    console.error('Redis Error: ', err);
});

function setSession(token, user) {
    client.set(token, JSON.stringify(user), (err, reply)=> {
        if (err) {
            console.error(err);
        } else if (CONFIG.ENV === 'development') {
            console.log(`Session ${token} stored.`, reply);
        }
    });
    client.get(token, (err, reply)=> {
        if (err) {
            console.error(err);
        } else if (CONFIG.ENV === 'development') {
            console.log('we got from redis: ', reply)
        }
    });
}

module.exports = {
    setSession,
};
