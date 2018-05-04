
'use strict';

const moment = require('moment');
const fs = require('fs');
const { google } = require('googleapis');
const Authorize = require('./authorize.service');

module.exports = (server) => {
  return (req, res) => {
    // console.log(req.body);
    // Load client secrets from a local file.
    fs.readFile('./settings/client_secret.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      Authorize.authorize(JSON.parse(content), req.body.code, createCalendar);

    });

    function isEqualToCampaign(obj){
      if (obj.summary !== 'campaign'){
        return false;
      } else {
        return true;
      }
    }

    function createCalendar(auth){
      const calendar = google.calendar({ version: 'v3', auth });
      calendar.calendarList.list((err, { data }) => {
        if (err) return console.log('The API returned an error: ' + err);
        const summary = data.items.filter(isEqualToCampaign);
        /**
         *  test if the calendar campaign already exist
         *  if not, create a new calendar campaign and keep his ID for the event creation
         *  or, just keep his ID if he already exist for the event creation
         */
        if (summary.length !== 0) return createEvent(auth, summary[0].id);

        /* create Calendar */
        calendar.calendars.insert({
          auth: auth,
          resource: { summary: 'campaign' }
        }, (err, data) => {
          if (err) return console.log('The API returned an error: ' + err);
          createEvent(auth, data.data.id);
        });
      });
    }

    function createEvent(auth, calendarId){
      const calendar = google.calendar({ version: 'v3', auth });
      /* Create the event */
      calendar.events.insert({
        auth: auth,
        calendarId: calendarId,
        resource: {
          'summary': req.body.name,
          'start': {
            'dateTime': moment(req.body.startDate).toISOString(),
            'timeZone': req.body.timezone
          },
          'end': {
            'dateTime': moment(req.body.endDate).toISOString(),
            'timeZone': req.body.timezone
          }
        }
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return res.status(500).json('an error occured');
        }
        res.status(201).send();
      });
    }


  }
}
