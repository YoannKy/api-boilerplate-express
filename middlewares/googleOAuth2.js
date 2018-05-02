module.exports = (server) => {
    return (req, res, next) => {
      console.log(req.query);
      const client = server.utils.events.client;
      if (req.query.code) {
        return client.oAuth2Client.getToken(req.query.code)
          .then(apiResult => {
            const {tokens} = apiResult;
            client.oAuth2Client.setCredentials(tokens)
          })
          .then(next)
          .catch(console.log);
      }

      const scopes = [
        'https://www.googleapis.com/auth/calendar'
      ];
      client.authenticate(scopes)
    }
}
