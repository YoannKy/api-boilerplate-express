const router = require('express').Router();
module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.checkMandatoryBodyFields(server.models.Event),
        server.controllers.event.create
    );

    return router
};
