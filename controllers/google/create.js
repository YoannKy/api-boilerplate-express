'use strict';

module.exports = (server) => {
  return (req, res) => {

    const {google} = require('googleapis');
    const sampleClient = server.utils.google.sampleClient;


    const scopes = [
      'https://www.googleapis.com/auth/youtube'
    ];

    sampleClient.authenticate(scopes)
  }
}