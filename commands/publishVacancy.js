const bot = require('../init').bot;
const isReply = require('../validators').isReply;
const isVacancy = require('../validators').isVacancy;
const isChannelAdmins = require('../validators').isChannelAdmin;
const isKeyword = require('../validators').isKeyword;
const channelId = require('../init').channelId;

const keywords = new Set(['в канал']);

function publishVacancy(msg) {
  console.log('publishVacancy', msg);
  const replyText = 'Вакансия опубликована в @javascript_jobs_feed';
  bot.forwardMessage(channelId(), msg.chat.id, msg.reply_to_message.message_id);
  bot.sendMessage(msg.chat.id, replyText, { reply_to_message_id: msg.reply_to_message.message_id })
}

function activator(msg) {
  try {
    if (isReply(msg) && isVacancy(msg) && isKeyword(msg, keywords) && isChannelAdmins(msg)) {
      publishVacancy(msg)
    }
  } catch (err) {
    console.warn('publishVacancy', err)
  }
}

module.exports.activator = activator;
