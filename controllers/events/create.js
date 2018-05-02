'use strict';

module.exports = (server) => {
  return (req, res) => {
    const {google} = require('googleapis');

    const client = server.utils.events.client;

    const calendar = google.calendar({
      version: 'v3',
      auth: client.oAuth2Client
    });

    calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, data) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log(data);
    // const events = data.items;
    // if (events.length) {
    //   console.log('Upcoming 10 events:');
    //   events.map((event, i) => {
    //     const start = event.start.dateTime || event.start.date;
    //     console.log(`${start} - ${event.summary}`);
    //   });
    // } else {
    //   console.log('No upcoming events found.');
    // }
  });

  }
}
