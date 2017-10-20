const CONFIG = require('../config/environment');

const redisService = require('../redis/redis.service');

function setSession(token, session) {
    const expireTime = 3600//60 * CONFIG.SESSION.MINUTES_TIMEOUT;
    redisService.client.set(token, JSON.stringify(session), 'EX', expireTime, (err, reply)=> {
        if (err) {
            console.error(err);
        } else if (CONFIG.ENV === 'development') {
            console.log(`Session ${token} stored.`, reply);
        }
    });
}

function getSession(token, cb) {
    redisService.client.get(token, (err, reply)=> {
        if (err) {
            console.error(err);
        } else if (CONFIG.ENV === 'development') {
            console.log('Current session: ', reply);
            cb(reply);
        }
    });
}

module.exports = {
    setSession,
    getSession
};
