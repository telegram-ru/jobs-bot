const { bot } = require("../init");
const { isChannelAdmin, isKeyword, isReply } = require("../validators");
const deleteCommandMessage = require("../utils/command_traces_cleaner").default;

const keywords = new Set(["формат"]);

async function warnVacancy(msg) {
  console.log("warnVacancy");
  const replyText =
    "Вакансию надо отредактировать по формату — тогда она попадёт в канал " +
    process.env.APP_TELEGRAM_CHANNEL +
    ", иначе её удалят.\n\n" +
    "Правила оформления вакансий: http://telegra.ph/Pravila-oformleniya-vakansij-03-28";
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
