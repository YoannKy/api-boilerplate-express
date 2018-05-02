const express = require('express');
const server = express();

require('./settings')(server);
require('./utils')(server);
require('./models')(server);
require('./middlewares')(server);
require('./controllers')(server);
require('./routes')(server);

console.log(`Server listening on port ${server.settings.env.port}`);
server.listen(server.settings.env);

module.exports = server;
