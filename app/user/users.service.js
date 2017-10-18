const model = require('./user.model');

function getByUsername(username) {
    if (username === model.username) {
        return Promise.resolve(model);
    } else {
        return Promise.resolve();
    }
}

module.exports = {
    getByUsername,
};
