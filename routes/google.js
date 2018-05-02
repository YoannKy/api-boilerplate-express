const router = require('express').Router();
module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.controllers.google.create
    );

    return router
};