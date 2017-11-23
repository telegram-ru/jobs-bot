const publishVacancyActivator = require("./publishVacancy").activator;
const publishCVActivator = require("./publishCV").activator;
const warnVacancyActivator = require("./warnVacancy").activator;
const updateChannelAdminsActivator = require("./updateChannelAdmins").activator;
const dedublicator = require("./dedublicator").activator;

const commands = [
  publishVacancyActivator,
  publishCVActivator,
  warnVacancyActivator,
  updateChannelAdminsActivator,
  dedublicator
];

function exec(msg) {
  commands.forEach(activator => activator(msg));
}

module.exports = exec;
