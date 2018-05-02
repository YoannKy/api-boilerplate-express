const express = require('express');
const server = express();

require('./settings')(server);
require('./models')(server);
require('./middlewares')(server);
require('./controllers')(server);
require('./routes')(server);

console.log(`Server listening on port ${server.settings.port}`);
server.listen(server.settings.port);

module.exports = server;
