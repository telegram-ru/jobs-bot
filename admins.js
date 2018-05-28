const debug = require('debug')('jobs-bot:admins');
const config = require('config');

const { bot } = require('./init');

const admins = new Map();

async function updateAdmins(chatId) {
  debug('updateAdmins', chatId);

  const adminList = await bot.getChatAdministrators(chatId);
  debug('updateAdmins:adminList', adminList);

  admins.set(chatId, new Set(adminList.map(({ user }) => user.id)));
  debug('updateAdmins:admins', admins);

  return admins;
}

function setAllAdmins() {
  return Object.values(config).map(async ({ id: chatId }) => updateAdmins(chatId));
}

module.exports.admins = admins;
module.exports.updateAdmins = updateAdmins;
module.exports.setAllAdmins = setAllAdmins;
