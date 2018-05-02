module.exports = (server) => {
    server.utils = {        
      google: require('./google')(server),
    };
};
