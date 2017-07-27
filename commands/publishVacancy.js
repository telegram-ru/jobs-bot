const { bot, channelId } = require('../init');
const { isVacancy, isChannelAdmin, isKeyword, isReply } = require('../validators');

const keywords = new Set(['в канал']);

async function publishVacancy(msg) {
  console.log('publishVacancy', msg);
  const replyText = 'Вакансия опубликована в @javascript_jobs_feed';
  await bot.forwardMessage(channelId(), msg.chat.id, msg.reply_to_message.message_id);
  await bot.sendMessage(msg.chat.id, replyText, { reply_to_message_id: msg.reply_to_message.message_id })
}

async function activator(msg) {
  try {
    if (isReply(msg) && isVacancy(msg) && isKeyword(msg, keywords) && isChannelAdmin(msg)) {
      await publishVacancy(msg)
    }
  } catch (err) {
    console.warn('publishVacancy', err)
  }
}

module.exports.activator = activator;
