'use strict';

  const fs = require('fs');
  const mkdirp = require('mkdirp');
  const readline = require('readline');
  const {google} = require('googleapis');
  const OAuth2Client = google.auth.OAuth2;
  const SCOPES = ['https://www.googleapis.com/auth/calendar'];
  const TOKEN_PATH = 'credentials.json';

class Authorize {

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);


       this.setAccessToken(oAuth2Client, callback);

    }

    /**
     * set and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    setAccessToken(oAuth2Client, callback) {
      const o = {
        "token_type": "Bearer",
        "access_token": "ya29.GluwBWTRwkvxmHw1uN8BrtXSGM5JzjfmnVVB5OFGceouNmrv8nkGttkK9eDBIlhwv_jqTmj3hwxpUv2RWnpeZ4TigbfbI5Cs89_NZDx486djBAJ7HQjnZulOr1F4",
        "scope": "https://www.googleapis.com/auth/calendar https://w…https://www.googleapis.com/auth/calendar.readonly",
        "expires_at": "1525388445001",
        "expires_in": "813",
        "first_issued_at": "1525384845001"
      };
      oAuth2Client.setCredentials(o);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(o), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);

            oAuth2Client.setCredentials(o);
          callback(oAuth2Client);
      });
    }

}

module.exports = new Authorize;
