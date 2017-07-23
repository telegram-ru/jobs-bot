const bot = require('../init').bot;
const botName = require('../init').name;

const admins = new Map();

const keywords = new Set(['/update_admins']);

const isKeyword = (text) => (keywords.has(text.toLowerCase()));

async function updateInfoChannelAdmins(channelId) {
  const channelAdmins = await bot.getChatAdministrators(channelId);
  admins.set(channelId, new Set(channelAdmins.map(({ user }) => user.id)));
}

function activator (msg) {
  // const [name, ...command] = msg.text.split(' ');
  // const [name, ...command] = msg.text.split(' ');
  // if (name.startsWith(botName) && isKeyword(command.join(' '))) {
  if (isKeyword(msg.text)) {
    return true;
  }
}

module.exports.admins = admins;
module.exports.updateInfoChannelAdmins = updateInfoChannelAdmins;
module.exports.activator = activator;
