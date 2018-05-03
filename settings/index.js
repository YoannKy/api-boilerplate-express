module.exports = (api) => {
    api.clientSecret = require('./client_secret.json');

    if (process.env.NODE_ENV == 'production') {
        api.settings.port = process.env.PORT;
        api.settings.db.url = process.env.MONGODB_URI;
    }
};
