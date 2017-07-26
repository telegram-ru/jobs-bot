const bot = require('./init').bot;

const admins = new Map();

async function updateAdmins (chatId) {
  const adminList = await bot.getChatAdministrators(chatId);
  admins.set(chatId, new Set(adminList.map(({ user }) => user.id)));
}

module.exports.admins = admins;
module.exports.updateAdmins = updateAdmins;