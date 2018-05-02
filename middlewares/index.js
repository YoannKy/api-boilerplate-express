module.exports = (server) => {
    server.middlewares = {
        bodyParser: require('body-parser'),
        checkMandatoryBodyFields: require('./checkMandatoryBodyFields'),
        checkUnwantedBodyFields: require('./checkUnwantedBodyFields'),
        logger: require('./logger'),
        res: require('./res'),
        googleOAuth2: require('./googleOAuth2')(server)
    };
};
