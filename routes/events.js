const router = require('express').Router();
module.exports = (server) => {

    router.get('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.googleOAuth2,
        server.controllers.events.create
    );

    return router
};
