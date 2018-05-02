const router = require('express').Router();
module.exports = (server) => {

    router.get('/',
        server.middlewares.bodyParser.json(),
        server.controllers.google.create
    );
    
    router.get('/callback',
        server.middlewares.bodyParser.json(),
        server.controllers.google.callback
    );

    return router
};