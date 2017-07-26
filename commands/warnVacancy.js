const bot = require('../init').bot;
const isReply = require('../validators').isReply;
const isKeyword = require('../validators').isKeyword;
const isChatAdmin = require('../validators').isChatAdmin;

const keywords = new Set(['формат']);

function warnVacancy(msg) {
  console.log('warnVacancy', msg);
  const replyText = 'Надо отредактировать по формату — тогда вакансия попадёт в канал ' +
    '[@javascript_jobs_feed](https://t.me/javascript_jobs_feed). ' +
    'Иначе её удалят. ' +
    '[Смотри правила](http://telegra.ph/Pravila-oformleniya-vakansij-03-28)';
  bot.sendMessage(msg.chat.id, replyText, {
    reply_to_message_id: msg.reply_to_message.message_id,
    parse_mode: 'Markdown'
  })
}

function activator(msg) {
  try {
    if (isReply(msg) && isKeyword(msg, keywords) && isChatAdmin(msg, msg.chat.id)) {
      warnVacancy(msg)
    }
  } catch (err) {
    console.warn('warnVacancy', err)
  }
}

module.exports.activator = activator;