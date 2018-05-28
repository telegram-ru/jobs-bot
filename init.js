const TelegramBot = require('node-telegram-bot-api');

TelegramBot.prototype.deleteMessage = function deleteMessage(chatId, messageId, form = {}) {
  form.chat_id = chatId;
  form.message_id = messageId;
  return this._request('deleteMessage', { form });
};

const bot = new TelegramBot(process.env.APP_BOT_TOKEN, { polling: true });
const botName = '@PublisherRuBot';

module.exports.bot = bot;
module.exports.botName = botName;
