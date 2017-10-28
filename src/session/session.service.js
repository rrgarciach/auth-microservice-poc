const uuid = require('uuid-random');

const CONFIG = require('../config/environment');

const redisService = require('../redis/redis.service');

const client = redisService.createClient({
    host: CONFIG.REDIS.HOST,
    port: CONFIG.REDIS.PORT,
    password: CONFIG.REDIS.PASSWORD,
    db: CONFIG.REDIS.SESSION_DB
});

const expireTime = 60 * CONFIG.SESSION.MINUTES_TIMEOUT;

function createSession(session, cb) {
    const id = uuid();
    const sessionStr = JSON.stringify(session);

    client.set(id, sessionStr, 'EX', expireTime, err => {
        if (err) {
            console.error(err);
        }
        if (CONFIG.DEBUG) {
            console.log(`Session ${id} stored.`);
        }
        cb(id);
    });
}

function setSession(id, session, cb) {
    const sessionStr = JSON.stringify(session);

    client.set(id, sessionStr, 'EX', expireTime, (err, reply)=> {
        if (err) {
            console.error(err);
        }
        if (CONFIG.DEBUG) {
            console.log(`Session ${id} stored.`, reply);
        }
        cb(id);
    });
}

function getSession(id, cb) {
    client.get(id, (err, reply)=> {
        if (err) {
            console.error(err);
        }
        if (CONFIG.ENV === 'development') {
            console.log('Current session: ', reply);
        }
        cb(reply);
    });
}

module.exports = {
    createSession,
    setSession,
    getSession
};
