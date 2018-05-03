module.exports = (server) => {
    server.models = {
      Event: require('./event')
    }
};
