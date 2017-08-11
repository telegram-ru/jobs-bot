const { bot } = require("../init");
const { isChannelAdmin, isKeyword, isReply } = require("../validators");
const deleteCommandMessage = require("../utils/command_traces_cleaner").default;

const keywords = new Set(["формат"]);

const channel = process.env.APP_TELEGRAM_CHANNEL;

const replyText = `
Вакансию нужно отредактировать по правилам, чтобы она попала в канал ${channel}. В противном случае её удалят через 5-10 минут. 

Правила оформления вакансий: http://telegra.ph/jobs-rules-08-11
`;

async function warnVacancy(msg) {
  console.log("warnVacancy");
  await bot.sendMessage(msg.chat.id, replyText, {
    reply_to_message_id: msg.reply_to_message.message_id
  });
  await deleteCommandMessage(msg);
}

async function activator(msg) {
  try {
    if (isReply(msg) && isKeyword(msg, keywords) && isChannelAdmin(msg)) {
      await warnVacancy(msg);
    }
  } catch (err) {
    console.warn("warnVacancy", err, msg);
  }
}

module.exports.activator = activator;
