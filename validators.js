const { admins } = require('./admins');

const isReply = msg => msg.reply_to_message != null;

const isKeyword = (msg, keywords) => !!msg.text && keywords.has(msg.text.toLowerCase());

const isChatAdmin = msg => admins.has(msg.chat.id) && admins.get(msg.chat.id).has(msg.from.id);

const hasHashtag = (msg, hashtag) =>
  !!msg.reply_to_message.text && msg.reply_to_message.text.toLowerCase().includes(hashtag);

const isVacancy = msg => hasHashtag(msg, '#вакансия');
const isCV = msg => hasHashtag(msg, '#резюме') || hasHashtag(msg, '#ищу');

module.exports.isReply = isReply;
module.exports.isKeyword = isKeyword;
module.exports.isChatAdmin = isChatAdmin;
module.exports.hasHashtag = hasHashtag;
module.exports.isVacancy = isVacancy;
module.exports.isCV = isCV;
