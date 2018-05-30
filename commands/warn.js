const debug = require('debug')('jobs-bot:warn');
const config = require('config');

const bot = require('../bot');
const { isChatAdmin, isKeyword, isReply } = require('../validators');

const keywords = new Set(['формат']);

const escapeMarkdown = text => text.replace(/_/g, '\\_');

const getReplyText = (channel, reasons) => `
Привет! У нас есть [правила](https://teletype.in/@telegram-ru/r1WQe5F1m) оформления вакансий и резюме: они помогают компаниям привлекать людей, а соискателям — выбирать предложения.

После этого мы постим вакансию в канал ${escapeMarkdown(channel)}. Если не отредактировать, то удалим через 5-10 минут.
${reasons.length > 0 &&
  `
Нужно исправить: ${reasons.join(', ')}
`}
`;

async function warn(msg) {
  const { channel } = config.get(msg.chat.username);
  const [, ...reasons] = msg.text.split(' ');

  debug('warn', msg, channel);
  debug('warn:reasons', reasons);

  await bot.sendMessage(msg.chat.id, getReplyText(channel, reasons), {
    reply_to_message_id: msg.reply_to_message.message_id,
    parse_mode: 'Markdown',
  });

  await bot.deleteMessage(msg.chat.id, msg.message_id);
}

async function handler(msg) {
  try {
    if (isReply(msg) && isKeyword(msg, keywords) && isChatAdmin(msg)) {
      await warn(msg);
    }
  } catch (err) {
    debug('handler:error', err, msg);
  }
}

module.exports = handler;
