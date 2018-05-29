const debug = require('debug')('jobs-bot');
const http = require('http');
const bot = require('./bot');
const { setAllAdmins, admins } = require('./admins');
const exec = require('./commands/index');

// set admins && set handlers messages
Promise.all(setAllAdmins())
  .then(() => bot.on('message', msg => exec(msg)))
  .then(() => debug('admins', admins))
  .catch((...args) => debug('error @ init', args));

// create dummy http-server
http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end('200 OK');
  })
  .listen(3000);
