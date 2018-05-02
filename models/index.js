const mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = (server) => {
    server.mongoose = mongoose.connect(server.settings.db.url, {useMongoClient : true});
    server.mongoose.Promise = Promise;

    server.models = {};
};
