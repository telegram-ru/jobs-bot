'use strict';

const TelegramBot = require('node-telegram-bot-api');

const opts = require('optimist').argv;
const token = opts.token;
const forwardTo = opts.channel;

const bot = new TelegramBot(token, {polling: true});

const keywords = new Set(['в канал', 'В канал']);

const isReply = (msg) => (msg.reply_to_message != null);
const isJobVacancy = (msg) => msg.reply_to_message.text.includes('#вакансия');
const isKeyword = (msg) => (keywords.has(msg.text.toLowerCase()));
const replyText = 'Вакансия опубликована в @javascript_jobs_feed';

const admins = new Map();
const userHasPerms = (msg, channelId) => admins.get(channelId).has(msg.from.id);

bot.on('message', (msg) => {
  bot.getChatAdministrators(forwardTo)
    .then((adms) => {
      admins.set(forwardTo, adms.reduce((channelAdmins, { user }) => {
        channelAdmins.add(user.id);
        return channelAdmins
      }, new Set()));
    }).then(() => {
      if (isReply(msg) && isJobVacancy(msg) && userHasPerms(msg, forwardTo) && isKeyword(msg)) {
        bot.forwardMessage(forwardTo, msg.chat.id, msg.reply_to_message.message_id);
        bot.sendMessage(msg.chat.id, replyText, { reply_to_message_id: msg.reply_to_message.message_id })
      }
    });
});
