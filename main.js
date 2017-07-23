'use strict';
const bot = require('./init').bot;
const channelId = require('./init').channelId;
const admins = require('./commands/updateChannelAdmins').admins;
const updateInfoChannelAdmins = require('./commands/updateChannelAdmins').updateInfoChannelAdmins;
const infoChannelAdminsActivator = require('./commands/updateChannelAdmins').activator;
const checkPermissionsForPublish = require('./commands/publishJobVacancy').checkPermissionsForPublish;
const publishJobVacancy = require('./commands/publishJobVacancy').publishJobVacancy;

bot.on('message', async (msg) => {
  if (!admins.has(channelId) || infoChannelAdminsActivator(msg)) {
    await updateInfoChannelAdmins(channelId);
  }
  if (checkPermissionsForPublish(msg, channelId)) {
    publishJobVacancy(msg, channelId)
  }
});
