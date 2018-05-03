module.exports = (server) => {
    server.controllers = {
      event: require('./event')(server)
    };
};
