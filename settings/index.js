module.exports = (server) => {
  server.settings = {
    env : require('./env.json'),
    clientSecret :require('./client_secret.json')
  }
};

