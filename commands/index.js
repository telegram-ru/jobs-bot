const publishVacancyActivator = require('./publishVacancy').activator;
const warnVacancyActivator = require('./warnVacancy').activator;
const updateChannelAdminsActivator = require('./updateChannelAdmins').activator;

const commands = [
  publishVacancyActivator,
  warnVacancyActivator,
  updateChannelAdminsActivator
];

function exec(msg) {
  commands.forEach(activator => activator(msg))
}

module.exports = exec;
