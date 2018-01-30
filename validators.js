const admins = require("./admins").admins;
const channelId = require("./init").channelId;

const isReply = msg => msg.reply_to_message != null;

const isKeyword = (msg, keywords) =>
  !!msg.text && keywords.has(msg.text.toLowerCase());

const isChatAdmin = (msg, chatId) =>
  admins.has(chatId) && admins.get(chatId).has(msg.from.id);

const isChannelAdmin = msg =>
  admins.has(channelId()) && admins.get(channelId()).has(msg.from.id);

const hasHashtag = (msg, hashtag) =>
  Boolean(msg.reply_to_message.text)
    && msg.reply_to_message.text.toLowerCase().includes(hashtag);

const isVacancy = msg => hasHashtag(msg.reply_to_message, /#вакансия/i);
const isVacancyNotReply = msg => hasHashtag(msg, /#вакансия/i);
const isCV = msg => hasHashtag(msg, /#резюме/i);

module.exports = {
  isReply,
  isKeyword,
  isChatAdmin,
  isChannelAdmin,
  hasHashtag,
  isVacancy,
  isCV,
  isVacancyNotReply
}
