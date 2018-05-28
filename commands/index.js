/* eslint-disable global-require */

const allHandlers = [
  require('./publishVacancy'),
  require('./publishCV'),
  require('./warn'),
  require('./updateChannelAdmins'),
];

module.exports = msg => allHandlers.forEach(handler => handler(msg));
