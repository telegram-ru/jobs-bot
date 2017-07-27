const { updateAdmins } = require('../admins');
const { isKeyword } = require('../validators');
const { bot, channelId } = require('../init');

const keywords = new Set(['/update_admins']);

async function activator (msg) {
  console.log('updateChannelAdmins', msg);
  const replyText = 'обновил';
  try {
    if (msg.chat.type === 'private' && isKeyword(msg, keywords)) {
      await updateAdmins(channelId());
      await bot.sendMessage(msg.chat.id, replyText, {reply_to_message_id: msg.message_id});
    }
  } catch (err) {
    console.warn('updateChannelAdmins', err);
  }
}

module.exports.activator = activator;
