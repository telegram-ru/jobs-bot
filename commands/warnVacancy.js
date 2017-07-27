const { bot } = require('../init');
const { isChannelAdmin, isKeyword, isReply } = require('../validators');

const keywords = new Set(['формат']);

async function warnVacancy(msg) {
  console.log('warnVacancy');
  const replyText = 'Надо отредактировать по формату — тогда вакансия попадёт в канал ' +
    '@javascript_jobs_feed. Иначе её удалят.\n' +
    'Смотри правила: http://telegra.ph/Pravila-oformleniya-vakansij-03-28';
  await bot.sendMessage(msg.chat.id, replyText, {
    reply_to_message_id: msg.reply_to_message.message_id
  })
}

async function activator(msg) {
  try {
    if (isReply(msg) && isKeyword(msg, keywords) && isChannelAdmin(msg)) {
      await warnVacancy(msg)
    }
  } catch (err) {
    console.warn('warnVacancy', err, msg)
  }
}

module.exports.activator = activator;