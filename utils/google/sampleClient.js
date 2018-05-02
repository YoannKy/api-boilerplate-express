'use strict';
module.exports = (server)  => {

  'use strict';

  const {google} = require('googleapis');
  const http = require('http');
  const url = require('url');
  const querystring = require('querystring');
  const opn = require('opn');
  const destroyer = require('server-destroy');
  const fs = require('fs');
  const path = require('path');
  const keys = server.settings.clientSecret;
  

  class SampleClient {
    constructor (options) {
      this._options = options || { scopes: [] };

      // create an oAuth client to authorize the API call
      this.oAuth2Client = new google.auth.OAuth2(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[0]
      );
    }

    // Open an http server to accept the oauth callback. In this
    // simple example, the only request to our webserver is to
    // /oauth2callback?code=<code>
    async authenticate (scopes) {
      
      return new Promise((resolve, reject) => {
        // grab the url that will be used for authorization
        this.authorizeUrl = this.oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes.join(' ')
        });
        const server = http.createServer(async (req, res) => {
          console.log('createServer', scopes);
          
          try {
            if (req.url.indexOf('/google/callback') > -1) {
              const qs = querystring.parse(url.parse(req.url).query);
              res.end('Authentication successful! Please return to the console.');
              server.destroy();
              const {tokens} = await this.oAuth2Client.getToken(qs.code);
              this.oAuth2Client.credentials = tokens;
              resolve(this.oAuth2Client);
            } 
            
          } catch (e) {
            reject(e);
          }
        }).listen(3000, () => {
          // open the browser to the authorize url to start the workflow
          opn(this.authorizeUrl, {wait: false}).then(cp => cp.unref());
          destroyer(server);
        });
      });
    }
  }

  return new SampleClient();
}