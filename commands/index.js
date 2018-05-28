const { activator: publishVacancyActivator } = require('./publishVacancy');
const { activator: publishCVActivator } = require('./publishCV');
const { activator: warnActivator } = require('./warn');
const { activator: updateChannelAdminsActivator } = require('./updateChannelAdmins');

const commands = [
  publishVacancyActivator,
  publishCVActivator,
  warnActivator,
  updateChannelAdminsActivator,
];

module.exports = msg => commands.forEach(activator => activator(msg));
