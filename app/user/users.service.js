const model = require('./user.model');

function getByUsername(username) {
    if (username === model.username) {
        return Promise.resolve(model);
    } else {
        return Promise.reject();
    }
}

module.exports = {
    getByUsername,
};
