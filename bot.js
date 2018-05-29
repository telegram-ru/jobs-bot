const debug = require('debug')('jobs-bot:bot');
const TelegramBot = require('node-telegram-bot-api');

TelegramBot.prototype.deleteMessage = function deleteMessage(chatId, messageId, form = {}) {
  form.chat_id = chatId;
  form.message_id = messageId;
  return this._request('deleteMessage', { form });
};

debug('token', process.env.APP_BOT_TOKEN.split(':')[0]);

const bot = new TelegramBot(process.env.APP_BOT_TOKEN, { polling: true });

module.exports = bot;
