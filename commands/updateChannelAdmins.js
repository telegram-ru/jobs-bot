const updateAdmins = require('../admins').updateAdmins;
const isKeyword = require('../validators').isKeyword;
const channelId = require('../init').channelId;
const bot = require('../init').bot;

const keywords = new Set(['/update_admins']);

function activator (msg) {
  try {
    if (msg.chat.type === 'private' && isKeyword(msg, keywords)) {
      updateAdmins(channelId());
      const replyText = 'обновил';
      bot.sendMessage(msg.chat.id, replyText, {reply_to_message_id: msg.message_id});
      console.log('updateChannelAdmins', msg);
    }
  } catch (err) {
    console.warn('updateChannelAdmins', err);
  }
}

module.exports.activator = activator;
