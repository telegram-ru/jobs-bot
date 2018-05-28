const debug = require('debug')('jobs-bot:publishCV');
const config = require('config');

const bot = require('../bot');
const {
  isCV, isChatAdmin, isKeyword, isReply,
} = require('../validators');

const keywords = new Set(['канал', 'в канал']);
const getReplyText = channel => `
Резюме опубликовано в ${channel}, спасибо за понимание правил
`;

async function publish(msg, channel) {
  debug('publish', msg, channel);

  await bot.forwardMessage(channel, msg.chat.id, msg.reply_to_message.message_id);

  await bot.sendMessage(msg.chat.id, getReplyText(channel), {
    reply_to_message_id: msg.reply_to_message.message_id,
  });

  await bot.deleteMessage(msg.chat.id, msg.message_id);
}

async function handler(msg) {
  try {
    if (isReply(msg) && isCV(msg) && isKeyword(msg, keywords) && isChatAdmin(msg)) {
      const { channel } = config.get(msg.chat.username);

      await publish(msg, channel);
    }
  } catch (err) {
    debug('handler:error', err, msg);
  }
}

module.exports = handler;
