const express = require('express');
const server = express();

require('./settings')(server);
require('./models')(server);
require('./middlewares')(server);
require('./controllers')(server);
require('./routes')(server);

console.log(`Server listening on port 4000`);
server.listen(4000);

module.exports = server;
