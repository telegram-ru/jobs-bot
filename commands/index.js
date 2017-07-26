const publishVacancyActivator = require('./publishVacancy').activator;
const warnVacancyActivator = require('./warnVacancy').activator;
const updateChannelAdminsActivator = require('./updateChannelAdmins').activator;

module.exports = [
  publishVacancyActivator,
  warnVacancyActivator,
  updateChannelAdminsActivator
];
