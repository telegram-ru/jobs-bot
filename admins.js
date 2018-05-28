const debug = require('debug')('jobs-bot:admins');
const config = require('config');

const bot = require('./bot');

const admins = new Map();

async function updateAdminsByChatId(chatId) {
  debug('updateAdminsByChatId', chatId);

  const adminList = await bot.getChatAdministrators(chatId);
  debug('updateAdminsByChatId:adminList', adminList);

  admins.set(chatId, new Set(adminList.map(({ user }) => user.id)));
  debug('updateAdminsByChatId:admins', admins);

  return admins;
}

function setAllAdmins() {
  return Object.values(config).map(async ({ id: chatId }) => updateAdminsByChatId(chatId));
}

module.exports.admins = admins;
module.exports.setAllAdmins = setAllAdmins;
