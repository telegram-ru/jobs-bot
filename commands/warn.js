const debug = require('debug')('jobs-bot:warn');
const config = require('config');

const bot = require('../bot');
const { isChatAdmin, isKeyword, isReply } = require('../validators');

const keywords = new Set(['формат']);

const escapeMarkdown = text => text.replace(/_/g, '\\_');

const getReplyText = channel => `
Привет! У нас есть [правила](https://teletype.in/@telegram-ru/r1WQe5F1m) оформления вакансий и резюме.

Нужно отредактировать пост и мы его разместим в канал ${escapeMarkdown(channel)}. Если нет, то удалим через 5-10 минут.
`;

async function warn(msg, channel) {
  debug('warn', msg, channel);

  await bot.sendMessage(msg.chat.id, getReplyText(channel), {
    reply_to_message_id: msg.reply_to_message.message_id,
    parse_mode: 'Markdown',
  });

  await bot.deleteMessage(msg.chat.id, msg.message_id);
}

async function handler(msg) {
  try {
    if (isReply(msg) && isKeyword(msg, keywords) && isChatAdmin(msg)) {
      const { channel } = config.get(msg.chat.username);

      await warn(msg, channel);
    }
  } catch (err) {
    debug('handler:error', err, msg);
  }
}

module.exports = handler;
