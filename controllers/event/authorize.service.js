'use strict';

const fs = require('fs');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const TOKEN_PATH = 'credentials.json';

class Authorize {

  /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
  authorize(credentials, code, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

    this.setAccessToken(oAuth2Client, code, callback);

  }

  /**
     * set and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
  setAccessToken(oAuth2Client, code, callback) {
    oAuth2Client.getToken(code, (err, token) => {
      console.log(err);
      if (err) return callback(err);

      oAuth2Client.setCredentials(token);

      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);

        oAuth2Client.setCredentials(token);
        callback(oAuth2Client);
      });
    });
  }

}

module.exports = new Authorize();
