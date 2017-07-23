const bot = require('../init').bot;
const admins = require('./updateChannelAdmins').admins;

const keywords = new Set(['в канал']);

const isReply = (msg) => (msg.reply_to_message != null);
const isJobVacancy = (msg) => msg.reply_to_message.text.includes('#вакансия');
const isKeyword = (msg) => (keywords.has(msg.text.toLowerCase()));
const userAllowPublish = (msg, channelId) => (admins.has(channelId) && admins.get(channelId).has(msg.from.id));

function publishJobVacancy(msg, channelId) {
  const replyText = 'Вакансия опубликована в @javascript_jobs_feed';
  bot.forwardMessage(channelId, msg.chat.id, msg.reply_to_message.message_id);
  bot.sendMessage(msg.chat.id, replyText, { reply_to_message_id: msg.reply_to_message.message_id })
}

function checkPermissionsForPublish(msg, channelId) {
  return (isReply(msg) && isJobVacancy(msg) && isKeyword(msg) && userAllowPublish(msg, channelId))
}

module.exports.checkPermissionsForPublish = checkPermissionsForPublish;
module.exports.publishJobVacancy = publishJobVacancy;
