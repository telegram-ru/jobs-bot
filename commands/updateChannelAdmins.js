const debug = require('debug')('jobs-bot:updateChannelAdmins');
const { setAllAdmins } = require('../admins');
const { isKeyword } = require('../validators');
const { bot } = require('../init');

const keywords = new Set(['/update_admins']);

async function activator(msg) {
  try {
    if (msg.chat.type === 'private' && isKeyword(msg, keywords)) {
      const replyText = 'Обновил всех админов';

      await Promise.all(setAllAdmins());
      await bot.sendMessage(msg.chat.id, replyText, {
        reply_to_message_id: msg.message_id,
      });
    }
  } catch (err) {
    debug('activator:error', err, msg);
  }
}

module.exports.activator = activator;
