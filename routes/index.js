module.exports = (server) => {
    server.use(server.middlewares.logger);
    server.use(server.middlewares.res);
    server.use(server.middlewares.bodyParser.urlencoded({
        extended: true
    }));
    server.use(server.middlewares.bodyParser.json());
    server.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    server.use('/', require('./home')(server));
};
