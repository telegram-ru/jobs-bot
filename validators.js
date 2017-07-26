const admins = require('./admins').admins;
const channelId = require('./init').channelId;

module.exports.isReply = (msg) => (msg.reply_to_message != null);
module.exports.isKeyword = (msg, keywords) => (keywords.has(msg.text.toLowerCase()));
module.exports.isChatAdmin = (msg, chatId) => (admins.has(chatId) && admins.get(chatId).has(msg.from.id));
module.exports.isChannelAdmin = (msg) => (admins.has(channelId()) && admins.get(channelId()).has(msg.from.id));
module.exports.isVacancy = (msg) => msg.reply_to_message.text.includes('#вакансия');
