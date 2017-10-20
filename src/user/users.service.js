const model = require('./user.model');

function getByUsername(username) {
    if (username === model.username) {
        return Promise.resolve(model);
    } else {
        return Promise.resolve();
    }
}

function getById(id) {
    if (id === model._id) {
        return Promise.resolve(model);
    } else {
        return Promise.resolve();
    }
}

module.exports = {
    getByUsername,
    getById
};
