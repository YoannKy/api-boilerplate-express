module.exports = (server) => {
  return (req, res) => {
    const {google} = require('googleapis');
    const keys = server.settings.clientSecret;
    const sampleClient = server.utils.google.sampleClient;
    
    sampleClient.oAuth2Client.getToken(req.query.code).then(res => {
      // console.log('sff', res);
      const {tokens} = res;
      sampleClient.oAuth2Client.setCredentials(tokens);
    }).then(() => {

      
      const youtube = google.youtube({
        version: 'v3',
        auth: sampleClient.oAuth2Client
      });
      
      youtube.playlists.list({
        part: 'id,snippet',
        id: 'PLIivdWyY5sqIij_cgINUHZDMnGjVx3rxi'
      }).then(console.log).catch((err) => console.log('err', err));
      
  });
  }
}