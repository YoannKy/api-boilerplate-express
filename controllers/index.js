module.exports = (server) => {
    server.controllers = {
      events: require('./events')(server)
    };
};
