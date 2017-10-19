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
    client.set(token, user.username, (err, reply)=> {
        if (err) {
            console.error(err);
        } else if (CONFIG.ENV === 'development') {
            console.log(`Session ${token} stored.`, reply);
        }
    });
}

function getSession(token) {
    client.get(token, (err, reply)=> {
        if (err) {
            console.error(err);
        } else if (CONFIG.ENV === 'development') {
            console.log('Current session: ', reply);
        }
    });
}

module.exports = {
    setSession,
    getSession
};
