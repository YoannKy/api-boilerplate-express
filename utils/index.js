module.exports = (server) => {
    server.utils = {
      events: require('./events')(server),
    };
};
