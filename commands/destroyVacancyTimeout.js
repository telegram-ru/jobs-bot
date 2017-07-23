const bot = require('../init').bot;
const admins = require('./updateChannelAdmins').admins;

const keywords = new Set(['формат']);

const isReply = (msg) => (msg.reply_to_message != null);
const isKeyword = (msg) => (keywords.has(msg.text.toLowerCase()));
const isAdmin = (msg, chatId) => (admins.has(chatId) && admins.get(chatId).has(msg.from.id));

function warnJobVacancy(msg) {
  const replyText = 'Надо отредактировать по формату — тогда вакансия попадёт в канал ' +
    '[@javascript_jobs_feed](https://t.me/javascript_jobs_feed). ' +
    'Иначе её удалят. ' +
    '[Смотри правила](http://telegra.ph/Pravila-oformleniya-vakansij-03-28)';
  bot.sendMessage(msg.chat.id, replyText, {
    reply_to_message_id: msg.reply_to_message.message_id,
    parse_mode: 'Markdown'
  })
}

function checkPermissionsForWarn(msg) {
  return (isReply(msg) && isKeyword(msg) && isAdmin(msg, msg.chat.id))
}

module.exports.checkPermissionsForWarn = checkPermissionsForWarn;
module.exports.warnJobVacancy = warnJobVacancy;
