module.exports = (server) => {
    server.controllers = {
      google: require('./google')(server)
    };
};
